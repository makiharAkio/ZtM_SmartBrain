import React from "react";
import './FaceReco.css';

const FaceReco = ({ box, imgUrl }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImg' alt="face-reco" src={imgUrl} width='500px' height={'auto'} />
                <div className="bounding-box" style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.botRow,
                    left: box.leftCol,
                }}></div>
            </div>
        </div>
    );
}

export default FaceReco;