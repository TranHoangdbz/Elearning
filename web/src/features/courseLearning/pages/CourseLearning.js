import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components/CourseLearning.scss';
import { Container, Grid, Avatar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import CardCourse from '../components/CardCourse';
import LayoutLeftCourseLearning from '../components/LayoutLeftCourseLearning';
import URL_API from '../../../services/API/config';
import AjaxHelper from '../../../services/index';
import {setCurrentCourse} from '../courseLearningSlice.js';

const mockCourses = [
    {
        stt: 1,
        unClock: true,
        name: 'A summary about .NET',
        time: '5min'
    },
]

function CourseLearning() {
    const dispatch = useDispatch();

    const url = window.location.pathname;
    const path = url.split("/").filter((x) => x);
    console.log("path", path);

    const currentCourseID = path.length > 1 ?  path[path.length-1] : "628e51cbb64e260717ce07b2";

    const [selectLesson, setSelectLesson] = useState(0) 
    const [lessons, setLessons] = useState([])

    // Get all content of the current course
    useEffect(() => {
        // let id = '628e51cbb64e260717ce07b2'
        const fetchCourse = async () => {
            await AjaxHelper.get(URL_API.URL_SYSTEM_V1 + '/discussions/lesson-quizz/' + currentCourseID)
                .then(res => {
                    console.log("res", res)
                    //setLessons(res.data.data.lessons);
                    dispatch(setCurrentCourse(res.data.currentCourse));
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchCourse()
    }, [])

    // Lấy thử current course
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    const currentLesson = useSelector((state) => {return state.courseLearning.currentLessons});
    console.log("currentCourse", currentCourse);
    console.log("currentLesson" )

    const [mockLesson, setMockLesson] = useState([
        {
            lessonCode: "COURSE1L1",
            description: "Mỗi ngày 1 bài mới",
            video: "https://res.cloudinary.com/dry9yzxep/video/upload/v1653557155/courses/COURSE2/L1/course2_l1_atqbr4.mp4",
            quizz: [
                {
                    quizzCode: "COURSE2L1Q1",
                    question: "What is full-stack?",
                    choice: [
                        "Đáp án A câu 1",
                        "Đáp án B câu 1",
                        "Đáp án C câu 1",
                        "Đáp án d câu 1",
                    ],
                    answer: [0, 1],
                },
                {
                    quizzCode: "COURSE2L1Q2",
                    question: "What is fontend?",
                    choice: [
                        "Đáp án A câu 2",
                        "Đáp án B câu 2",
                        "Đáp án C câu 2",
                        "Đáp án d câu 2",
                    ],
                    answer: [0, 1],
                },
                {
                    quizzCode: "COURSE2L1Q3",
                    question: "What is backend?",
                    choice: [
                        "Đáp án A câu 3",
                        "Đáp án B câu 3",
                        "Đáp án C câu 3",
                        "Đáp án d câu 3",
                    ],
                    answer: [0, 1],
                },
            ],
            passed: [
                {
                    passed: false
                },
                {
                    passed: false
                },
            ],
            thumbnail: "http://res.cloudinary.com/ddpmmci58/image/upload/v1653662717/j5esd6cekivjuhb2uohg.png",
            name: "Mỗi ngày 1 bài mới",
        },
        {
            lessonCode: "COURSE1L2",
            description: "Let's get started with the basics",
            video: "https://res.cloudinary.com/dry9yzxep/video/upload/v1653557155/courses/COURSE2/L1/course2_l1_atqbr4.mp4",
            quizz: [
                {
                    quizzCode: "COURSE2L1Q1",
                    question: "What is full-stack? 2",
                    choice: [
                        "Đáp án A câu 1",
                        "Đáp án B câu 1",
                        "Đáp án C câu 1",
                        "Đáp án d câu 1",
                    ],
                    answer: [0, 1],
                },
                {
                    quizzCode: "COURSE2L1Q2",
                    question: "What is fontend? 2",
                    choice: [
                        "Đáp án A câu 2",
                        "Đáp án B câu 2",
                        "Đáp án C câu 2",
                        "Đáp án d câu 2",
                    ],
                    answer: [0, 1],
                },
                {
                    quizzCode: "COURSE2L1Q3",
                    question: "What is backend? 2",
                    choice: [
                        "Đáp án A câu 3",
                        "Đáp án B câu 3",
                        "Đáp án C câu 3",
                        "Đáp án d câu 3",
                    ],
                    answer: [0, 1],
                },
            ],
            passed: [
                {
                    passed: false
                },
                {
                    passed: false
                },
            ],
            thumbnail: "http://res.cloudinary.com/ddpmmci58/image/upload/v1653662717/j5esd6cekivjuhb2uohg.png",
            name: "Mỗi ngày 1 bài mới",
        }
    ])

    const handleClickLesson = (index) => {
        // Get lesson hiện tại ở đây
        setSelectLesson(index)
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
                    <LayoutLeftCourseLearning 
                        lesson={lessons[selectLesson]} 
                        lessonSelect={mockLesson[selectLesson]}
                    ></LayoutLeftCourseLearning>
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
                                lessons.map((lesson, index, key) => (
                                    <CardCourse handleClickLesson={handleClickLesson} key={index} index={index} lesson={lesson}></CardCourse>
                                ))
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CourseLearning