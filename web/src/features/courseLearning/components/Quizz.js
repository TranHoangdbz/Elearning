import React, {useState } from 'react';
import './CourseLearning.scss'
import { Checkbox, FormControlLabel} from '@mui/material'
import { useDispatch, useSelector} from 'react-redux';
import URL_API from '../../../services/API/config';
import AjaxHelper from '../../../services/index';
import {
    setCurrentCourse, 
    changeCurrentLessonIndex,
    setCurrentUserInfo,
    setUserLessonIndex,
} from '../courseLearningSlice.js';
import RetroQuizz from './RetroQuizz';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const initValueQuizz = () => {
    var res = [];
    for(var i = 0; i < 100; i++){
        res.push([false, false, false, false]);
    }
    return res;
}

function Quizz() {
    const dispatch = useDispatch();
    const currentUserID = useSelector((state) => {return state.courseLearning.currentUserID});
    const url = window.location.pathname;
    const path = url.split("/").filter((x) => x);
    const currentCourseID = path.length > 1 ?  path[path.length-1] : "628e51cbb64e260717ce07b2";
    const [activeStep, setActiveStep] = React.useState(0);
    const currentLesson = useSelector(state => {
        return state.courseLearning.currentCourse.lessons[state.courseLearning.currentLessonIndex]}
    );
    const currentCourse = useSelector((state) => {return state.courseLearning.currentCourse});

    const [yourChoice, setYourChoice] = useState(initValueQuizz())
    
    const handleClickAnswer = (e) => {
        var newChoice = JSON.parse(JSON.stringify(yourChoice));
        if (e.target.checked) {
            newChoice[activeStep][e.target.value] = true;
            setYourChoice(newChoice);
        } else {
            newChoice[activeStep][e.target.value] = false;
            setYourChoice(newChoice);
        }
    }

    const currentUserInfo = useSelector((state) => {return state.courseLearning.currentUserInfo});

    const handleClickSubmit = async() => {
        for(var i = 0; i < currentLesson.quizz.length; i++){
            var isCheck = false;
            for(var j = 0; j < 4; j++){
                if(yourChoice[i][j] === true){
                    isCheck = true;
                    break;
                }
            }
            if(isCheck === false){
                setFullAnswerCheck(false);
                return;
            }
        }
        let totalPoint = 0;
        for(let i = 0; i < currentLesson.quizz.length; i++){
            let point  = 1;
            for(let j = 0; j < 4; j++){
                if(yourChoice[i][j] == true){
                    // console.log(currentLesson.quizz);
                    if(!currentLesson.quizz[i].answer.includes(j.toString())) point = 0;
                }
                else if(yourChoice[i][j] == false)
                {
                    if(currentLesson.quizz[i].answer.includes(j.toString())) point = 0;
                }
            }
            totalPoint += point;
        }
        setScoreToDisplay(totalPoint*100 / currentLesson.quizz.length);
        // console.log(/ quizz.answer.length);
        // return;
        setIsFinish(true);
        setIsRedo(false);
        setActiveStep(0);
        let isSuccess = true
        currentLesson.quizz.forEach((quizz, index) => {
            let soDapAnDung = 0;
            yourChoice[index].forEach((value) => {
                if (value === true) {
                    soDapAnDung += 1;
                }
            })
            // setScoreToDisplay(soDapAnDung*100 / quizz.answer.length);
            if (quizz.answer.length === soDapAnDung) {
                quizz.answer.forEach((right) => {
                    if (yourChoice[index][right] === false) {
                        isSuccess = false;
                    }
                })
            } else {
                isSuccess = false
            }
        })

        if (isSuccess) {
            // console.log("Thành công");
            // alert("Congratulation! You have passed the test!");
            // window.location.reload();
            // APi check hoàn thành bài học ở đây
            setResultToShow(true);
            const dataToSend = {
                lessonID: currentLesson._id,
                userID: currentUserInfo._id,
            }
            // console.log("data to add", dataToSend)
            if(!isPass)
                await AjaxHelper.post(URL_API.URL_SYSTEM_V1 + '/discussions/quizz-passed/', dataToSend)
            
        } else {
            console.log("Thất bại")
            setResultToShow(false);
            // console.log("Thất bại");
            // alert("Sorry. You have to score 100% in order to pass the test. Try again");
            // window.location.reload();
        }
    }

    const handleClickBack = () => {
        if (activeStep > 0) {
            setActiveStep(oldState => oldState - 1)
        }
    }

    const handleClickNext = () => {
        if (activeStep < currentLesson.quizz.length - 1) {
            setActiveStep(oldState => oldState + 1)
        }
    }

    const getCurrentIndex = () => {
        if(currentCourse !== {}){
            var currentLesson = currentCourse.lessons;
            // console.log("currentLesson", currentLesson);
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
                else index = i + 1;
            }
            return index;
        }
        else return 0;
    }
    const isPass = useSelector((state) => {
        return getCurrentIndex() > state.courseLearning.currentLessonIndex;
    }) || false;

    const [isRedo, setIsRedo] = useState(false);

    
    // Hiện kết quả bài test
    const [isFinish, setIsFinish] = useState(false);
    const [resultToShow, setResultToShow] = useState(false);
    const [scoreToDisplay, setScoreToDisplay] = useState(0);
    const moveToNextLesson = async() => {
        var currentCourseTempt ;
        setIsFinish(false);
        setResultToShow(false);
        setScoreToDisplay(0);
        setIsRedo(false);
        setYourChoice(initValueQuizz());
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
                // console.log("acc");
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
    }



    // Xác nhận khi người dùng chưa click chọn đáp án ở câu đó
    const [fullAnswerCheck, setFullAnswerCheck] = useState(true);

    //Xem lại đáp án của bài quizz
    const [isRetroQuizz, setIsRetroQuizz]  = useState(false);
    if(isRetroQuizz) 
        return <RetroQuizz yourChoice = {yourChoice} 
        quit={() => {
            setIsRetroQuizz(false)
            setFullAnswerCheck(true);
            setIsFinish(false);
            setResultToShow(false);
            setScoreToDisplay(0);
            setIsRedo(false);
            setYourChoice(initValueQuizz());
        }}
    />
    else
    return (
        <div className='quizz'>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='title'>Attention</div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description1'>Score a lession’s quizz with an accuracy of 100% to unlock the next lesson.
            </div>
            <div style={{ marginTop: '15px' }}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'space-between', height: '50px', alignItems: 'center', backgroundColor: '#040E53', color: 'white' }}>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>
                        {currentLesson ? currentLesson.name : ""}
                    </div>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>
                        {currentLesson ? currentLesson.quizz.length : ""} question
                    </div>
                </div>
                <div>
                    {
                        <div style={{ paddingLeft: '60px', backgroundColor: 'rgba(4, 14, 83, 0.04)' }}>
                            <div> 
                                { 
                                    !fullAnswerCheck ? 
                                        <div className="modal-warning">
                                            <div className='heading'>
                                                You have to at least check an answer in each question
                                            </div>
                                            <div className='btn-back bt-refine'
                                                onClick={(e) => {
                                                    setFullAnswerCheck(true);
                                                }} 
                                            >
                                                Back
                                            </div>
                                        </div>

                                    :

                                    isFinish && !isRedo? 
                                        <div className="show-result">
                                            {
                                                resultToShow ?
                                                <div className="title">
                                                    
                                                    Congratulation! You have passed the test!<br></br>
                                                    Score: {100}/100
                                                </div>
                                                :
                                                <div className='title'>
                                                    Sorry. You have failed the test!<br></br>
                                                    Score: {scoreToDisplay}/100
                                                </div>
                                            }
                                            <div className="btn-container">
                                                <div className='btn-back btn-redo'
                                                    onClick={(e) => {
                                                        setIsRedo(true);
                                                        setYourChoice(initValueQuizz());
                                                        setIsFinish(false);
                                                    }} 
                                                >
                                                    Redo
                                                </div>
                                                <div className='btn-back btn-redo btn-next'
                                                    style={{width: '94px'}}
                                                    onClick={(e) => {
                                                        setIsRetroQuizz(true);
                                                    }} 
                                                >
                                                    Preview
                                                </div>
                                              
                                                {
                                                    !resultToShow ? null :
                                                    <div className='btn-back btn-redo btn-next'
                                                        onClick={(e) => {
                                                            moveToNextLesson();
                                                        }} 
                                                    >
                                                        Next lesson
                                                    </div>
                                                }
                                                
                                            </div>
                                            
                                        </div>
                                    :
                                    !isPass || isRedo ?  
                                    [
                                        <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name-question'>
                                            {currentLesson.quizz[activeStep] ? currentLesson.quizz[activeStep].question : ""}
                                        </div>,
                                        currentLesson.quizz.map((value, index) => {
                                            return (
                                                <div style={{
                                                        display: index===activeStep ? 'block' : 'none'
                                                    }}
                                                >
                                                    <div>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox {...label} name="answer"
                                                                    onClick={(e) => handleClickAnswer(e)}  
                                                                    value={0}
                                                                    color="secondary"
                                                                    checked={yourChoice[index][0]}
                                                                />
                                                            }
                                                            label={currentLesson.quizz[activeStep].choice[0]}
                                                            sx={{ marginBottom: '30px' , fontSize: '14px'}}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox {...label} name="answer"
                                                                    onClick={(e) => handleClickAnswer(e)}
                                                                    value={1}
                                                                    color="secondary"
                                                                    checked={yourChoice[index][1]} />
                                                            }
                                                            label={currentLesson.quizz[activeStep].choice[1]}
                                                            sx={{ marginBottom: '30px' , fontSize: '14px'}}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox {...label} name="answer"
                                                                    onClick={(e) => handleClickAnswer(e)}
                                                                    value={2}
                                                                    color="secondary" 
                                                                    checked={yourChoice[index][2]}/>
                                                            }
                                                            label={currentLesson.quizz[activeStep].choice[2]}
                                                            sx={{ marginBottom: '30px' , fontSize: '14px'}}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox {...label} name="answer"
                                                                    onClick={(e) => handleClickAnswer(e)}s
                                                                    value={3}
                                                                    color="secondary"
                                                                    checked={yourChoice[index][3]} />
                                                            }
                                                            label={currentLesson.quizz[activeStep].choice[3]}
                                                            sx={{ marginBottom: '30px', fontSize: '14px' }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }),
                                    ]
                                    : 
                                        <div className="result-container">
                                            <div className="title">
                                                You have finished the test!
                                            </div>
                                            <div className='btn-back btn-redo'
                                                onClick={(e) => {
                                                    setIsRedo(true);
                                                    setYourChoice(initValueQuizz());
                                                    setIsFinish(false);
                                                }} 
                                            >
                                                Redo
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    }
                </div>
                {
                    !fullAnswerCheck ? null :
                    (!isPass || isRedo) && !isFinish ?  
                    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(4, 14, 83, 0.04)', paddingTop: '20px' }}>
                        {
                            currentLesson.quizz.map((value, index, key) => {
                                if (index === activeStep) {
                                    return (
                                        <div className='dot active'></div>
                                    )
                                } else {
                                    return (
                                        <div className='dot'></div>
                                    )
                                }
                            })
                        }
                    </div>
                    : null
                }
                {
                    !fullAnswerCheck ? null :
                    (!isPass || isRedo) && !isFinish? 
                    <div style={{ padding: '30px', paddingTop: '0', display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(4, 14, 83, 0.04)' }}>
                        {
                            activeStep === 0 ? (<div></div>) : (
                                <div onClick={handleClickBack} className='btn-back'>
                                    Back
                                </div>
                            )
                        }
                        <div style={{ display: 'flex' }}>
                            {
                                activeStep === (currentLesson.quizz.length - 1) ? (
                                    <div onClick={(e) => handleClickSubmit(e)} className='btn-back'>
                                        Submit
                                    </div>
                                ) : (
                                    currentLesson.quizz.length > 0 ?
                                    <div onClick={handleClickNext} className='btn-back'>
                                        Next
                                    </div> : null
                                )
                            }
                        </div>
                    </div>
                    : null
                }
                
                {/* <div className='course unlock' style={{ position: 'relative', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'space-between', height: '50px', alignItems: 'center', backgroundColor: 'rgb(186, 187, 196)', color: 'black' }}>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>2. Exception filters</div>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>10 question</div>
                    <div className='lock'>
                        <LockIcon />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Quizz;