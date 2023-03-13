import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">  
            <Tilt className="Tilt br2 shadow-2">
                <div className="pa3">
                    <img src={brain} alt="https://icons8.com" />
                    <br />
                    <a target="_blank" rel="noreferrer" href="https://icons8.com/icon/114894/brain">Brain </a> 
                    icon by <a target="_blank" rel="noreferrer" href="https://icons8.com">Icons8</a>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;