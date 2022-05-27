import React, { useEffect, useState } from 'react';
import './CourseLearning.scss'
import LockIcon from '@mui/icons-material/Lock';
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Quizz(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    useEffect(() => {
        const fetApi = async () => {
            await axios.get(`http://localhost:32/api/lessons/${props.lesson._id}`)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetApi()
    }, [props.lesson])
    const [yourChoice, setYourChoice] = useState(props.lessonSelect.quizz.map(value => [false, false, false, false]))


    const handleClickAnswer = (e) => {
        if (e.target.checked) {
            setYourChoice(state => {
                state[activeStep][e.target.value] = true
                return state
            })
        } else {
            setYourChoice(state => {
                state[activeStep][e.target.value] = false
                return state
            })
        }
    }

    const handleClickSubmit = () => {
        let isSuccess = true
        props.lessonSelect.quizz.forEach((quizz, index) => {
            let soDapAnDung = 0;
            yourChoice[index].map(value => {
                if (value == true) {
                    soDapAnDung += 1
                }
            })
            if (quizz.answer.length == soDapAnDung) {
                quizz.answer.map(right => {
                    if (yourChoice[index][right] == false) {
                        isSuccess = false
                        return
                    }
                })
            } else {
                isSuccess = false
                return
            }
        })
        if (isSuccess) {
            console.log("Thành công")
        } else {
            console.log("Thất bại")
        }
    }

    const handleClickBack = () => {
        if (activeStep > 0) {
            setActiveStep(oldState => oldState - 1)
        }
    }

    const handleClickNext = () => {
        if (activeStep < props.lessonSelect.quizz.length - 1) {
            setActiveStep(oldState => oldState + 1)
        }
    }

    return (
        <div className='quizz'>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='title'>Attention</div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description1'>Score a lession’s quizz with an accuracy of at least 70% to unlock the next lession.
                You cannot go back to previous question once you move to another one.
            </div>
            <div style={{ marginTop: '15px' }}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'space-between', height: '50px', alignItems: 'center', backgroundColor: '#040E53', color: 'white' }}>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>1. A summary about .NET</div>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>7 question</div>
                </div>
                <div style={{ paddingLeft: '60px', backgroundColor: 'rgba(4, 14, 83, 0.04)' }}>
                    {/* <SliderQuestion></SliderQuestion> */}
                    <div>
                        <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name-question'>
                            {props.lessonSelect.quizz[activeStep].question}
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox {...label} name="answer"
                                        onClick={handleClickAnswer} value={0}
                                        color="secondary"
                                        checked={yourChoice[activeStep][0]}
                                    />
                                }
                                label={props.lessonSelect.quizz[activeStep].choice[0]}
                                sx={{ marginBottom: '30px' }}
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox {...label} name="answer"
                                        onClick={handleClickAnswer} value={1}
                                        checked={yourChoice[activeStep][1]}
                                        color="secondary" />
                                }
                                label={props.lessonSelect.quizz[activeStep].choice[1]}
                                sx={{ marginBottom: '30px' }}
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox {...label} name="answer"
                                        onClick={handleClickAnswer} value={2}
                                        checked={yourChoice[activeStep][2]}
                                        color="secondary" />
                                }
                                label={props.lessonSelect.quizz[activeStep].choice[2]}
                                sx={{ marginBottom: '30px' }}
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox {...label} name="answer"
                                        onClick={handleClickAnswer} value={3}
                                        checked={yourChoice[activeStep][3]}
                                        color="secondary" />
                                }
                                label={props.lessonSelect.quizz[activeStep].choice[3]}
                                sx={{ marginBottom: '30px' }}
                            />
                        </div>

                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(4, 14, 83, 0.04)', paddingTop: '20px' }}>
                    {
                        props.lessonSelect.quizz.map((value, index) => {
                            if (index == activeStep) {
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
                        activeStep == 0 ? (<div></div>) : (
                            <div onClick={handleClickBack} className='btn-back'>
                                Back
                            </div>
                        )
                    }
                    <div style={{ display: 'flex' }}>
                        {
                            activeStep === (props.lessonSelect.quizz.length - 1) ? (
                                <div onClick={handleClickSubmit} className='btn-back'>
                                    Submit
                                </div>
                            ) : (
                                <div onClick={handleClickNext} className='btn-back'>
                                    Next
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='course unlock' style={{ position: 'relative', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'space-between', height: '50px', alignItems: 'center', backgroundColor: 'rgb(186, 187, 196)', color: 'black' }}>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>2. Exception filters</div>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>10 question</div>
                    <div className='lock'>
                        <LockIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quizz;