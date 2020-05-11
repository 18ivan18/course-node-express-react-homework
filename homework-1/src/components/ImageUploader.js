const React = require('react')

const ImageUploader = ({ handleChange }) => {
    return (
    <div className="file-field input-field">
        <div className="btn">
            <span>File</span>
            <input type="file" onChange={handleChange}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
    </div> 
    );
}

export default ImageUploader