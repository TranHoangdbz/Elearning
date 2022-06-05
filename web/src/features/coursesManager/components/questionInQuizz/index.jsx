import React, { useEffect, useState } from 'react'
import styles from './styles'

import { Button, Grid, Stack, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

function QuestionInQuizz(props) {
    const quizz = props.item

    return (
        <Stack direction='row' sx={styles.container}>
            <Stack>
                <Typography sx={styles.fontBold}>Question {props.index}: {quizz.question}</Typography>
                {quizz.choice &&
                    quizz.choice.map((item, index) => (
                        <ChoiceItem key={index} item={item} index={index} answer={quizz.answer} />
                    ))
                }
            </Stack>

            <Stack direction='row'>
                <Button sx={styles.button}>Edit</Button>
                <Button sx={styles.button}>Delete</Button>
            </Stack>
        </Stack >
    )
}

const ChoiceItem = ({ item, index, answer }) => {
    const [answerKey, setAnswerKey] = useState()
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const setKey = () => {
            if (index == 0) {
                setAnswerKey('A')
            }
            if (index == 1) {
                setAnswerKey('B')
            }
            if (index == 2) {
                setAnswerKey('C')
            }
            if (index == 3) {
                setAnswerKey('D')
            }
        }

        const setCorrectAnswer = () => {
            setIsVisible(answer.includes(index))
        }

        setKey()
        setCorrectAnswer()
    }, [])

    return (
        <Stack direction='row' sx={{ marginY: 0.5 }}>
            <Typography sx={styles.fontBold}>{answerKey}.</Typography>
            <Typography sx={{ marginLeft: 0.2 }}> {item}</Typography>
            {isVisible && <CheckRoundedIcon />}
        </Stack>

    )
}

export default QuestionInQuizz;