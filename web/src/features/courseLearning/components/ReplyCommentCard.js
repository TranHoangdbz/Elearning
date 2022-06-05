import React, {useState, useRef} from 'react';
import {Avatar } from '@mui/material'
import {useDispatch, useSelector} from 'react-redux';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { FiMoreHorizontal } from "react-icons/fi";
import URL_API from '../../../services/API/config';
import AjaxHelper from '../../../services/index';
import {setCurrentCourse} from '../courseLearningSlice.js';
import { MdThumbUp } from "react-icons/md";

function ReplyCommentCard(props) {
    const dispatch = useDispatch();
    // console.log("replycommentProps", props);
    const calculateTime = (timeString) => {
        // console.log("timeString", timeString);
        const postTime = new Date(timeString);
        // console.log("calculating time", Math.abs(new Date() - postTime));
        var diff = Math.abs(new Date() - postTime);
        if(diff<1000*60){
            return ("0 minutes ago");
        }
        else if(diff<1000*60*60){
            return (Math.floor(diff/1000/60) +" minutes ago");
        }
        else if(diff<1000*60*60*24){
            return(Math.floor(diff/1000/60/60) +" hours ago");
        }
        else if(diff<1000*60*60*24*30) {
            return(Math.floor(diff/1000/60/60/24) +" days ago");
        }
        else if(diff<1000*60*60*24*365) {
            return(Math.floor(diff/1000/60/60/24/30) +" months ago");
        }
        else{
            return (Math.floor(diff/1000/60/60/24/365) +" years ago")
        }
    }
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    const currentUserInfo = useSelector((state) => {return state.courseLearning.currentUserInfo});
    const [isOpenManage, setIsOpenManage] = useState(false);

    const deleteComment = async() => {
        var dataToDelete = {
            parrentCommentID : props.parrentCommentID,
            commentID: props.comment._id,
            courseID: currentCourse._id
        }
        // console.log("dataToDelete",dataToDelete);
        setIsOpenManage(false);
        await AjaxHelper.post(URL_API.URL_SYSTEM_V1 + '/discussions/comment/delete', dataToDelete)
            .then(res => {
                dispatch(setCurrentCourse(res.data.currentCourse));
                // cmtContentRef.current.value="";
                // setDisplayAnswer(false);
            })
            .catch(err => {
            })
    }

    const likeComment = async() => {
        var dataToLike = {
            commentID: props.comment._id,
            courseID: currentCourse._id,
            userID: currentUserInfo._id,
            parrentCommentID: props.parrentCommentID,
        }
        // console.log("dataToLike", dataToLike);

        await AjaxHelper.post(URL_API.URL_SYSTEM_V1 + '/discussions/comment/like', dataToLike)
        .then(res => {
            dispatch(setCurrentCourse(res.data.currentCourse));
            // cmtContentRef.current.value="";
            // setDisplayAnswer(false);
        })
        .catch(err => {
        })
    }

    const unlikeComment = async() => {
        var dataToUnLike = {
            commentID: props.comment._id,
            courseID: currentCourse._id,
            userID: currentUserInfo._id,
            parrentCommentID: props.parrentCommentID,
        }
        // console.log("dataToLike", dataToLike);

        await AjaxHelper.post(URL_API.URL_SYSTEM_V1 + '/discussions/comment/dislike', dataToUnLike)
        .then(res => {
            dispatch(setCurrentCourse(res.data.currentCourse));
            // cmtContentRef.current.value="";
            // setDisplayAnswer(false);
        })
        .catch(err => {
        })
    }

    // Edit document    

    const [isEditDocument, setIsEditDocument] = useState(false);

    const toEditComment = async() => {
        setIsEditDocument(true);
        setIsOpenManage(false);
    }

    const cancelEdit = async() => {
        setIsEditDocument(false);
        cmtContentEditRef.current.value="";
    }

    var cmtContentEditRef = useRef(null);

    const editDocument = async() => {
        var dataToEdit = {
            commentID: props.comment._id,
            courseID: currentCourse._id,
            parrentCommentID: props.parrentCommentID,
            content: cmtContentEditRef.current.value,
        }
        setIsEditDocument(false);
        // console.log("dataToEdit", dataToEdit);
        await AjaxHelper.put(URL_API.URL_SYSTEM_V1 + '/discussions/comment', dataToEdit)
        .then(res => {
            dispatch(setCurrentCourse(res.data.currentCourse));
        })
        .catch(err => {
        })
    }


    return (
        <div className='chat-user-model'>
            {
                isEditDocument ? null :
                <div className='chat-user-model__header'>
                    <Avatar sx={{ marginRight: '12px' }} height={36} width={36} alt="Remy Sharp" src={props.comment.avatar} />
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name'>
                        {props.comment.username}
                    </div>
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='time'>
                        {props ? calculateTime(props.comment.time) : ""}
                    </div>
                </div>
            }
            <div className='chat-user-model__content'>
                {!isEditDocument ? 
                    [
                        <div className='content'>
                            {props ? props.comment.content : ""}
                        </div>,
                        <div className='like-cmt'>
                            {
                                props.comment && props.comment.likes.includes(currentUserInfo._id) 
                                ?   <div 
                                        className="like-cmt-button unlike"
                                        onClick={() => {
                                            unlikeComment();
                                        }}
                                        style={{ marginRight: '27px', cursor: 'pointer' }}
                                    >
                                        <MdThumbUp size={16}></MdThumbUp>
                                    </div>
                                :   <div 
                                        className="like-cmt-button"
                                        onClick={() => {
                                            likeComment();
                                        }}
                                        style={{ marginRight: '27px', cursor: 'pointer' }}
                                    >
                                        <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                    </div>
                            }
                            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='like'>{props ? props.comment.likes.length : "0"} likes</div>
                        </div>,
                        <div className="manage-container">
                            {
                                currentUserInfo._id === props.comment.user ?
                                <FiMoreHorizontal 
                                    className='icon-more'
                                    size={20}
                                    onClick={()=> {
                                        setIsOpenManage(!isOpenManage);
                                    }}
                                /> 
                                :null
                            }
                            {
                                isOpenManage ? 
                                
                                    <div className="manage-item-container">
                                        <div className='manage-item'
                                            onClick={() => {
                                                deleteComment();
                                            }}
                                        >
                                            Delete comment
                                        </div>
                                        <div className='manage-item'
                                            onClick={() => {
                                                console.log("ủa alo")
                                                toEditComment();
                                            }}
                                        >
                                            Edit comment
                                        </div>
                                    </div>
                                    
                                
                                : (null)
                            }
                            
                        </div>
                    ] : 
                    <div className='enter-chat enter-chat-1'>
                        <Avatar 
                            className="user-avatar"
                            sx={{ marginRight: '12px' }} 
                            height={36} width={36} 
                            alt="Remy Sharp" 
                            src={currentUserInfo ? currentUserInfo.profilePicture : ""}
                        />
                        <input 
                            className='chat-input edit-content' 
                            type={'text'}
                            ref = {cmtContentEditRef} 
                            defaultValue = {props.comment ? props.comment.content : ""}
                        >
                        </input>
                        <div 
                            className='btn-send btn-cancel'
                            onClick={()=>{
                                // dispatch(addComment({data:"ok"}));
                                // console.log(currentCourse);
                                // addNewComment();
                                cancelEdit();
                            }}
                        >
                            Cancel
                        </div>
                        <div 
                            className='btn-send'
                            onClick={()=>{
                                // dispatch(addComment({data:"ok"}));
                                // console.log(currentCourse);
                                // addNewComment();
                                editDocument();
                            }}
                        >
                            Edit
                        </div>
                    </div>
                }       
            </div>
        </div>
    );
}

export default ReplyCommentCard;