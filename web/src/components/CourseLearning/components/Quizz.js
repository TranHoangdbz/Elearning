import React from 'react';
import '../CourseLearning.scss'
import Test from './test'
import LockIcon from '@mui/icons-material/Lock';
import { Checkbox, FormControlLabel } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Quizz(props) {
    return (
        <div className='quizz'>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='title'>Attention</div>
            <div style={{ fontFamily: "'Montserrat', san-serif" }} className='description1'>Score a lession’s quizz with an accuracy of at least 70% to unlock the next lession.
                You cannot go back to previous question once you move to another one.
            </div>
            <div>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'space-between', height: '50px', alignItems: 'center', backgroundColor: '#040E53', color: 'white' }}>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>1. A summary about .NET</div>
                    <div style={{ fontFamily: "'Montserrat', san-serif", fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}>7 question</div>
                </div>
                <div style={{ paddingLeft: '60px',backgroundColor:'rgba(4, 14, 83, 0.04)' }}>
                    <div style={{ fontFamily: "'Montserrat', san-serif" }} className='name-question'>
                        Question 1 : What character would you use to start a regular expression pattern at a word boundary?
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox {...label} defaultChecked color="secondary" />
                            }
                            label="Đáp án 1"
                            sx={{ marginBottom: '30px' }}
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox {...label} defaultChecked color="secondary" />
                            }
                            label="Đáp án 2"
                            sx={{ marginBottom: '30px' }}
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox {...label} defaultChecked color="secondary" />
                            }
                            label="Đáp án 3"
                            sx={{ marginBottom: '30px' }}
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox {...label} defaultChecked color="secondary" />
                            }
                            label="Đáp án 4"
                            sx={{ marginBottom: '30px' }}
                        />
                    </div>

                </div>
                <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between',backgroundColor:'rgba(4, 14, 83, 0.04)' }}>
                    <div className='btn-back'>
                        Back
                    </div>
                    <div style={{display:'flex'}}>
                        <div className='btn-back'>
                            Submit
                        </div>
                        <div className='btn-back'>
                            Next
                        </div>
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