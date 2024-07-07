import React from 'react'


interface ButtonComponentProps {
    childIndex: number;
    parentID: string;
    draggedItemType: string | null;
}
const ButtonComponent: React.FC<ButtonComponentProps> = ({ childIndex, parentID, draggedItemType }) => {
    const droppableButtonid = `droppableButton-${parentID}-${childIndex}`;

    return (
        <React.Fragment>
            <button>
                click me!
            </button>
        </React.Fragment>
    )
}

export default ButtonComponent