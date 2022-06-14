import APIhelper from "../../../../services";
import * as authToken from "../../../../features/auth/localStorage";
import CONSTANTS from "../../../../constants";

import URL_API from "../../../../services/API/config";

const helper = {};

helper.isUnValidPassword = (password) => {
    if (password.length < 8) {
        return "Password must be at least 8 characters."
    }
    if (!password.match(/[A-Z]/g)) {
        return "Password must contain uppercase characters."
    }
    if (!password.match(/[a-z]/g)) {
        return "Password must contain lowercase characters."
    }
    if (!password.match(/[0-9]/g)) {
        return "Password must contain number."
    }
    if (!password.match(/[!@#$%^&*\-]/g)) {
        return "Password must contain at least one symbol characters in !@#$%^&*- ."
    }
    return false;
};
helper.isCorrectPassword = async (password, newPassword) => {
    const TOKEN_KEY = CONSTANTS.LOCAL_STORAGE.AUTH_TOKEN_KEY;

    const config = {
        headers: {
            [TOKEN_KEY]: authToken.getToken(),
        },
    };
    try {
        const result = await APIhelper.put(
            URL_API.URL_RESET_PASSWORD,
            { password, newPassword },
            config
        );
        if (result.status === 200) {
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default helper;
