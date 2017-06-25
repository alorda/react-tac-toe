import React from 'react';
import './index.css';

// this is reduced to a functional component
const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;
