import React from "react";
import { useNavigate } from "react-router-dom";

import { SIGN_IN } from "../../../../routes";

import styles from "./modal.module.scss";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

function ModalContent({ open, onClose, status, mes }) {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.box}>
                    <Typography
                        id="modal-modal-title"
                        className={
                            styles[
                                `title_${
                                    status === "success" ? "success" : "fail"
                                }`
                            ]
                        }
                    >
                        {status}
                    </Typography>
                    {status === "success" ? (
                        <CheckCircleIcon
                            className={styles.icon_success}
                        ></CheckCircleIcon>
                    ) : (
                        <ReportGmailerrorredIcon
                            className={styles.icon_fail}
                        ></ReportGmailerrorredIcon>
                    )}
                    <Typography
                        id="modal-modal-description"
                        className={styles.description}
                    >
                        {mes}
                    </Typography>
                    <div className={`${styles.submitGroup}`}>
                        <button
                            className={`${styles.submitButton}`}
                            onClick={status === "success" ? () => navigate(SIGN_IN) : onClose}
                        >
                            {status === "success" ? "Sign in" : "Close"}
                        </button>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default ModalContent;
