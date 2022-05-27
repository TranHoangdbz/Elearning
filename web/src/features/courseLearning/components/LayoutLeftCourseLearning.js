import React from 'react';
import './CourseLearning.scss'
import OverviewAndQuizz from './OverviewAndQuizz';

function LayoutLeftCourseLearning(props) {
    return (
        <div className="layout-left">
            <iframe
                className='video'
                width="100%" height="515"
                src="https://res.cloudinary.com/dry9yzxep/video/upload/v1653557155/courses/COURSE2/L1/course2_l1_atqbr4.mp4"
            >
            </iframe>
            <OverviewAndQuizz lesson={props.lesson} lessonSelect={props.lessonSelect}></OverviewAndQuizz>
        </div>
    );
}

export default LayoutLeftCourseLearning;