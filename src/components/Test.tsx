import React from 'react'

const Test = () => {
    return (
        <React.Fragment>
            <div>test</div>
            <Test />
            <Test />
        </React.Fragment>
    )
}

export default Test