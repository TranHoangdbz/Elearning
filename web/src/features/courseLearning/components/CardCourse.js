import React from 'react';
import './CourseLearning.scss'
import LockIcon from '@mui/icons-material/Lock';
import { useSelector} from 'react-redux';

function CardCourse(props) {
    const handleClickCourse = () => {
        props.handleClickLesson(props.index)
    }

    const currentIndex = useSelector(state => {
        return state.courseLearning.currentLessonIndex
    });


    return (
        <div onClick={handleClickCourse} style={{ display: 'flex', justifyContent: 'space-between' }} 
            className={
                props.type === 'open' 
                    ? currentIndex === props.index ? 'course unlock' : 'course unlock unactive'
                    : 'course'}
        >
            <div style={{ fontFamily: "'Montserrat', san-serif" }} >
                {props.index + 1}.  {props.lesson.name ? props.lesson.name : 'Error'}
            </div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} >
                {props.lesson.lessonVolume} min 
            </div>
            <div className='layout-lock'>
                <LockIcon fontSize={"large"}/>
            </div>
        </div>
    );
}

export default CardCourse;