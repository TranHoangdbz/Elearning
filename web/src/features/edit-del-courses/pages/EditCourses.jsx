import React, {useRef, useState}  from 'react';
import './editcourse.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TextField, FormControl, Select, InputLabel, MenuItem, CircularProgress } from '@mui/material';
import axios, { CancelToken, isCancel } from "axios";
const EditCourses = () => {
    const [course, setCourse] = React.useState('');
    // checkvaildate
    const [validate, setValidate] = useState(false);
    const checkvaildate =(event) =>{
        
    }
    // mở thông báo
    const [popup, setPopup] = React.useState(false);
    const handleChange = (event) => {
        setCourse(event.target.value);
    };

    // nhập file 
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const cancelFileUpload = useRef(null);

    const uploadFile = ({ target: { files } }) => {
        let data = new FormData();
        data.append("file", files[0]);

        const options = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;

                let percent = Math.floor((loaded * 100) / total);

                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
            cancelToken: new CancelToken(
                cancel => (cancelFileUpload.current = cancel)
            )
        };

        axios
            .post(
                "link_vo_day_back",
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

                if (isCancel(err)) {
                    alert(err.message);
                }
                setUploadPercentage(0);
            });
    };
    // Khúc này chưa thêm
    const cancelUpload = () => {
        if (cancelFileUpload.current)
            cancelFileUpload.current("User has canceled the file upload.");
    };

  return (
    <div className='editLesson'>
        <div className="editLesson-inner">       
            <button className='header__right'> <CancelOutlinedIcon color="secondary" fontSize="large"/> </button>
            <div className="edit__header">
                <h2 className='header__center'>Edit lesson</h2>
            </div>
            <div className="edit__body">
               <p className="title">Name</p>
               <TextField   
                    error ={validate}
                    id="outlined-size-small"
                    size="small"
                    inputProps={{style: {fontSize: 14}}}
                    
                />
               <p className="title">Description</p>
               <TextField   
                    error = {validate}
                    name="Lesson description"
                    fullWidth
                    multiline={true}
                    rows={6}
                    id="outlined-size-small"
                    size="small"
                    inputProps={{style: {fontSize: 14}}}
                    
                />
                <p className="title">Select courses</p>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    
                    <Select
                        style={{width: 250, fontSize: 14,}}
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={course}
                        
                        onChange={handleChange}
                        
                    >
                        <MenuItem style={{ fontSize: 14, fontFamily: "monospace" }} value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem style={{ fontSize: 14, fontFamily: "monospace" }} value={10}>Front end course</MenuItem>
                        <MenuItem style={{ fontSize: 14, fontFamily: "monospace" }} value={20}>HTML - CSS zero to hero</MenuItem>
                        <MenuItem style={{ fontSize: 14, fontFamily: "monospace" }} value={30}>React Native beginer</MenuItem>
                    </Select>
                </FormControl>
                <div className="editcourse__video">
                    <div className="video_components">
                        <div className="video_header">
                            <p className="title">Thumbnail</p>
                            <label htmlFor="fileThumbnail" className="btnn_select" >Select Image </label>
                            <input type='file' id='fileThumbnail' onChange={uploadFile} style={{display:'none'}} />
                        </div>

                        <div className="video_body">
                            {uploadPercentage > 0 && (
                                <CircularProgress color="success" variant="determinate" value={100} />
                            )}
                        </div>
                    </div>
                    <div className="video_components">
                        <div className="video_header">
                            <p className="title">Video</p>
                            <label htmlFor="fileVideo" className="btnn_select" >Select Video </label>
                            <input type='file' id='fileVideo' onChange={uploadFile} style={{display:'none'}} />
                        </div>
                        <div className="video_body">
                            {uploadPercentage > 0 && (
                                <CircularProgress color="success" variant="determinate" value={100} />
                            )}
                        </div>
                        
                    </div>
                    
                </div>
                <button className="btn_save"
                    onClick={()=> setPopup(true)}    
                >
                    Save all
                </button>
            </div>
            {popup && (
                <div className='overlay'>
                    <div  className='popup'>
                        <div className='header'>
                            <h2 className='header__title'>Confirm action</h2>
                            <button className='header__right' onClick={()=> setPopup(false)}> <CancelOutlinedIcon color="secondary" fontSize="large"/> </button>
                        </div>
                        <p>This is confirm message we will pass into the model</p>
                        <div className='footer'>
                            <div className='footer__left'></div>
                            <div className='footer__right'>
                                <button className='btn__cancel' onClick={()=> setPopup(false)}> Cancel </button>
                                <button className='btn__ok' onClick={()=> setPopup(false)}> Ok </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    </div>
  );
}

export default EditCourses;
