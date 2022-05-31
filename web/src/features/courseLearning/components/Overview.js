import React from 'react';
import { Rating, Avatar } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import CommentCard from './CommentCard';
import {useDispatch, useSelector} from 'react-redux';
import {addComment} from '../courseLearningSlice';
import { useState, useEffect, useRef } from "react";

function Overview(props) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});

    const comments = useSelector((state) => {
        console.log("state", state);
        return [];
    }) || [];

    console.log("comments", comments);
    const cmtContentRef = useRef(null);

    var currentLessonID = "628f9cb6495c3273aae3408c";
    

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
                    <Avatar sx={{ marginRight: '12px' }} height={36} width={36} alt="Remy Sharp" src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/7/9/photo-1-16257989599561090737937.jpeg" />
                    <input 
                        className='chat-input' 
                        type={'text'}
                        ref = {cmtContentRef} 
                    >
                        
                    </input>
                    <div 
                        className='btn-send'
                        onClick={()=>{
                            dispatch(addComment({data:"ok"}));
                            console.log(currentCourse);
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