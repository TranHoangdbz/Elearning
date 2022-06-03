import React from 'react';
import './CourseLearning.scss'
import LockIcon from '@mui/icons-material/Lock';
import { useSelector, useDispatch } from 'react-redux';

function CardCourse(props) {
    const handleClickCourse = () => {
        props.handleClickLesson(props.index)
    }
    const currentLesson = useSelector(state => {
        return state.courseLearning.currentCourse.lessons[state.courseLearning.currentLessonIndex]}
    );
    return (
        <div onClick={handleClickCourse} style={{ display: 'flex', justifyContent: 'space-between' }} className={/*props.course.unClock ?*/ 'course unclock'}>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} >
                {props.index + 1}.  {props.lesson.description ? props.lesson.description : 'Error'}
            </div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} >
                {currentLesson.lessonVolume} min
            </div>
            <div className='layout-lock'>
                <LockIcon />
            </div>
        </div>
    );
}

export default CardCourse;