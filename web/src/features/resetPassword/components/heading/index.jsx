import React from "react";

import styles from "./heading.module.scss";

function heading() {
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
                    <button className={`${styles.rightGroupButton}`}>Sign Up</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default heading;
