import APIhelper from'../../../../services'
import * as authToken from'../../../../features/auth/localStorage'

import URL_API from '../../../../services/API/config'

const helper = {};

helper.isValidPassword = (email) => {
    if (
        email.length >= 8
    ) {
        return true;
    }
    return false;
};
helper.isCorrectPassword = async (password,newPassword) => {
    const config = {
        headers: {
            "procources-access-token": authToken.getToken()
        }
    }
    try {      
        const result = await APIhelper.put(URL_API.URL_RESET_PASSWORD, {password, newPassword}, config);
        if (result.status === 200) {
            return true;
        }
        return false;
    } catch(e) {
        console.error(e);
        return false
    }
}

export default helper
