import React from 'react';
import './CourseLearning.scss'
import { Checkbox, FormControlLabel} from '@mui/material'
import { useSelector} from 'react-redux';
import { AiOutlineCheck } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Quizz(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const currentLesson = useSelector(state => {
        return state.courseLearning.currentCourse.lessons[state.courseLearning.currentLessonIndex]}
    );
    // console.log("currentLesson.quizz",currentLesson.quizz)
    const handleClickSubmit = async() => {
        props.quit();
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
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='title'>Attention Retro</div>
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
                                                <div className='answer-container'>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox {...label} name="answer"
                                                                value={0}
                                                                color="secondary"
                                                                checked={props.yourChoice[index][0]}
                                                            />
                                                        }
                                                        label={currentLesson.quizz[activeStep].choice[0]}
                                                        sx={{ marginBottom: '30px' , fontSize: '14px'}}
                                                    />
                                                    {
                                                        !props.yourChoice[index][0] ? null :
                                                        <div className="icon-check">
                                                            {
                                                                currentLesson.quizz[activeStep].answer.includes('0') || currentLesson.quizz[activeStep].answer.includes(0)?
                                                                    <AiOutlineCheck/>
                                                                :
                                                                <MdCancel color='#A20103' size={14} style={{marginLeft: '-2px'}}/>

                                                            }
                                                            
                                                        </div>
                                                    }
                                                    
                                                </div>
                                                <div className='answer-container'>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox {...label} name="answer"
                                                                value={1}
                                                                color="secondary"
                                                                checked={props.yourChoice[index][1]} />
                                                        }
                                                        label={currentLesson.quizz[activeStep].choice[1]}
                                                        sx={{ marginBottom: '30px' , fontSize: '14px'}}
                                                    />
                                                    {
                                                        !props.yourChoice[index][1] ? null :
                                                        <div className="icon-check">
                                                            {
                                                                currentLesson.quizz[activeStep].answer.includes('1') || currentLesson.quizz[activeStep].answer.includes(1) ?
                                                                    <AiOutlineCheck/>
                                                                :
                                                                <MdCancel color='#A20103' size={14} style={{marginLeft: '-2px'}}/>

                                                            }
                                                            
                                                        </div>
                                                    }
                                                    
                                                </div>
                                                <div className='answer-container'>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox {...label} name="answer"
                                                                value={2}
                                                                color="secondary" 
                                                                checked={props.yourChoice[index][2]}/>
                                                        }
                                                        label={currentLesson.quizz[activeStep].choice[2]}
                                                        sx={{ marginBottom: '30px' , fontSize: '14px'}}
                                                    />
                                                    {
                                                        !props.yourChoice[index][2] ? null :
                                                        <div className="icon-check">
                                                            {
                                                                currentLesson.quizz[activeStep].answer.includes('2') || currentLesson.quizz[activeStep].answer.includes(2)?
                                                                    <AiOutlineCheck/>
                                                                :
                                                                <MdCancel color='#A20103' size={14} style={{marginLeft: '-2px'}}/>
    
                                                            }
                                                            
                                                        </div>
                                                    }
                                                </div>
                                                <div className='answer-container'>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox {...label} name="answer"
                                                                value={3}
                                                                color="secondary"
                                                                checked={props.yourChoice[index][3]} />
                                                        }
                                                        label={currentLesson.quizz[activeStep].choice[3]}
                                                        sx={{ marginBottom: '30px', fontSize: '14px' }}
                                                    />
                                                    {
                                                        !props.yourChoice[index][3] ? null :
                                                        <div className="icon-check">
                                                            {
                                                                currentLesson.quizz[activeStep].answer.includes('3') || currentLesson.quizz[activeStep].answer.includes(3)?
                                                                    <AiOutlineCheck/>
                                                                :
                                                                <MdCancel color='#A20103' size={14} style={{marginLeft: '-2px'}}/>

                                                            }
                                                            
                                                        </div>
                                                    }
                                                   
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
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
                                    Redo
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
            </div>
        </div>
    );
}

export default Quizz;