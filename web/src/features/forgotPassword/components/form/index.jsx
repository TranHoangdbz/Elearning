import React from "react";
import { useState } from "react";

import styles from "./form.module.scss";

import WarningIcon from "@mui/icons-material/Warning";

import Modal from "../modal";

import helpers from "./helpers";

function Form() {
    const [isValidEmail, setIsValidEmail] = useState({
        mes: "",
        isValid: true,
    });
    const [inputClass, setInputClass] = useState([styles.formInput]);
    const [inputValue, setInputValue] = useState("");
    // validate
    const handleBlur = () => {
        if (helpers.isValidEmail(inputValue)) {
            setInputClass(
                inputClass.filter(
                    (element) => element !== styles.formInputInvalid
                )
            );
            setIsValidEmail({ mes: "", isValid: true });

            return true;
        } else {
            const newClasses = [styles.formInputInvalid, ...inputClass];
            setInputClass(newClasses);
            if (inputValue === "") {
                setIsValidEmail({
                    mes: "This field is required.",
                    isValid: false,
                });
            } else {
                setIsValidEmail({
                    mes: "This email is invalid.",
                    isValid: false,
                });
            }
            return false;
        }
    };

    // open & close modal
    const [open, setOpen] = useState(false);
    const handleOpen = () =>
        //
        setOpen(true);
    const handleClose = () => setOpen(false);

    // submit
    const [modalContent, setModalContent] = useState({
        status: "fail",
        mes: "Some error",
    });
    const [disabledButton, setDisabledButton] = useState(false);
    const handleSubmit = async () => {
        if (handleBlur()) {
            try {
                setDisabledButton(true);
                const getNewPassword = await helpers.getNewPassword(inputValue);
                setModalContent(getNewPassword);
                setDisabledButton(false);
            } catch (e) {
                console.log(e);
            } finally {
                handleOpen();
            }
        }
        //
    };
    return (
        <React.Fragment>
            <div className={`${styles.form}`}>
                <p className={`${styles.formHeader}`}>Forgot Password</p>
                <div className={`${styles.formGroup}`}>
                    <div className={`${styles.formInputGroup}`}>
                        <p className={`${styles.formInputLabel}`}>Email</p>
                        <input
                            type="email"
                            placeholder="yourname@hostservice.com"
                            onBlur={handleBlur}
                            onChange={(e) => setInputValue(e.target.value)}
                            className={`${inputClass.join(" ")}`}
                        />
                        {!isValidEmail.isValid && (
                            <div className={`${styles.invalidLabel}`}>
                                <WarningIcon />
                                <p>{isValidEmail.mes}</p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.submitGroup}`}>
                        <button
                            disabled={disabledButton}
                            type="submit"
                            className={
                                styles[
                                    "submitButton" +
                                        (disabledButton ? "_disable" : "")
                                ]
                            }
                            onClick={handleSubmit}
                        >
                            Get new password
                        </button>
                    </div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        status={modalContent.status}
                        mes={modalContent.mes}
                    ></Modal>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Form;
