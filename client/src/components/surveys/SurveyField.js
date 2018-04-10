// to render a single input
import React from 'react';

          
export default ({input, label, placeHolder ,meta:{error, touched} }) => {

    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}} placeholder=  {placeHolder} />
                <div className="red-text" style={{marginBottom: '20px'}} >
                    {touched && error}
                </div>
            </div>
    );
}
          