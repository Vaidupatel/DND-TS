import React from 'react'


interface SelectComponentProps {
    childIndex: number;
    parentID: string;
    draggedItemType: string | null;
}
const SelectComponent: React.FC<SelectComponentProps> = ({ childIndex, parentID, draggedItemType }) => {
    const droppableSelectid = `droppableSelect-${parentID}-${childIndex}`;

    return (
        <React.Fragment>
            <select name="" id="">
            </select>
        </React.Fragment>
    )
}

export default SelectComponent