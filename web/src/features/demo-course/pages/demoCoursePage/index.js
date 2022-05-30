import { Avatar, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import style from './style';
import AjaxHelper from '../../../../services/index'
import URL_API from '../../../../services/API/config'
import { useParams } from 'react-router-dom'
import { formatVolume } from '../../../../utils/FormatVolumeUtil';

const DemoCourse = () => {
    const { id } = useParams()
    const [course, setCourse] = useState(null)

    useEffect(() => {
        async function LoadData() {
            try {
                const result = await AjaxHelper.get(URL_API.URL_GET_COURSE_BY_ID + '/' + id)
                if (result.status == 200) {
                    setCourse(result.data.data)
                    console.log(result.data.data)
                }
                else {
                    console.log(result.status)
                    console.log(result.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        let isCancel = false;
        if (isCancel) return
        else LoadData()

        return () => {
            isCancel = true
            setCourse({})
        }
    }, [])

    const CountCourseVolume = () => {
        let totalVolume = 0
        course.lessons.map(ite => totalVolume += ite.lessonVolume)
        return formatVolume(totalVolume)
    }

    return (
        <Stack>
            {
                course ?
                    <>
                        <Stack>
                            <Stack sx={{
                                height: 50,
                                backgroundColor: 'red',
                                width: '100%'
                            }}>Header Here</Stack>
                            <Grid container sx={style.container}>
                                <Grid container item xs={8} sx={style.panel_1}>
                                    <Stack sx={style.leftStack}>
                                        <Typography variant='h4' sx={style.leftStack_courseName}>{course.courseName}</Typography>
                                        <Typography variant='h6' sx={style.leftStack_courseDescription}>
                                            {course.description}
                                        </Typography>
                                        <Typography variant='h4' sx={style.leftStack_introduceTitle}>Introduce to Course</Typography>
                                        <Stack direction='row' sx={style.leftStack_infoCoursePanel}>
                                            <Typography variant='subtitle2' sx={style.leftStack_volumeCourse}>{CountCourseVolume()} • </Typography>
                                            <Typography variant='subtitle2' sx={style.leftStack_totalLessons}>{course.lessons.length} lessons</Typography>
                                        </Stack>
                                        <Stack sx={style.leftStack_videoDemoPanel}>
                                            <iframe className="frame"
                                                src={course.demoVideo}
                                                height='400'
                                                title="video"
                                                style={{ borderRadius: 20 }}
                                                allow='autoplay'
                                            ></iframe>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid container item xs={4} sx={style.panel_2}>
                                    <Stack sx={style.rightStack}>
                                        <img style={style.rightStack_imgCourse} src={course.courseImage}></img>
                                        <Button variant="contained" style={style.rightStack_registerButton} >REGISTER</Button>
                                        <Stack direction={'column'} sx={style.rightStack_authorInfo}>
                                            <Avatar sx={style.rightStack_avatarLecturer} src={course.teacher.profilePicture} />
                                            <Typography sx={style.rightStack_nameLecturer} variant='h5' fontWeight={'bold'}>{course.teacher.fullName}</Typography>
                                            <Typography variant='h5'>{course.teacher.title}</Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </>
                    :
                    <Stack>
                        <CircularProgress></CircularProgress>
                    </Stack>
            }
        </Stack>
    )
}
export default DemoCourse;