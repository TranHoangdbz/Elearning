import React from 'react';
import { Rating, Avatar } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ReplyCommentCard from './ReplyCommentCard';

function CommentCard(props) {
    console.log("commentProps", props);
    
    const calculateTime = (timeString) => {
        const postTime = new Date(timeString);
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
    
    return (
        <div className='chat-user-model'>
            <div className='chat-user-model__header'>
                <Avatar sx={{ marginRight: '12px' }} height={36} width={36} alt="Remy Sharp" src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/7/9/photo-1-16257989599561090737937.jpeg" />
                <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name'>John Keith</div>
                <div style={{ fontFamily: "'Montserrat', san-serif" }} className='time'>
                    {
                        props.comment ? calculateTime(props.comment.comment.time) : ""
                    }
                </div>
            </div>
            <div className='chat-user-model__content'>
                <div className='content'>
                    {props.comment ? props.comment.comment.content : ""}
                </div>
                <div className='like-cmt'>
                    <div style={{ marginRight: '27px', cursor: 'pointer' }}>
                        <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                    </div>
                    <div style={{ marginRight: '27px', transform: 'translateY(8%)', cursor: 'pointer' }}>
                        <ForumOutlinedIcon></ForumOutlinedIcon>
                    </div>
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='like'>{props.comment ? props.comment.comment.likes.length : '0'} likes</div>
                </div>
                {
                    props.comment.repliedComments.map((value, index,key) => {
                        return (<ReplyCommentCard comment={value}/>);
                    })
                }
            </div>
        </div>
    );
}

export default CommentCard;