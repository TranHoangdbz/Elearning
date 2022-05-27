import React from 'react';
import './CourseLearning.scss'
import OverviewAndQuizz from './OverviewAndQuizz';

function LayoutLeftCourseLearning(props) {
    return (
        <div className="layout-left">
            <iframe
                className='video'
                width="100%" height="515"
                src={props.lessonSelect.video}
            >
            </iframe>
            <OverviewAndQuizz course={props.course} lesson={props.lesson} lessonSelect={props.lessonSelect}></OverviewAndQuizz>
        </div>
    );
}

export default LayoutLeftCourseLearning;