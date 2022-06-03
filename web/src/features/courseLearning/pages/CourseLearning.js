import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components/CourseLearning.scss';
import { Container, Grid, Avatar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import CardCourse from '../components/CardCourse';
import LayoutLeftCourseLearning from '../components/LayoutLeftCourseLearning';
import URL_API from '../../../services/API/config';
import AjaxHelper from '../../../services/index';
import {
    setCurrentCourse, 
    changeCurrentLessonIndex,
    setCurrentUserInfo
} from '../courseLearningSlice.js';

function CourseLearning() {


    const dispatch = useDispatch();

    const url = window.location.pathname;
    const path = url.split("/").filter((x) => x);
    // console.log("path", path);
    const currentUserID = useSelector((state) => {return state.courseLearning.currentUserID});
    const currentCourseID = path.length > 1 ?  path[path.length-1] : "628e51cbb64e260717ce07b2";
    const [selectLesson, setSelectLesson] = useState(0) 
    const [lessons, setLessons] = useState([])

    // Get all content of the current course
    useEffect(() => {
        // let id = '628e51cbb64e260717ce07b2'
        const fetchCourse = async () => {
            await AjaxHelper.get(URL_API.URL_SYSTEM_V1 + '/discussions/lesson-quizz/' + currentCourseID)
                .then(res => {
                    // console.log("res", res)
                    //setLessons(res.data.data.lessons);
                    dispatch(setCurrentCourse(res.data.currentCourse));
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchCourse()
        const fetchUserInfo = async () => {
            await AjaxHelper.get(URL_API.URL_SYSTEM_V1 + '/discussions/user/' + currentUserID)
                .then(res => {
                    // console.log("res", res.data.data)
                    //setLessons(res.data.data.lessons);
                    dispatch(setCurrentUserInfo(res.data.data));
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchUserInfo()
    }, [])

    // Lấy thử current course
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    console.log("currentCourse", currentCourse);
    
    const currentUserInfo = useSelector((state) => {return state.courseLearning.currentUserInfo});
    console.log("currentUserInfo", currentUserInfo);

    
    const handleClickLesson = (index) => {
        // Get lesson hiện tại ở đây
        dispatch(changeCurrentLessonIndex(index));
    }

    const calculateStar = (ratingArray) => {
        var sum = 0;
        if(typeof ratingArray == 'undefined') return 0;
        ratingArray.forEach(element => {
            sum += element.rate;
        });
        return Math.round(sum*10 / ratingArray.length) / 10
    }



    return (
        <Container spacing={2} style={{ marginTop: '40px' }} maxWidth='xl'>
            <Grid spacing={1} container>
                <Grid item lg={8} md={12} sm={12}>
                    <LayoutLeftCourseLearning/>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <div className='layout-right'>
                        <div className='name-course' style={{ fontFamily: "'Montserrat', san-serif" }}>
                            {currentCourse && typeof currentCourse.courseName!='undefined' && currentCourse.courseName  ? currentCourse.courseName : ""}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px', paddingRight: '25px' }}>
                            <div className='students' style={{ fontFamily: "'Montserrat', san-serif" }}>0 students</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className='rating' style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p style={{ marginRight: '10px', marginTop: '0', marginBottom: '0', fontFamily: "'Montserrat', san-serif" }}>
                                        {currentCourse ? calculateStar(currentCourse.rating): ""}
                                    </p>
                                    <StarIcon style={{ color: '#FFD601' }}></StarIcon>
                                </div>
                                <div className='view' style={{ display: 'flex', justifyContent: 'center', fontFamily: "'Montserrat', san-serif" }}>
                                    {currentCourse && currentCourse.rating && currentCourse.rating.length ?currentCourse.rating.length:"4.8"} reviews
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px', paddingRight: '25px' }}>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <Avatar height={50} width={50} alt="Remy Sharp" 
                                    src={currentCourse.teacher ? currentCourse.teacher.profilePicture : ""}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center' }}>
                                    <div className='name' style={{ fontFamily: "'Montserrat', san-serif" }}>
                                        {currentCourse.teacher ? currentCourse.teacher.fullName : ""}
                                    </div>
                                    <div className='major' style={{ fontFamily: "'Montserrat', san-serif" }}>
                                        {currentCourse.teacher ? currentCourse.teacher.title : ""}
                                    </div>
                                </div>
                            </div>
                            <div className='enroll' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', fontFamily: "'Montserrat', san-serif" }}>
                                Enroll
                            </div>
                        </div>
                        <div style={{ display: 'flex', paddingLeft: '25px', marginTop: '12px', paddingRight: '25px' }}>
                            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description'>
                                {currentCourse ? currentCourse.description : ""}
                            </div>
                        </div>
                        <div className='list-course'>
                            {
                                currentCourse.lessons ? currentCourse.lessons.map((lesson, index, key) => (
                                    <CardCourse handleClickLesson={handleClickLesson} key={index} index={index} lesson={lesson}></CardCourse>
                                )) : null
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CourseLearning