import React from "react";
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {closeModal} from "../../resetPasswordSlice"

import styles from "./modal.module.scss";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {SIGN_IN} from "../../../../routes"

function ModalContent() {

    const navigate = useNavigate()

    const open = useSelector(state => state.resetPassword.modalOpen);
    const dispatch = useDispatch()
    const handleClose = () => dispatch(closeModal());

    const handleNavigate = () => {
        handleClose()
        navigate(SIGN_IN)
    }

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
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
                        Password has been reset successfully, please sign in now.
                    </Typography>
                    <div className={`${styles.submitGroup}`} onClick={handleNavigate}>
                        <button
                            className={`${styles.submitButton}`}
                        >
                            Sign in
                        </button>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default ModalContent;
