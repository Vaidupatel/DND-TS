import React, { useMemo } from 'react';

interface StyleFormProps {
  styleOptions: { label: string; type: string; name: string; value?: string }[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setBaseStyles: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  onDelete: () => void;
}

const StyleForm: React.FC<StyleFormProps> = ({ styleOptions, searchTerm, setSearchTerm, setBaseStyles, onDelete }) => {
  const filteredOptions = useMemo(
    () => styleOptions.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [styleOptions, searchTerm]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const newValue = e.target.value;
    setBaseStyles(prevStyles => ({
      ...prevStyles,
      [name]: newValue,
    }));
  };

  return (
    <div className="style-form">
      <button type="button" onClick={onDelete} className="button">
        Delete
      </button>
      <input
        type="text"
        placeholder="Search styles..."
        className="inputField"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="searchInput"
      />
      {filteredOptions.map(option => (
        <div key={option.name}>
          <label htmlFor={`input-${option.name}`}>{option.label}</label>
          <input
            type={option.type}
            className="inputField"
            name={option.name}
            value={option.value || ''}
            onChange={(e) => handleInputChange(e, option.name)}
            id={`input-${option.name}`}
          />
        </div>
      ))}
    </div>
  );
};

export default StyleForm;
