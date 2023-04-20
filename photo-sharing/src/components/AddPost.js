import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function AddPost({ uploadImage, captureFile }) {
    const [text, setText] = useState('');
    return (
        <div>
            <h1>Upload Image</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    uploadImage(text);
                }}>
                <input type={"file"}
                    accept={".jpg, .jpeg, .png, .bmp, .gif"}
                    onChange={captureFile}
                    required
                />
                <input type={"text"}
                    placeholder={"enter description"}
                    onChange={(e) => setText(e.target.value)}
                    required
                />

                <button> Upload </button>

            </form>
        </div>
    )
}

AddPost.protoType = {
    uploadImage : PropTypes.func,
    captureFile : PropTypes.func
};
