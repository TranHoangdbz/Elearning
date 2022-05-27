import React, { useEffect } from 'react';
import './CourseLearning.scss'
import Test from './test'
import LockIcon from '@mui/icons-material/Lock';
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const questions = [
    {
        question: 'Question 1 : What character would you use to start a regular expression pattern at a word boundary?',
        choice: [
            'Đáp án 1 question 1',
            'Đáp án 2 question 1',
            'Đáp án 3 question 1',
            'Đáp án 4 question 1',
        ],
        answer: 2
    },
    {
        question: 'Question 2 : What character would you use to start a regular expression pattern at a word boundary?',
        choice: [
            'Đáp án 1 question 2',
            'Đáp án 2 question 2',
            'Đáp án 3 question 2',
            'Đáp án 4 question 2',
        ],
        answer: 2
    },
    {
        question: 'Question 3 : What character would you use to start a regular expression pattern at a word boundary?',
        choice: [
            'Đáp án 1 question 3',
            'Đáp án 2 question 3',
            'Đáp án 3 question 3',
            'Đáp án 4 question 3',
        ],
        answer: 2
    },
    {
        question: 'Question 4 : What character would you use to start a regular expression pattern at a word boundary?',
        choice: [
            'Đáp án 1 question 4',
            'Đáp án 2 question 4',
            'Đáp án 3 question 4',
            'Đáp án 4 question 4',
        ],
        answer: 2
    },
];

function Quizz(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [yourChoice, setYourChoice] = React.useState(questions.map((value, index) => {
        return null
    }))
    console.log('render')
    useEffect(() => {
        console.log('Useeffec')
    }, [yourChoice])
    const handleClickAnswer = (e) => {
        if (e.target.checked) {
            let a = yourChoice
            a[activeStep] = e.target.value
            setYourChoice(a)
            console.log(yourChoice)

        }
    }

    const handleClickSubmit = () => {
        console.log(yourChoice)
    }

    const handleClickBack = () => {
        if (activeStep > 0) {
            setActiveStep(oldState => oldState - 1)
        }
    }

    const handleClickNext = () => {
        if (activeStep < questions.length - 1) {
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
                            {questions[activeStep].question}
                        </div>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                control={
                                    <Radio {...label} name="answer"
                                        onClick={handleClickAnswer} value={0}
                                        defaultChecked={yourChoice[activeStep] === '0' ? true : false}
                                        color="secondary" />
                                }
                                label={questions[activeStep].choice[1]}
                                sx={{ marginBottom: '30px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Radio {...label} name="answer"
                                        onClick={handleClickAnswer} value={1}
                                        defaultChecked={yourChoice[activeStep] === '1' ? true : false}
                                        color="secondary" />
                                }
                                label={questions[activeStep].choice[1]}
                                sx={{ marginBottom: '30px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Radio {...label} name="answer"
                                        onClick={handleClickAnswer} value={2}
                                        defaultChecked={yourChoice[activeStep] === '2' ? true : false}
                                        color="secondary" />
                                }
                                label={questions[activeStep].choice[2]}
                                sx={{ marginBottom: '30px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Radio {...label} name="answer"
                                        onClick={handleClickAnswer} value={3}
                                        defaultChecked={yourChoice[activeStep] === '3' ? true : false}
                                        color="secondary" />
                                }
                                label={questions[activeStep].choice[3]}
                                sx={{ marginBottom: '30px' }}
                            />
                        </RadioGroup>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(4, 14, 83, 0.04)', paddingTop: '20px' }}>
                    {
                        questions.map((value, index) => {

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
                            activeStep === (questions.length - 1) ? (
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