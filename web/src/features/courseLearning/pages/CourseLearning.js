import React, { useEffect, useState } from 'react';
import '../components/CourseLearning.scss';
import { Container, Grid, Avatar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import CardCourse from '../components/CardCourse';
import axios from 'axios'
import LayoutLeftCourseLearning from '../components/LayoutLeftCourseLearning';

const mockCourses = [
    {
        stt: 1,
        unClock: true,
        name: 'A summary about .NET',
        time: '5min'
    },
]

function CourseLearning() {
    const url = window.location.pathname;
    const path = url.split("/").filter((x) => x);

    console.log("path", path);
    
    const [selectLesson, setSelectLesson] = useState(0)
    const [lessons, setLessons] = useState([])
    const [course, setCourse] = useState({})
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
        setSelectLesson(index)
    }

    useEffect(() => {
        let id = '628e51cbb64e260717ce07b2'
        const fetchCourse = async () => {
            await axios.get(`http://localhost:32/api/courses/${id}`)
                .then(res => {
                    console.log(res.data.data)
                    console.log(res.data.data.lessons)
                    setCourse(res.data.data)
                    setLessons(res.data.data.lessons)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchCourse()
    }, [])

    const calculateStar = (ratingArray) => {
        var sum = 0;
        if(typeof ratingArray == 'undefined') return 0;
        ratingArray.forEach(element => {
            sum+=element.rate;
        });
        return Math.round(sum*10 / ratingArray.length) / 10
    }

    return (
        <Container spacing={2} style={{ marginTop: '40px' }} maxWidth='xl'>
            <Grid spacing={1} container>
                <Grid lg={8} md={12}>
                    {/* Layout left */}
                    <LayoutLeftCourseLearning 
                        lesson={lessons[selectLesson]} 
                        lessonSelect={mockLesson[selectLesson]}
                        course={course}
                    ></LayoutLeftCourseLearning>
                    {/* <button 
                        onClick={() => {
                            console.log("course", course);
                        }}
                    >
                        Nguyễn Công Phi
                    </button> */}
                </Grid>
                <Grid lg={4} md={12}>
                    
                    {/* Layout right */}
                    <div className='layout-right'>
                        <div className='name-course' style={{ fontFamily: "'Montserrat', san-serif" }}>
                            {course && typeof course.courseName!='undefined' && course.courseName  ? course.courseName : ""}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px', paddingRight: '25px' }}>
                            <div className='students' style={{ fontFamily: "'Montserrat', san-serif" }}>0 students</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className='rating' style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p style={{ marginRight: '10px', marginTop: '0', marginBottom: '0', fontFamily: "'Montserrat', san-serif" }}>
                                        {course ? calculateStar(course.rating): ""}
                                    </p>
                                    <StarIcon style={{ color: '#FFD601' }}></StarIcon>
                                </div>
                                <div className='view' style={{ display: 'flex', justifyContent: 'center', fontFamily: "'Montserrat', san-serif" }}>
                                    {course && course.rating && course.rating.length ?course.rating.length:"4.8"} reviews
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px', paddingRight: '25px' }}>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <Avatar height={50} width={50} alt="Remy Sharp" src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/7/9/photo-1-16257989599561090737937.jpeg" />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center' }}>
                                    <div className='name' style={{ fontFamily: "'Montserrat', san-serif" }}>Json Wong</div>
                                    <div className='major' style={{ fontFamily: "'Montserrat', san-serif" }}>Sr Software Engineer</div>
                                </div>
                            </div>
                            <div className='enroll' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', fontFamily: "'Montserrat', san-serif" }}>
                                Enroll
                            </div>

                        </div>
                        <div style={{ display: 'flex', paddingLeft: '25px', marginTop: '12px', paddingRight: '25px' }}>
                            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description'>
                                {course ? course.description : ""}
                            </div>
                        </div>
                        <div className='list-course'>
                            {
                                lessons.map((lesson, index) => (
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