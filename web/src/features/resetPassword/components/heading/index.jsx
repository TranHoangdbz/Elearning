import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./heading.module.scss";

import {SIGN_UP} from '../../../../routes'



function Heading() {

    const navigate = useNavigate()

    return (
        <React.Fragment>
            <div className={`${styles.heading}`}>
                <div className={`${styles.leftGroup}`}>
                    <div className={`${styles.logo}`}></div>
                    <p className={`${styles.name}`}>ProCourse</p>
                    <p className={`${styles.description}`}>
                        Curiosity is the key
                    </p>
                </div>

                <div className={`${styles.rightGroup}`}>
                    <p className={`${styles.rightGroupText}`}>Don't have accout?</p>
                    <button onClick={() => navigate(SIGN_UP)} className={`${styles.rightGroupButton}`}>Sign Up</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Heading;
