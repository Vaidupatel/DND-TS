

import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
    id: number;
    content: string;
}

const Draggable: React.FC<DraggableProps> = ({ id, content }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id.toString(),
    });

    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        cursor: 'move',
        padding: "0.5rem",
        borderBottom: "1px solid #fff",
        backgroundColor: "#1e8791",
        width: "10vw",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {content}
        </div>
    );
};

export default Draggable;