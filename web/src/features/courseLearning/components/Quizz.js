import React, {useState } from 'react';
import './CourseLearning.scss'
import { Checkbox, FormControlLabel} from '@mui/material'
import { useSelector} from 'react-redux';
import URL_API from '../../../services/API/config';
import AjaxHelper from '../../../services/index';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const initValueQuizz = () => {
    var res = [];
    for(var i = 0; i < 100; i++){
        res.push([false, false, false, false]);
    }
    return res;
}

function Quizz() {
    const [activeStep, setActiveStep] = React.useState(0);
    const currentLesson = useSelector(state => {
        return state.courseLearning.currentCourse.lessons[state.courseLearning.currentLessonIndex]}
    );
    const [yourChoice, setYourChoice] = useState(initValueQuizz())
    
    const handleClickAnswer = (e) => {
        var newChoice = yourChoice;
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
        let isSuccess = true
        currentLesson.quizz.forEach((quizz, index) => {
            let soDapAnDung = 0;
            yourChoice[index].forEach((value, key) => {
                if (value === true) {
                    soDapAnDung += 1;
                }
            })
            if (quizz.answer.length === soDapAnDung) {
                quizz.answer.forEach((right, key) => {
                    if (yourChoice[index][right] === false) {
                        isSuccess = false;
                    }
                })
            } else {
                isSuccess = false
                return
            }
        })
        if (isSuccess) {
            console.log("Thành công");
            alert("Congratulation! You have passed the test!");
            window.location.reload();
            // APi check hoàn thành bài học ở đây
            const dataToSend = {
                lessonID: currentLesson._id,
                userID: currentUserInfo._id,
            }
            console.log("data to add", dataToSend)
            await AjaxHelper.post(URL_API.URL_SYSTEM_V1 + '/discussions/quizz-passed/', dataToSend)
            
        } else {
            console.log("Thất bại");
            alert("Sorry. You have to score 100% in order to pass the test. Try again");
            window.location.reload();
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
                <div style={{ paddingLeft: '60px', backgroundColor: 'rgba(4, 14, 83, 0.04)' }}>
                    {/* <SliderQuestion></SliderQuestion> */}
                    <div>
                        <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name-question'>
                            {currentLesson.quizz[activeStep] ? currentLesson.quizz[activeStep].question : ""}
                        </div>
                        {
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
                                                            color="secondary" />
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
                                                            color="secondary" />
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
                                                            color="secondary" />
                                                    }
                                                    label={currentLesson.quizz[activeStep].choice[3]}
                                                    sx={{ marginBottom: '30px', fontSize: '14px' }}
                                                />
                                            </div>
                                        </div>
                                    )
                            })
                        }
                    </div>
                </div>
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