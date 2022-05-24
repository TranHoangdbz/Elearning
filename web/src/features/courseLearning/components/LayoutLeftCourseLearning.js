import React from 'react';
import './CourseLearning.scss'
import OverviewAndQuizz from './OverviewAndQuizz';

function LayoutLeftCourseLearning(props) {
    return (
        <div className="layout-left">
            <iframe
                className='video'
                width="100%" height="515"
                src="https://www.youtube.com/embed/SlPhMPnQ58k"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            >
            </iframe>
            <OverviewAndQuizz></OverviewAndQuizz>
        </div>
    );
}

export default LayoutLeftCourseLearning;