import React from 'react';
import { Rating, Avatar } from '@mui/material'
import CommentCard from './CommentCard';
import {useDispatch, useSelector} from 'react-redux';
import {useRef } from "react";
import URL_API from '../../../services/API/config';
import AjaxHelper from '../../../services/index';
import {setCurrentCourse} from '../courseLearningSlice.js';

function Overview(props) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    const currentUserInfo = useSelector((state) => {return state.courseLearning.currentUserInfo});
    console.log("currentUserInfo", currentUserInfo);

    const cmtContentRef = useRef(null);

    const addNewComment = async() => {
        var dataToAdd = {
            parrentCommentID: "",
            content: cmtContentRef.current.value,
            userID: currentUserInfo._id,
            courseID: currentCourse._id
        }
        // console.log("dataToAdd", dataToAdd);

        await AjaxHelper.post(URL_API.URL_SYSTEM_V1 + '/discussions/comment/', dataToAdd)
            .then(res => {
                dispatch(setCurrentCourse(res.data.currentCourse));
                cmtContentRef.current.value="";
            })
            .catch(err => {
            })
    }

    return (
        <div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description'>
                {currentCourse.description}
            </div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='quantity-discussions'>
                {currentCourse.discussion ? currentCourse.discussion.length : "0"} Discussions
            </div>
            <div className='model-rating'>
                <div className='custom'>
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='title'>Finish 70% the lessions of this course to rate it</div>
                    <Rating
                        sx={{ margin: '15px 0' }}
                        name="simple-controlled"
                        value={value}
                        size='large'
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} >Rate a course could help us improve the course</div>
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} >quality as well as helping other users</div>
                    <div className='line'></div>
                </div>
            </div>
            <div className='chat'>
                <div className='enter-chat'>
                    <Avatar 
                        sx={{ marginRight: '12px' }} 
                        height={36} width={36} 
                        alt="Remy Sharp" 
                        src={currentUserInfo ? currentUserInfo.profilePicture : ""}
                    />
                    <input 
                        className='chat-input' 
                        type={'text'}
                        ref = {cmtContentRef} 
                    >
                        
                    </input>
                    <div 
                        className='btn-send'
                        onClick={()=>{
                            // dispatch(addComment({data:"ok"}));
                            // console.log(currentCourse);
                            addNewComment();
                        }}
                    >
                        Send
                    </div>
                </div>
                {/* <button
                    onClick={()=>{
                        dispatch(addComment({data:"ok"}));
                    }}  
                >
                    Nguyễn Công Phi
                </button> */}
                <div className='chat-user'>
                    {
                        currentCourse && currentCourse.discussion
                        ?   currentCourse.discussion.map((value, index, key) => {
                                return <CommentCard comment={value}></CommentCard>
                            })
                        : (null)
                    }
                </div>
            </div>
        </div>
    );
}

export default Overview;