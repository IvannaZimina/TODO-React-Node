import React from 'react';
import {useState} from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [ file, setFile ] = useState('');
    const [ filename, setFilename ] = useState('Choose file');
    const [ uploadedFile, setUploadedFile] = useState({});

    const onChange = (ev) => {
        setFile(ev.target.files[0]);
        setFilename(ev.target.files[0].name);
    };

    const onSubmit = async ev => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post('/authForm/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
        } catch (err) {
            if(err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <>
            <div className="container mt-5">
                <form onSubmit={onSubmit}>
                    <div className="input-group mb-4">
                        <input type="file" className="form-control" onChange={onChange}/>
                        <input type="submit" value="Upload" className="btn btn-outline-secondary btn-block"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FileUpload
