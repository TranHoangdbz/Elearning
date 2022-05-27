import React, { useRef, useState, useEffect } from 'react'

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import AjaxHelper from '../../services';
import URL_API from '../../services/API/config'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { formatVolume } from '../../utils/FormatVolumeUtil';

SwiperCore.use([Virtual, Navigation, Pagination]);


const HomeCourseList = () => {

    useEffect(() => {
        async function LoadData() {
            let temp = []
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
        }

        let isCancel = false;
        if (isCancel) return
        else LoadData()

        return () => {
            isCancel = true
            // setSlides([])
        }
    }, [])

    const [slides, setSlides] = useState([]);

    const [swiperRef, setSwiperRef] = useState(null);
    const appendNumber = useRef(slides.length);
    const prependNumber = useRef(1);

    const slideTo = (index) => {
        swiperRef.slideTo(index - 1, 0);
    };

    const CountCourseVolume = (course) => {
        let totalVolume = 0
        course.lessons.map(ite => totalVolume += ite.lessonVolume)
        return formatVolume(totalVolume)
    }



    return (

        <Stack direction="column" sx={{ backgroundColor: '#E5E5E5', top: 0, bottom: 0, padding: '60px' }} spacing={2}>
            {console.log(slides)}
            <Stack direction="row" justifyContent="space-between">
                <Typography
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '29px',
                        color: '#040E53',
                    }}
                >
                    Trending
                </Typography>
                <Button
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#040E53',
                    }}
                >
                   Learn more >>
                </Button>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <IconButton
                    sx={{
                        width: '31.45px',
                        height: '31.45px',
                        alignSelf: 'center',
                        boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <FaAngleLeft sx={{
                        width: '31.45px',
                        height: '31.45px',
                    }}
                        className="typeOfFilm__container__content__prev"
                    />
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
                            <Card sx={{ width: '250px', height: '250px', borderRadius: '20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.courseImage}
                                        alt=" "
                                    />
                                    <Stack direction="column" spacing={2} marginLeft="10%">
                                        <Stack direction="row">
                                            <Avatar src={course.teacher.profilePicture} sx={{
                                                height: '37.88px',
                                                width: "37.88px",
                                                left: '0%',
                                                right: '74.75%',
                                                marginTop: '3%',
                                                bottom: '22.22%'
                                            }} />
                                            <Stack direction="column" width="100%" marginLeft="4%">
                                                <Typography
                                                    sx={{
                                                        marginTop: '5%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 600,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' black'
                                                    }}
                                                >
                                                    {course.teacher.fullName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        // marginLeft: '15%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 300,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.title}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Montserrat',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                lineHeight: '15px',
                                                color: ' #000000',
                                            }}
                                        >
                                            {course.CourseName}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between" paddingRight="3%">
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {
                                                    CountCourseVolume(course)
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {course.lessons.length} lessons

                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton sx={{
                    width: '31.45px',
                    height: '31.45px',
                    alignSelf: 'center',
                    boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                }}
                >
                    <FaAngleRight sx={{
                        width: '31.45px',
                        height: '31.45px'
                    }}
                        className="typeOfFilm__container__content__next"
                    />
                </IconButton>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
                <Typography
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '29px',
                        color: '#040E53',
                    }}
                >
                    Your course
                </Typography>
                <Button
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#040E53',
                    }}
                >
                   Learn more >>
                </Button>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <IconButton
                    sx={{
                        width: '31.45px',
                        height: '31.45px',
                        alignSelf: 'center',
                        boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <FaAngleLeft sx={{
                        width: '31.45px',
                        height: '31.45px',
                    }}
                        className="typeOfFilm__container__content__prev1"
                    />
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
                            <Card sx={{ width: '250px', height: '250px', borderRadius: '20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.courseImage}
                                        alt=" "
                                    />
                                    <Stack direction="column" spacing={2} marginLeft="10%">
                                        <Stack direction="row">
                                            <Avatar src={course.teacher.profilePicture} sx={{
                                                height: '37.88px',
                                                width: "37.88px",
                                                left: '0%',
                                                right: '74.75%',
                                                marginTop: '3%',
                                                bottom: '22.22%'
                                            }} />
                                            <Stack direction="column" width="100%" marginLeft="4%">
                                                <Typography
                                                    sx={{
                                                        marginTop: '5%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 600,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.fullName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        // marginLeft: '15%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 300,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.title}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Montserrat',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                lineHeight: '15px',
                                                color: ' #000000',
                                            }}
                                        >
                                            {course.CourseName}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between" paddingRight="3%">
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {
                                                    CountCourseVolume(course)
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {course.lessons.length} lessons
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton sx={{
                    width: '31.45px',
                    height: '31.45px',
                    alignSelf: 'center',
                    boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                }}
                >
                    <FaAngleRight sx={{
                        width: '31.45px',
                        height: '31.45px'
                    }}
                        className="typeOfFilm__container__content__next1"
                    />
                </IconButton>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
                <Typography
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '29px',
                        color: '#040E53',
                    }}
                >
                    Design UI/UX
                </Typography>
                <Button
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#040E53',
                    }}
                >
                   Learn more >>
                </Button>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <IconButton
                    sx={{
                        width: '31.45px',
                        height: '31.45px',
                        alignSelf: 'center',
                        boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <FaAngleLeft sx={{
                        width: '31.45px',
                        height: '31.45px',
                    }}
                        className="typeOfFilm__container__content__prev2"
                    />
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
                    {slides.map((course) => (
                        <SwiperSlide key={course._id}>
                            <Card sx={{ width: '250px', height: '250px', borderRadius: '20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.courseImage}
                                        alt=" "
                                    />
                                    <Stack direction="column" spacing={2} marginLeft="10%">
                                        <Stack direction="row">
                                            <Avatar src={course.teacher.profilePicture} sx={{
                                                height: '37.88px',
                                                width: "37.88px",
                                                left: '0%',
                                                right: '74.75%',
                                                marginTop: '3%',
                                                bottom: '22.22%'
                                            }} />
                                            <Stack direction="column" width="100%" marginLeft="4%">
                                                <Typography
                                                    sx={{
                                                        marginTop: '5%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 600,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.fullName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        // marginLeft: '15%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 300,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.title}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Montserrat',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                lineHeight: '15px',
                                                color: ' #000000',
                                            }}
                                        >
                                            {course.CourseName}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between" paddingRight="3%">
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {
                                                    CountCourseVolume(course)
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {course.lessons.length} lessons
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton sx={{
                    width: '31.45px',
                    height: '31.45px',
                    alignSelf: 'center',
                    boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                }}
                >
                    <FaAngleRight sx={{
                        width: '31.45px',
                        height: '31.45px'
                    }}
                        className="typeOfFilm__container__content__next2"
                    />
                </IconButton>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
                <Typography
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '29px',
                        color: '#040E53',
                    }}
                >
                    Programming
                </Typography>
                <Button
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#040E53',
                    }}
                >
                   Learn more >>
                </Button>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <IconButton
                    sx={{
                        width: '31.45px',
                        height: '31.45px',
                        alignSelf: 'center',
                        boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <FaAngleLeft sx={{
                        width: '31.45px',
                        height: '31.45px',
                    }}
                        className="typeOfFilm__container__content__prev3"
                    />
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
                    {slides.map((course) => (
                        <SwiperSlide key={course._id}>
                            <Card sx={{ width: '250px', height: '250px', borderRadius: '20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.courseImage}
                                        alt=" "
                                    />
                                    <Stack direction="column" spacing={2} marginLeft="10%">
                                        <Stack direction="row">
                                            <Avatar src={course.teacher.profilePicture} sx={{
                                                height: '37.88px',
                                                width: "37.88px",
                                                left: '0%',
                                                right: '74.75%',
                                                marginTop: '3%',
                                                bottom: '22.22%'
                                            }} />
                                            <Stack direction="column" width="100%" marginLeft="4%">
                                                <Typography
                                                    sx={{
                                                        marginTop: '5%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 600,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.fullName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        // marginLeft: '15%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 300,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.title}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Montserrat',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                lineHeight: '15px',
                                                color: ' #000000',
                                            }}
                                        >
                                            {course.CourseName}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between" paddingRight="3%">
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {
                                                    CountCourseVolume(course)
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {course.lessons.length} lessons
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton sx={{
                    width: '31.45px',
                    height: '31.45px',
                    alignSelf: 'center',
                    boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                }}
                >
                    <FaAngleRight sx={{
                        width: '31.45px',
                        height: '31.45px'
                    }}
                        className="typeOfFilm__container__content__next3"
                    />
                </IconButton>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
                <Typography
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '29px',
                        color: '#040E53',
                    }}
                >
                    Others
                </Typography>
                <Button
                    sx={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#040E53',
                    }}
                >
                   Learn more >>
                </Button>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <IconButton
                    sx={{
                        width: '31.45px',
                        height: '31.45px',
                        alignSelf: 'center',
                        boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <FaAngleLeft sx={{
                        width: '31.45px',
                        height: '31.45px',
                    }}
                        className="typeOfFilm__container__content__prev4"
                    />
                </IconButton>
                <Swiper
                    navigation={{
                        nextEl: '.typeOfFilm__container__content__next4',
                        prevEl: '.typeOfFilm__container__content__prev4'
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
                            <Card sx={{ width: '250px', height: '250px', borderRadius: '20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.courseImage}
                                        alt=" "
                                    />
                                    <Stack direction="column" spacing={2} marginLeft="10%">
                                        <Stack direction="row">
                                            <Avatar src={course.teacher.profilePicture} sx={{
                                                height: '37.88px',
                                                width: "37.88px",
                                                left: '0%',
                                                right: '74.75%',
                                                marginTop: '3%',
                                                bottom: '22.22%'
                                            }} />
                                            <Stack direction="column" width="100%" marginLeft="4%">
                                                <Typography
                                                    sx={{
                                                        marginTop: '5%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 600,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.fullName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        // marginLeft: '15%',
                                                        fontFamily: 'Montserrat',
                                                        fontStyle: 'normal',
                                                        fontWeight: 300,
                                                        fontSize: '12px',
                                                        lineHeight: '15px',
                                                        color: ' #000000'
                                                    }}
                                                >
                                                    {course.teacher.title}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Montserrat',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                lineHeight: '15px',
                                                color: ' #000000',
                                            }}
                                        >
                                            {course.CourseName}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between" paddingRight="3%">
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {
                                                    CountCourseVolume(course)
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    bottom: '5.5%',
                                                    lineHeight: '15px',
                                                    color: ' #000000',
                                                    marginLeft: '-2%'
                                                }}
                                            >
                                                {course.lessons.length} lessons
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton sx={{
                    width: '31.45px',
                    height: '31.45px',
                    alignSelf: 'center',
                    boxShadow: '0px 0px 3.93162px 0.982906px rgba(0, 0, 0, 0.25)',
                }}
                >
                    <FaAngleRight sx={{
                        width: '31.45px',
                        height: '31.45px'
                    }}
                        className="typeOfFilm__container__content__next4"
                    />
                </IconButton>
            </Stack>


        </Stack >
    )
}



export default HomeCourseList