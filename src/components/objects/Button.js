import {useState} from 'react';

const Button = props => {
    return (
        <button 
            className={"button medium " +
            props.color + "-color " + 
            props.color + "-view " + 
            props.border + "-border round-5px small-spaced no-select"}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default Button;