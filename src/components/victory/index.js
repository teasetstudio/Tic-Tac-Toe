import React from 'react';
import './victory.css';

const Victory = (props) => {
    return (
        <div className='victory'>
            <p className='hewin'><span>{props.whoVic}</span> победил!!</p>
            <p>Попробуете еще раз?</p>
            <p>Жмите кнопку <b>Сначала</b></p>
        </div>
    )
}
export default Victory;