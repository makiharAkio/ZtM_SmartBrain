import React from "react";
import './ImgLinkForm.css';

const ImgLinkForm = ({ onInputChange, onClickDetect }) => {
    return (
        <div>  
            <p className="f3">
                {'Magic Brain will detect faces. Try it out!'}
            </p>
            <div className="center">
                <div className="form pa4 br3 shadow-5 center">
                    <input className="f4 pa2 w-70 center" type={'text'} 
                    onChange={ onInputChange }/>
                    <button className="w-30 grow f4 ph3 pv2 dib white bg-light-purple" 
                    onClick={ onClickDetect }>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImgLinkForm;