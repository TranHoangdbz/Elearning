import { Button, Grid, Modal, Stack, TextField, Typography } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import style from './style';
import AjaxHelper from '../../../services/index'
import URL_API from '../../../services/API/config'

const CreateQuizz = (props) => {

    const [answer, setAnswer] = useState([])
    const answerSource = ['A', 'B', 'C', 'D']
    const [question, setQuestion] = useState('')
    const [answerA, setAnswerA] = useState('')
    const [answerB, setAnswerB] = useState('')
    const [answerC, setAnswerC] = useState('')
    const [answerD, setAnswerD] = useState('')

    async function AddQuizzToLesson(quizzId) {
        try {
            const result = await AjaxHelper.post(URL_API.URL_ADD_QUIZZ_TO_LESSON, {
                "lessonId": props.lessonID,
                "quizzId": quizzId
            })
            if (result.status == 200) {
                console.log(result)
                props.fetchNewData()
                props.handleClose()
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

    const handleSetAnswer = (value) => {
        if (answer.includes(value)) {
            setAnswer(prevState => {
                return prevState.filter(ite => ite != value)
            })
        }
        else {
            setAnswer(prevState => {
                return [...prevState, value]
            })
        }
    }

    const handleAnswerChange = (key, value) => {
        switch (key) {
            case "A":
                setAnswerA(value)
                break
            case "B":
                setAnswerB(value)
                break

            case "C":
                setAnswerC(value)
                break

            case "D":
                setAnswerD(value)
                break
        }
    }


    async function AsyncProcess() {
        const processedAnswer = answer.map(ite => {
            if (ite == "A") return 0
            else if (ite == "B") return 1
            else if (ite == "C") return 2
            else return 3
        })
        const newQuizz = {
            question: question,
            choice: [
                answerA,
                answerB,
                answerC,
                answerD
            ],
            answer: processedAnswer
        }

        try {
            const result = await AjaxHelper.post(URL_API.URL_CREATE_QUIZZ, newQuizz)
            if (result.status == 200) {
                await AddQuizzToLesson(result.data.data._id)
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
    function isEmpty(str) {
        return (str.length === 0);
    }

    const CheckingProcess = () => {

        return (answer.length == 0 || isEmpty(answerA) || isEmpty(answerB) || isEmpty(answerC) || isEmpty(answerD)) ? true : false
    }

    const handleCreateQuizz = async () => {
        if (!CheckingProcess())
            await AsyncProcess()
        else {
            console.log("Khong duoc bo trong cau tra loi va phai chon it nhat 1 cau tra loi dung !")
        }
    }

    return (

        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Stack sx={style.modalContainer}>
                <Typography variant='h4' fontWeight={'bold'} sx={style.title}>Add Quizz</Typography>
                <Grid container styles={style.container}>
                    <Grid container item xs={7} sx={style.panel_1}>
                        <Stack sx={style.leftStack}>
                            <Typography variant='h5' fontWeight={'bold'} sx={{ mb: 3 }}>Question</Typography>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={15}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </Stack>
                    </Grid>
                    <Grid container item xs={5} sx={style.panel_2}>
                        <Stack sx={{ width: '100%' }}>
                            {
                                answerSource.map((ite, i) => (
                                    <Stack key={i}
                                        sx={{
                                            width: '100%',
                                            mb: 2
                                        }}>
                                        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                                            <Typography variant='h6' fontWeight={'bold'}>Answer {ite}</Typography>
                                            <FormControlLabel control={<Checkbox checked={answer.includes(ite)} onChange={() => handleSetAnswer(ite)} sx={{
                                                color: 'black',
                                                '&.Mui-checked': {
                                                    color: 'black',
                                                },
                                            }} />} label="Is Correct Answer" />
                                        </Stack>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            onChange={(e) => handleAnswerChange(ite, e.target.value)}
                                        />
                                    </Stack>

                                ))
                            }
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction={'row'}
                    sx={{
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                    <Button variant="contained" color='error' sx={{ mr: 2 }} onClick={props.handleClose}>Cancel</Button>
                    <Button variant="contained" sx={{ backgroundColor: '#040E53' }} onClick={handleCreateQuizz}>Save All</Button>
                </Stack>
            </Stack>

        </Modal>
    )
}
export default CreateQuizz;