import React from 'react';
import './CourseLearning.scss'
import OverviewAndQuizz from './OverviewAndQuizz';
import { useSelector, useDispatch } from 'react-redux';

function LayoutLeftCourseLearning(props) {
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    return (
        <div className="layout-left">
            <iframe
                className='video'
                width="100%" height="515"
                src={props.lessonSelect.video}
            >
            </iframe>
            <OverviewAndQuizz lesson={props.lesson} lessonSelect={props.lessonSelect}></OverviewAndQuizz>
        </div>
    );
}

export default LayoutLeftCourseLearning;