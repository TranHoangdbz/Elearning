import React, { useRef, useState } from 'react';
import './addcourse__.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
    TextField, FormControl, Select, InputLabel, DialogContent, DialogContentText,
    MenuItem, LinearProgress, Dialog, DialogActions, DialogTitle, Button
} from '@mui/material';
import axios, { CancelToken, isCancel } from "axios";
import API from '../../../../services/API/config';
import { Link } from "react-router-dom";


const AddCourse = (props) => {
    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState('');
    const [description, setDescription] = useState('')
    // mở thông báo
    const [popup, setPopup] = React.useState(false);
    const [popupFalse, setPopupFalse] = React.useState(false);
    const { setOpenModal } = props

    const handlepopupFalseOpen = () => {
        setPopupFalse(true);
    };

    const handlepopupFalseClose = () => {
        setPopupFalse(false);
    };
    // Change image
    const inputAvatarRef = useRef(null);
    const [thumbnail, setThumbnail] = useState()
    const [video, setVideo] = useState();
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const checkVaildate = () => {
        if (name === "") {
            setNameErr("Name is empty")
            return;
        }
        setNameErr("")
        setPopup(true);
    }
    // handle save
    const handleSave = () => {
        uploadFile(thumbnail, video);
        if (uploadPercentage === 0) {
            setPopup(false);
            setOpenModal(false);
        }

    }

    const imageChange = (event) => {
        if (isFileImage(event.target.files[0])) {
            setThumbnail(event.target.files[0]);
        } else {
            alert("Tệp nên là file image");
        }

    };

    function isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }
    // Change video

    const videoChange = (event) => {
        if (isFileVideo(event.target.files[0])) {
            setVideo(event.target.files[0]);
        } else {
            alert("Tệp nên là video");
        }
    };

    function isFileVideo(file) {
        //console.log(file);
        return file && file['type'].split('/')[0] === 'video';
    }
    // upload file 

    const uploadFile = (thumbnail, video) => {
        let data = new FormData();
        data.append("thumbnail", thumbnail);
        data.append("video", video);
        data.append("courseName", name);
        data.append("description", description);
        const options = {
            Headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;

                let percent = Math.floor((loaded * 100) / total);

                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },

        };


        axios
            .post(
                `${API.URL_ADD_COURSE}`,
                data,
                options
            )
            .then(res => {
                console.log(res);
                setUploadPercentage(100);

                setTimeout(() => {
                    setUploadPercentage(0);
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                setPopupFalse(true);
                if (isCancel(err)) {
                    alert(err.message);
                }
                setUploadPercentage(0);
            });
    };

    return (

        <div className="editLesson-inner">

            <div className="edit__header">
                <h2 className='header__center'>Add course</h2>
            </div>
            <div className="edit__body">
                <p className="title">Name</p>
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={nameErr}
                    id="outlined-size-small"
                    size="small"
                    inputProps={{ style: { fontSize: 14 } }}
                    FormHelperTextProps={{ style: { fontSize: 12 } }}
                    helperText={nameErr}
                    style={{ width: 400 }}
                />
                <p className="title">Description</p>
                <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="Lesson description"
                    fullWidth
                    multiline={true}
                    rows={6}
                    id="outlined-size-small"
                    size="small"
                    inputProps={{ style: { fontSize: 14 } }}

                />

                <div className="editcourse__video">
                    <div className="video_components">
                        <div className="video_header">
                            <p className="title">Thumbnail</p>
                            <label htmlFor="fileThumbnail" className="btnn_select" >Select Image </label>
                            <input ref={inputAvatarRef} type='file' id='fileThumbnail' onChange={imageChange} style={{ display: 'none' }} />
                        </div>

                        <div className="video_body">

                            <img src={thumbnail ? URL.createObjectURL(thumbnail) : null} style={{ height: 280 }} />
                        </div>
                    </div>
                    <div className="video_components">
                        <div className="video_header">
                            <p className="title">Video</p>
                            <label className="btnn_select" htmlFor="fileVideo"  >Select Video </label>

                            <input type='file' id='fileVideo' onChange={videoChange} style={{ display: 'none' }} />
                        </div>
                        <div className="video_body">


                            <video src={video ? URL.createObjectURL(video) : null} style={{ height: 280 }} controls />
                        </div>

                    </div>

                </div>
                <button className="btn_save"
                    onClick={checkVaildate}
                >
                    Save all
                </button>

                <button className="btn_cancel" onClick={() => setOpenModal(false)}>
                    Cancel
                </button>
            </div>
            <Dialog open={popup} >
                <DialogTitle style={{ fontSize: 18 }} id="alert-dialog-title">
                    {"Confirm action"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontSize: 16 }} id="alert-dialog-description">
                        This is confirm message we will pass into the model
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" style={{ fontSize: 12 }} onClick={() => setPopup(false)}>Cancel</Button>
                    <Button variant="contained" style={{ fontSize: 12 }} onClick={() => handleSave()}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={popupFalse}
                onClose={handlepopupFalseClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ fontSize: 18 }} id="alert-dialog-title">
                    {"Your create course have false. Please check your index"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontSize: 16 }} id="alert-dialog-description">
                        Some reason you maybe have: Your course name has been created, your courses description is null, etc...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ fontSize: 16 }} onClick={handlepopupFalseClose}>OK</Button>
                </DialogActions>
            </Dialog>

        </div>

    );
}

export default AddCourse;
