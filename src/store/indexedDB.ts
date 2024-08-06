const DB_NAME = 'WebBuilderDB';
const STORE_NAME = 'projectState';

let db: IDBDatabase | null = null;

interface ProjectState {
  id: string;
  state: string;
}


const getCurrentVersion = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onsuccess = () => {
      const database = request.result;
      // console.log("Data base is ", database);
      const version = database.version;
      database.close();
      resolve(version);
    };
    request.onerror = () => {
      reject(new Error("Error getting current version"));
    };
  });
};

export const initDB = async (): Promise<IDBDatabase> => {
  try {
    const currentVersion = await getCurrentVersion();
    // console.log("Current version is ", currentVersion);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, currentVersion);

      request.onerror = () => {
        console.error("IndexedDB error:", request.error);
        reject(new Error("Error opening IndexedDB"));
      };

      request.onsuccess = () => {
        db = request.result;
        // console.log("IndexedDB opened successfully", db);

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          // console.log("Object store not found, closing and reopening with a new version");
          db.close();
          const newVersion = db.version + 1;
          const reopenRequest = indexedDB.open(DB_NAME, newVersion);

          reopenRequest.onupgradeneeded = () => {
            const database = reopenRequest.result;
            database.createObjectStore(STORE_NAME, { keyPath: 'id' });
            // console.log("Object store created");
          };

          reopenRequest.onsuccess = () => {
            db = reopenRequest.result;
            // console.log("Database reopened with new version");
            resolve(db);
          };

          reopenRequest.onerror = () => {
            // console.error("Error reopening database:", reopenRequest.error);
            reject(new Error("Error reopening database"));
          };
        } else {
          resolve(db);
        }
      };

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: 'id' });
          // console.log("Object store created");
        }
      };
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export const saveState = (state: unknown): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put({ id: 'currentState', state: JSON.stringify(state) });

    request.onerror = () => {
      console.error("Error saving state:", request.error);
      reject(new Error("Error saving state"));
    };

    request.onsuccess = () => {
      // console.log("State saved successfully");
      resolve();
    };
  });
};

export const loadState = (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get('currentState');

    request.onerror = () => {
      console.error("Error loading state:", request.error);
      reject(new Error("Error loading state"));
    };

    request.onsuccess = () => {
      const result = request.result as ProjectState | undefined;
      if (result) {
        // console.log("State loaded successfully");
        resolve(JSON.parse(result.state));
      } else {
        // console.log("No saved state found");
        resolve(null);
      }
    };
  });
};

export const ensureDBInitialized = async (): Promise<void> => {
  if (!db) {
    await initDB();
  }
};