import React from 'react';
import { Rating, Avatar } from '@mui/material'
import CommentCard from './CommentCard';
import {useDispatch, useSelector} from 'react-redux';
import {useRef, useEffect, useState } from "react";
import URL_API from '../../../services/API/config';
import AjaxHelper from '../../../services/index';
import {setCurrentCourse} from '../courseLearningSlice.js';

function Overview(props) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    const currentUserInfo = useSelector((state) => {return state.courseLearning.currentUserInfo});
    // console.log("currentUserInfo", currentUserInfo);

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

    // Phần check điều kiện đánh giá
    const userCurrentProgress =  useSelector((state) => {
        if(!state.courseLearning.currentCourse.lessons) return 0;
        return state.courseLearning.userLessonIndex / state.courseLearning.currentCourse.lessons.length;
    })

    const getUserRating = () => {
        var userRating  = 0;
        var currentRating = currentCourse.rating;
        console.log(currentCourse);
        if(currentRating) {
            for(var i = 0; i < currentRating.length; i++){
                if(currentRating[i].user == currentUserInfo._id) {
                    userRating = currentRating[i].rate;
                    break;
                }
            }
        }
        return userRating;
    }
    
    useEffect(() => {
        if(!isChangeRating)
        {
            console.log("ủa alo");
            setValue(getUserRating());
        }
            
    })

    const [isChangeRating, setIsChangeRating] = useState(false);

    const sendRating =  async(rating) => {
        const dataSendRating = {
            courseID: currentCourse._id,
            rate: rating,
            userID: currentUserInfo._id,
        }
        // console.log("dataSendRating", dataSendRating);

        await AjaxHelper.post(URL_API.URL_SYSTEM_V1 + '/discussions/rating/',  dataSendRating)
            .then(res => {
                // dispatch(setCurrentCourse(res.data.currentCourse));
                setIsChangeRating(true);
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
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='title'>
                        {
                            userCurrentProgress < 0.7 ?
                                [
                                    <>
                                        Finish at least 70% the lessons of this course to rate it
                                    </>,
                                    <div style={{marginBottom: 8}}></div>
                                ]
                            :
                                <>
                                    How do you feel about the course ?       
                                </>
                        }
                        
                    </div>
                    {
                            userCurrentProgress < 0.7 ? (null) :
                                <Rating
                                    sx={{ margin: '15px 0' }}
                                    name="simple-controlled"
                                    value={value}
                                    size='large'
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        sendRating(newValue)
                                    }}
                                />
                    }
                    
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