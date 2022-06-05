import React from 'react';
import './CourseLearning.scss'
import OverviewAndQuizz from './OverviewAndQuizz';
import { useSelector} from 'react-redux';
// import ReactPlayer from 'react-player'
function LayoutLeftCourseLearning() {
    // const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    const currentLesson = useSelector(state => {
        if(state.courseLearning.currentCourse.lessons)
            return state.courseLearning.currentCourse.lessons[state.courseLearning.currentLessonIndex]
        return {}
    });
    // console.log("currentLesson", currentLesson)
    return (
        <div className="layout-left">
            <iframe
                className='video'
                width="100%" height="515"
                src={currentLesson ? currentLesson.video : ""}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title="lesson-video"
            >
            </iframe>
            {/* <Player url={currentLesson ? currentLesson.video : ""} 
                style={{width:'100%', height:"515px"}}
            />
            <Player ref={(player) => { this.player = player }}>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            </Player> */}
            {/* <iframe width="853" height="480" src="https://www.youtube.com/embed/_fC26fD3rSE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            <OverviewAndQuizz></OverviewAndQuizz>
        </div>
    );
}

export default LayoutLeftCourseLearning;