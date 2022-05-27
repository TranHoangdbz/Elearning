import React from 'react';
import './CourseLearning.scss'
import LockIcon from '@mui/icons-material/Lock';
function CardCourse(props) {
    const handleClickCourse = () => {
        if(props.course.unClock) {
            console.log('Chuyển khóa học')
        } else {
            console.log('Khóa học chưa được mở')
        }
    }
    return (
        <div onClick={handleClickCourse} style={{ display: 'flex', justifyContent: 'space-between' }} className={props.course.unClock ? 'course unclock' : 'course'}>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} >
                {props.course.stt ? props.course.stt : 'Error'}. {props.course.name ? props.course.name : 'Error'}
            </div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} >
                {props.course.time ? props.course.time : 'Error'}
            </div>
            <div className='layout-lock'>
                <LockIcon />
            </div>
        </div>
    );
}

export default CardCourse;