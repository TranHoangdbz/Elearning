import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import {openModal} from "../../resetPasswordSlice"

import styles from "./form.module.scss";

import WarningIcon from "@mui/icons-material/Warning";

import Modal from "../modal";

import helpers from "./helpers";

function Form() {
    // current password
    const [validateCurrentPassword, setValidateCurrentPassword] = useState({
        mes: "",
        isValid: true,
    });
    const [inputCurrentPassword, setInputCurrentPassword] = useState("");
    const [currentPasswordClass, setCurrentPasswordClass] = useState([
        styles.formInput,
    ]);
    // new password
    const [validatePassword, setValidatePassword] = useState({
        mes: "",
        isValid: true,
    });
    const [inputPassword, setInputPassword] = useState("");
    const [passwordClass, setPasswordClass] = useState([styles.formInput]);
    // confirm new password
    const [validateConfirmPassword, setValidateConfirmPassword] = useState({
        mes: "",
        isValid: true,
    });
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");
    const [confirmPasswordClass, setConfirmPasswordClass] = useState([
        styles.formInput,
    ]);

    // validate
    const handleBlur = () => {
        var message
        if (!(message = helpers.isUnValidPassword(inputPassword))) {
            setPasswordClass(
                passwordClass.filter(
                    (element) => element !== styles.formInputInvalid
                )
            );
            setValidatePassword({ mes: "", isValid: true });

            return true;
        } else {
            const newClasses = [styles.formInputInvalid, ...passwordClass];
            setPasswordClass(newClasses);

            if (inputPassword === "") {
                setValidatePassword({
                    mes: "Require field.",
                    isValid: false,
                });
            } else {
                setValidatePassword({
                    mes: message,
                    isValid: false,
                });
            }

            return false;
        }
    };
    const handleCurrentBlur = () => {
        var message
        if ( !(message = helpers.isUnValidPassword(inputCurrentPassword))) {
            setCurrentPasswordClass(
                currentPasswordClass.filter(
                    (element) => element !== styles.formInputInvalid
                )
            );
            setValidateCurrentPassword({ mes: "", isValid: true });

            return true;
        } else {
            const newClasses = [
                styles.formInputInvalid,
                ...currentPasswordClass,
            ];
            setCurrentPasswordClass(newClasses);

            if (inputCurrentPassword === "") {
                setValidateCurrentPassword({
                    mes: "Require field.",
                    isValid: false,
                });
            } else {
                setValidateCurrentPassword({
                    mes: message,
                    isValid: false,
                });
            }

            return false;
        }
    };
    const handleConfirmBlur = () => {
        if (
            inputConfirmPassword === inputPassword &&
            inputConfirmPassword !== ""
        ) {
            setConfirmPasswordClass(
                confirmPasswordClass.filter(
                    (element) => element !== styles.formInputInvalid
                )
            );
            setValidateConfirmPassword({ mes: "", isValid: true });

            return true;
        } else {
            const newClasses = [
                styles.formInputInvalid,
                ...confirmPasswordClass,
            ];
            setConfirmPasswordClass(newClasses);
            if (inputConfirmPassword === "") {
                setValidateConfirmPassword({
                    mes: "Require field.",
                    isValid: false,
                });
            } else {
                setValidateConfirmPassword({
                    mes: "Incorrect password.",
                    isValid: false,
                });
            }

            return false;
        }
    };

    // open & close modal
    const dispatch = useDispatch()
    const handleOpen = () => dispatch(openModal());

    // submit
    const handleSubmit = async () => {
        const isCurrentPasswordValid = handleCurrentBlur();
        const isNewPasswordValid = handleBlur();
        const isConfirmPasswordValid = handleConfirmBlur();

        if (
            isCurrentPasswordValid &&
            isNewPasswordValid &&
            isConfirmPasswordValid
        ) {
            try {
                const isCorrectPassword = await helpers.isCorrectPassword(
                    inputCurrentPassword,inputPassword
                );
                
                if (isCorrectPassword) {
                    handleOpen();
                } else {
                    setValidateCurrentPassword({
                        mes: "Incorrect password.",
                        isValid: false,
                    });
                    setInputPassword("");
                    setInputConfirmPassword("");
                }
            } catch (err) {
                setValidateCurrentPassword({
                    mes: err.message,
                    isValid: false,
                });
                setInputPassword("");
                setInputConfirmPassword("");
            }
        }
        //
    };
    return (
        <React.Fragment>
            <div className={`${styles.form}`}>
                <p className={`${styles.formHeader}`}>Reset Password</p>
                <div className={`${styles.formGroup}`}>
                    <div className={`${styles.formInputGroup}`}>
                        <div className={`${styles.childInputGroup}`}>
                            <p className={`${styles.formInputLabel}`}>
                                Current password
                            </p>
                            <input
                                type="password"
                                onBlur={handleCurrentBlur}
                                onChange={(e) =>
                                    setInputCurrentPassword(e.target.value)
                                }
                                className={`${currentPasswordClass.join(" ")}`}
                            />
                            {!validateCurrentPassword.isValid && (
                                <div className={`${styles.invalidLabel}`}>
                                    <WarningIcon />
                                    <p>{validateCurrentPassword.mes}</p>
                                </div>
                            )}
                        </div>

                        <div className={`${styles.childInputGroup}`}>
                            <p className={`${styles.formInputLabel}`}>
                                New password
                            </p>
                            <input
                                type="password"
                                onBlur={handleBlur}
                                onChange={(e) =>
                                    setInputPassword(e.target.value)
                                }
                                value={inputPassword}
                                className={`${passwordClass.join(" ")}`}
                            />
                            {!validatePassword.isValid && (
                                <div className={`${styles.invalidLabel}`}>
                                    <WarningIcon />
                                    <p>{validatePassword.mes}</p>
                                </div>
                            )}
                        </div>

                        <div className={`${styles.childInputGroup}`}>
                            <p className={`${styles.formInputLabel}`}>
                                Confirm new password
                            </p>
                            <input
                                type="password"
                                onBlur={handleConfirmBlur}
                                onChange={(e) =>
                                    setInputConfirmPassword(e.target.value)
                                }
                                value={inputConfirmPassword}
                                className={`${styles.formInput}`}
                            />
                            {!validateConfirmPassword.isValid && (
                                <div className={`${styles.invalidLabel}`}>
                                    <WarningIcon />
                                    <p>{validateConfirmPassword.mes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`${styles.submitGroup}`}>
                        <button
                            type="submit"
                            className={`${styles.submitButton}`}
                            onClick={handleSubmit}
                        >
                            Confirm reset password
                        </button>
                    </div>

                    <Modal></Modal>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Form;
