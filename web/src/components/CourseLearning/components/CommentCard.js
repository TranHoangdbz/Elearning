import React from 'react';
import { Rating, Avatar } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
function CommentCard(props) {
    return (
        <div className='chat-user-model'>
            <div className='chat-user-model__header'>
                <Avatar sx={{ marginRight: '12px' }} height={36} width={36} alt="Remy Sharp" src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/7/9/photo-1-16257989599561090737937.jpeg" />
                <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name'>John Keith</div>
                <div style={{ fontFamily: "'Montserrat', san-serif" }} className='time'>3 months ago</div>
            </div>
            <div className='chat-user-model__content'>
                <div className='content'>
                    This is a wonderful course, highly recommend
                </div>
                <div className='like-cmt'>
                    <div style={{ marginRight: '27px', cursor: 'pointer' }}>
                        <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                    </div>
                    <div style={{ marginRight: '27px', transform: 'translateY(8%)', cursor: 'pointer' }}>
                        <ForumOutlinedIcon></ForumOutlinedIcon>
                    </div>
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='like'>3 likes</div>
                </div>
                {/* Tại đây */}
                {
                    props.componentChild ? props.componentChild : null
                }
            </div>
        </div>
    );
}

export default CommentCard;