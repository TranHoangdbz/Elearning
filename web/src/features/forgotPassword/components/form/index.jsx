import React from "react";

import styles from "./form.module.scss";

function Form() {
    return (
        <React.Fragment>
            <div className={`${styles.form}`}>
                <p className={`${styles.formHeader}`}>Forgot Password</p>
                <div className={`${styles.formGroup}`}>
                    <div className={`${styles.formInputGroup}`}>
                        <p className={`${styles.formInputLabel}`}>Email</p>
                        <input type="email" className={`${styles.formInput}`}/>
                    </div>

                    <div className={`${styles.submitGroup}`}>
                        <button type="submit" className={`${styles.submitButton}`}>Get new password</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Form;
