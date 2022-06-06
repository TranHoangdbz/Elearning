import React, { useState, useEffect } from 'react'

import style from './style'

import { Avatar, Button, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import AjaxHelper from '../../../services';
import URL_API from '../../../services/API/config'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { formatVolume } from '../../../utils/FormatVolumeUtil'

SwiperCore.use([Virtual, Navigation, Pagination]);


const HomeCourseList = () => {

    const getCourseName = (name) => {
        if (name.length > 65) {
            return name.slice(0, 64) + "..."
        } else {
            return name
        }
    }

    useEffect(() => {
        async function LoadData() {
            let temp = []
            let temp1 = []
            let temp2 = []
            try {
                const result = await AjaxHelper.get(URL_API.URL_GET_ALL_COURSE + '/')
                if (result.status == 200) {
                    for (let i = 0; i < result.data.data.length; i++) {
                        temp.push(result.data.data[i])
                    }
                }
                else {
                    console.log(result.status)
                    console.log(result.message)
                }
            }
            catch (err) {
                console.log(err)
            }
            setSlides(temp)
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].category === temp[0].category) {
                    temp1.push(temp[i])
                }
            }
            setSlides1(temp1)
            let index = 0;
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].category != temp[index].category) {
                    index = i;
                }
            }
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].category === temp[index].category) {
                    temp2.push(temp[i])
                }
            }
            setIndex(index)
            setSlides2(temp2)
        }

        let isCancel = false;
        if (isCancel) return
        else LoadData()

        return () => {
            isCancel = true
            setSlides([])
            setSlides1([])
            setSlides2([])
        }
    }, [])

    const [slides, setSlides] = useState([]);
    const [slides1, setSlides1] = useState([]);
    const [slides2, setSlides2] = useState([]);
    const [index, setIndex] = useState(0);

    const CountCourseVolume = (course) => {
        let totalVolume = 0
        course.lessons.map(ite => totalVolume += ite.lessonVolume)
        return formatVolume(totalVolume)
    }

    function handleLearnMore(param) {
        alert("Learn more of: " + param)
    }



    return (

        <Stack direction="column" sx={style.bigContainer} spacing={2}>
            {console.log(slides)}
            <Stack direction="row" justifyContent="space-between">
                <Typography sx={style.categoryTitle}>Trending</Typography>
                <Button onClick={() => handleLearnMore("Trending")} sx={style.learnMoreButton}>Learn more</Button>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <IconButton sx={style.iconLeftButton}>
                    <FaAngleLeft sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__prev" />
                </IconButton>
                <Swiper
                    navigation={{
                        nextEl: '.typeOfFilm__container__content__next',
                        prevEl: '.typeOfFilm__container__content__prev'
                    }}
                    className="typeOfFilm__container__content__swiper"
                    slidesPerView={4}
                    spaceBetween={20}
                    slidesPerGroup={4}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    style={{ height: '300px' }}
                    modules={[Navigation]}
                >
                    {slides.map(course => (
                        <SwiperSlide key={course._id}>
                            <Card sx={style.card}>
                                <CardActionArea onClick={() => console.log("click")} sx={{ height: "100px" }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.courseImage}
                                        alt=" "
                                    />
                                    <CardContent sx={{ height: '30px' }}>
                                        <Stack paddingRight="10%" paddingLeft="10%" direction="row">
                                            <Avatar src={course.teacher.profilePicture} sx={style.avatar} />
                                            <Stack direction="column" width="100%" marginLeft="4%">
                                                <Typography sx={style.teacherFullName}>{course.teacher.fullName}</Typography>
                                                <Typography sx={style.teacherTitle}>{course.teacher.title}</Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                    <CardContent sx={{ height: "50px", mt: 2 }}>
                                        <Typography sx={style.courseName}>{getCourseName(course.courseName)}</Typography>
                                    </CardContent>
                                    <CardContent >
                                        <Stack direction="row" justifyContent="space-between" paddingRight="10%" paddingLeft="10%">
                                            <Typography sx={style.countCourseVolume}>{CountCourseVolume(course)}</Typography>
                                            <ul>
                                                <li style={style.countLessons}>{course.lessons.length} lessons</li>
                                            </ul>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton sx={style.iconLeftButton}>
                    <FaAngleRight sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__next" />
                </IconButton>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
                <Typography sx={style.categoryTitle}>Your course</Typography>
                <Button onClick={() => handleLearnMore("Your course")} sx={style.learnMoreButton}>Learn more</Button>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <IconButton sx={style.iconLeftButton}>
                    <FaAngleLeft sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__prev1" />
                </IconButton>
                <Swiper
                    navigation={{
                        nextEl: '.typeOfFilm__container__content__next1',
                        prevEl: '.typeOfFilm__container__content__prev1'
                    }}
                    className="typeOfFilm__container__content__swiper"
                    slidesPerView={4}
                    spaceBetween={20}
                    slidesPerGroup={4}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    style={{ height: '300px' }}
                    modules={[Navigation]}
                >
                    {slides.map((course) => (
                        <SwiperSlide key={course._id}>
                            <Card sx={style.card}>

                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={course.courseImage}
                                    alt=" "
                                />
                                <CardActionArea sx={{ height: "100px" }}>
                                    <Stack direction="column" spacing={2} marginLeft="10%">
                                        <Stack direction="row">
                                            <Avatar src={course.teacher.profilePicture} sx={style.avatar} />
                                            <Stack direction="column" width="100%" marginLeft="4%">
                                                <Typography sx={style.teacherFullName}>{course.teacher.fullName}</Typography>
                                                <Typography sx={style.teacherTitle}>{course.teacher.title}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography sx={style.courseName}>{getCourseName(course.courseName)}</Typography>
                                    </Stack>

                                </CardActionArea>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" paddingRight="4%">
                                        <Typography sx={style.countCourseVolume}>{CountCourseVolume(course)}</Typography>
                                        <ul>
                                            <li style={style.countLessons}>{course.lessons.length} lessons</li>
                                        </ul>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton sx={style.iconLeftButton}>
                    <FaAngleRight sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__next1" />
                </IconButton>
            </Stack>
            {
                slides1.length != 0 ?
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={style.categoryTitle}>{slides1[0].category}</Typography>
                            <Button onClick={() => handleLearnMore(slides1[0].category)} sx={style.learnMoreButton}>Learn more</Button>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                            <IconButton sx={style.iconLeftButton}>
                                <FaAngleLeft sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__prev2" />
                            </IconButton>
                            <Swiper
                                navigation={{
                                    nextEl: '.typeOfFilm__container__content__next2',
                                    prevEl: '.typeOfFilm__container__content__prev2'
                                }}
                                className="typeOfFilm__container__content__swiper"
                                slidesPerView={4}
                                spaceBetween={20}
                                slidesPerGroup={4}
                                loop={true}
                                loopFillGroupWithBlank={true}
                                style={{ height: '300px' }}
                                modules={[Navigation]}
                            >
                                {slides1.map(course => (
                                    <SwiperSlide key={course._id}>
                                        <Card sx={style.card}>

                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={course.courseImage}
                                                alt=" "
                                            />
                                            <CardActionArea sx={{ height: "100px" }}>
                                                <Stack direction="column" spacing={2} marginLeft="10%">
                                                    <Stack direction="row">
                                                        <Avatar src={course.teacher.profilePicture} sx={style.avatar} />
                                                        <Stack direction="column" width="100%" marginLeft="4%">
                                                            <Typography sx={style.teacherFullName}>{course.teacher.fullName}</Typography>
                                                            <Typography sx={style.teacherTitle}>{course.teacher.title}</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Typography sx={style.courseName}>{getCourseName(course.courseName)}</Typography>
                                                </Stack>

                                            </CardActionArea>
                                            <CardContent>
                                                <Stack direction="row" justifyContent="space-between" paddingRight="4%">
                                                    <Typography sx={style.countCourseVolume}>{CountCourseVolume(course)}</Typography>
                                                    <ul>
                                                        <li style={style.countLessons}>{course.lessons.length} lessons</li>
                                                    </ul>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <IconButton sx={style.iconLeftButton}>
                                <FaAngleRight sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__next2" />
                            </IconButton>
                        </Stack>
                    </>
                    :
                    null
            }
            {
                slides2.length != 0 ?
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={style.categoryTitle}>{slides2[0].category}</Typography>
                            <Button onClick={() => handleLearnMore(slides2[0].category)} sx={style.learnMoreButton}>Learn more</Button>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                            <IconButton sx={style.iconLeftButton}>
                                <FaAngleLeft sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__prev3" />
                            </IconButton>
                            <Swiper
                                navigation={{
                                    nextEl: '.typeOfFilm__container__content__next3',
                                    prevEl: '.typeOfFilm__container__content__prev3'
                                }}
                                className="typeOfFilm__container__content__swiper"
                                slidesPerView={4}
                                spaceBetween={20}
                                slidesPerGroup={4}
                                loop={true}
                                loopFillGroupWithBlank={true}
                                style={{ height: '300px' }}
                                modules={[Navigation]}
                            >
                                {slides2.map(course => (
                                    <SwiperSlide key={course._id}>
                                        <Card sx={style.card}>

                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={course.courseImage}
                                                alt=" "
                                            />
                                            <CardActionArea sx={{ height: "100px" }}>
                                                <Stack direction="column" spacing={2} marginLeft="10%">
                                                    <Stack direction="row">
                                                        <Avatar src={course.teacher.profilePicture} sx={style.avatar} />
                                                        <Stack direction="column" width="100%" marginLeft="4%">
                                                            <Typography sx={style.teacherFullName}>{course.teacher.fullName}</Typography>
                                                            <Typography sx={style.teacherTitle}>{course.teacher.title}</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Typography sx={style.courseName}>{getCourseName(course.courseName)}</Typography>
                                                </Stack>

                                            </CardActionArea>
                                            <CardContent>
                                                <Stack direction="row" justifyContent="space-between" paddingRight="4%">
                                                    <Typography sx={style.countCourseVolume}>{CountCourseVolume(course)}</Typography>
                                                    <ul>
                                                        <li style={style.countLessons}>{course.lessons.length} lessons</li>
                                                    </ul>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <IconButton sx={style.iconLeftButton}>
                                <FaAngleRight sx={{ width: '31.45px', height: '31.45px' }} className="typeOfFilm__container__content__next3" />
                            </IconButton>
                        </Stack>
                    </>
                    :
                    null
            }
        </Stack >
    )
}



export default HomeCourseList