import React from 'react';
import './buttons.css';

const Buttons = (props) => {
    return(
        <div className='btns'>
            <button onClick={props.cancel}>Отмена хода</button>
            <button onClick={props.restart}>Сначала</button>
        </div>
    )
}
export default Buttons;