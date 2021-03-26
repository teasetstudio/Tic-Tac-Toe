import React from 'react';
import './player.css';

const Player = (props) => {

    return (
        <div>
            <div className='block'>
                <span>{props.scoreX}</span>
                <span className='score'>ОЧКИ</span>
                <span>{props.scoreY}</span>
            </div>
            <div className='block players'>
                <div className='pl x'>
                    <span className={props.player}>x</span>
                </div>
                <div className='pl o'>
                    <span className={props.player}>o</span>
                </div>                
            </div>
        </div>
        
    )
}
export default Player;