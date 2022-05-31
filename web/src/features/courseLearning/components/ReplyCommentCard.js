import React from 'react';
import { Rating, Avatar } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
function ReplyCommentCard(props) {
    console.log("replycommentProps", props);
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

    return (
        <div className='chat-user-model'>
            <div className='chat-user-model__header'>
                <Avatar sx={{ marginRight: '12px' }} height={36} width={36} alt="Remy Sharp" src={props.comment.avatar} />
                <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name'>
                    {props.comment.username}
                </div>
                <div style={{ fontFamily: "'Montserrat', san-serif" }} className='time'>
                    {props ? calculateTime(props.comment.time) : ""}
                </div>
            </div>
            <div className='chat-user-model__content'>
                <div className='content'>
                    {props ? props.comment.content : ""}
                </div>
                <div className='like-cmt'>
                    <div style={{ marginRight: '27px', cursor: 'pointer' }}>
                        <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                    </div>
                    <div style={{ marginRight: '27px', transform: 'translateY(8%)', cursor: 'pointer' }}>
                        <ForumOutlinedIcon></ForumOutlinedIcon>
                    </div>
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='like'>{props ? props.comment.likes.length : "3"} likes</div>
                </div>  
            </div>
        </div>
    );
}

export default ReplyCommentCard;