import React, { useEffect} from 'react';
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
    setCurrentUserInfo,
    setUserLessonIndex,
    setCurrentUser
} from '../courseLearningSlice.js';

function CourseLearning() {


    const dispatch = useDispatch();
    dispatch(setCurrentUser(localStorage.getItem('userID')))
    const url = window.location.pathname;
    const path = url.split("/").filter((x) => x);
    // console.log("path", path);
    const currentUserID = useSelector((state) => {return state.courseLearning.currentUserID});
    const currentCourseID = path.length > 1 ?  path[path.length-1] : "628e51cbb64e260717ce07b2";
    // const [selectLesson, setSelectLesson] = useState(0) 
    // const [lessons, setLessons] = useState([])
    // Lấy thử current course
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});
    console.log("currentCourse", currentCourse);
    
    const currentUserInfo = useSelector((state) => {
        // console.log("state", state);
        return state.courseLearning.currentUserInfo
    });
    console.log("currentUserInfo", currentUserInfo);
    // Get all content of the current course
    useEffect(() => {
        var currentCourseTempt ;
        const getCurrentIndexInit = (userID) => {
            if(currentCourse !== {}){
                var currentLesson = currentCourseTempt.lessons;
                var index = 0;
                if(!currentLesson) return 0;

                for(var  i = 0; i < currentLesson.length; i++){
                    var j = 0;
                    for(; j < currentLesson[i].passed.length; j++){
                        if(currentLesson[i].passed[j].user === userID){
                            break;
                        }
                    }
                    if(j >= currentLesson[i].passed.length){
                        return i;
                    }
                    else index = i;
                }
                return index;
            }
            else {
                console.log("acc");
                return 0;
            }
        }
        const fetchCourseAndUser = async() => {
            await AjaxHelper.get(URL_API.URL_SYSTEM_V1 + '/discussions/lesson-quizz/' + currentCourseID)
                .then(res => {
                    currentCourseTempt = res.data.currentCourse;
                    dispatch(setCurrentCourse(res.data.currentCourse));
                })
                .catch(err => {
                    console.log(err)
                })
            await AjaxHelper.get(URL_API.URL_SYSTEM_V1 + '/discussions/user/' + currentUserID)
                .then(res => {
                    dispatch(setCurrentUserInfo(res.data.data));
                    console.log("Hàm lấy user");
                    dispatch(changeCurrentLessonIndex(getCurrentIndexInit(res.data.data._id)));
                    dispatch(setUserLessonIndex(getCurrentIndexInit(res.data.data._id)));
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchCourseAndUser();
    }, [])


    
    const handleClickLesson = (index) => {
        // Get lesson hiện tại ở đây
        if(getCurrentIndex() >= index)
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

    const getCurrentIndex = () => {
        if(currentCourse !== {}){
            var currentLesson = currentCourse.lessons;
            console.log("currentLesson", currentLesson);
            var index = 0;
            if(!currentLesson) return 0;
            for(var  i = 0; i < currentLesson.length; i++){
                var j = 0;
                for(; j < currentLesson[i].passed.length; j++){
                    if(currentLesson[i].passed[j].user === currentUserInfo._id){
                        break;
                    }
                }
                if(j >= currentLesson[i].passed.length){
                    return i;
                }
                else index = i;
            }
            return index;
        }
        else return 0;
    }

    // const currentLearnIndex = 0;
    

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
                            {/* <div className='enroll' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', fontFamily: "'Montserrat', san-serif" }}>
                                Enroll
                            </div> */}
                        </div>
                        <div style={{ display: 'flex', paddingLeft: '25px', marginTop: '12px', paddingRight: '25px' }}>
                            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description'>
                                {currentCourse ? currentCourse.description : ""}
                            </div>
                        </div>
                        <div className='list-course'>
                            {
                                currentCourse.lessons ? currentCourse.lessons.map((lesson, index, key) => (
                                    <CardCourse 
                                        handleClickLesson={handleClickLesson} 
                                        key={index} index={index} 
                                        lesson={lesson}
                                        type={getCurrentIndex() >= index ? "open" : "lock"}
                                    >
                                    
                                    </CardCourse>
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