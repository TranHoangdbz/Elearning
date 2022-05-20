import React  from 'react';
import './editcourse.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
const EditCourses = () => {
    const [course, setCourse] = React.useState('');
    const [popup, setPopup] = React.useState(true);
    const handleChange = (event) => {
        setCourse(event.target.value);
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
                    label="Lesson name"
                    id="outlined-size-small"
                    size="small"
                    inputProps={{style: {fontSize: 14}}}
                    
                />
               <p className="title">Description</p>
               <TextField   
                    label="Lesson description"
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
                    <InputLabel id="demo-select-small">Course</InputLabel>
                    <Select
                        style={{width: 250, fontSize: 14,}}
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={course}
                        label="Course"
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
                            <button className="btnn_select">
                                Select Image
                            </button>
                        </div>
                        <div className="video_body">

                        </div>
                    </div>
                    <div className="video_components">
                        <div className="video_header">
                            <p className="title">Video</p>
                            <button className="btnn_select">
                                Select Video
                            </button>
                        </div>
                        <div className="video_body">

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
