import React from 'react';
import { Rating, Avatar } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import CommentCard from './CommentCard';
function Overview(props) {
    const [value, setValue] = React.useState(0);
    return (
        <div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Eget aliquet nibh praesent tristique magna. Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget.
                Platea dictumst quisque sagittis purus sit amet. Aliquet eget sit amet tellus cras. Egestas maecenas pharetra convallis posuere.
                Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Lacus vel facilisis volutpat est velit egestas.
                At varius vel pharetra vel. Viverra nam libero justo laoreet.
            </div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='quantity-discussions'>
                2 Discussions
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
                    <input className='chat-input' type={'text'}></input>
                    <div className='btn-send'>Send</div>
                </div>
                <div className='chat-user'>
                    <CommentCard
                        componentChild={false}
                    ></CommentCard>
                    <CommentCard
                        componentChild={<CommentCard
                            componentChild={<CommentCard></CommentCard>}
                        ></CommentCard>}
                    ></CommentCard>
                    <CommentCard
                        componentChild={<CommentCard></CommentCard>}
                    ></CommentCard>
                </div>
            </div>
        </div>
    );
}

export default Overview;