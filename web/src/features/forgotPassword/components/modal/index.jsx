import React from "react";
import {useNavigate} from 'react-router-dom'

import styles from "./modal.module.scss";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ModalContent({ open, onClose }) {

    const navigate = useNavigate()

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.box}>
                    <Typography id="modal-modal-title" className={styles.title}>
                        Succes
                    </Typography>
                    <CheckCircleIcon className={styles.icon}></CheckCircleIcon>
                    <Typography
                        id="modal-modal-description"
                        className={styles.description}
                    >
                        A new password has been sent to your email/phone number,
                        please check.
                    </Typography>
                    <div className={`${styles.submitGroup}`}>
                        <button
                            className={`${styles.submitButton}`}
                            onClick={(() => navigate('/reset-password'))}
                        >
                            Reset password
                        </button>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default ModalContent;
