import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
    id: string;
    content: string;
}

const Draggable: React.FC<DraggableProps> = ({ id, content }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        cursor: 'move',
        padding: "0.5rem",
        borderBottom: "1px solid #fff",
        listStyle: "none",
        backgroundColor: "#1e8791",
        width: "10rem"

    };

    return (
        <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {content}
        </li>
    );
};

export default Draggable;
