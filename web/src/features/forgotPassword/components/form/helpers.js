import APIHelper from "../../../../services";
import URL from '../../../../services/API/config'

const helper = {};

helper.isValidEmail = (email) => {
    if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(
            email
        )
    ) {
        return true;
    }
    return false;
};
helper.getNewPassword = async(email) => {
    try {
        const result = await APIHelper.put(URL.URL_GET_NEW_PASSWORD,{email})
        if (result.status === 200) {
            return {
                status: 'success',
                mes: result.data.mes
            }
        } else {
            return {
                status: 'fail',
                mes: result.data.mes
            }
        }
    } catch (e) {
        return {
            status: 'fail',
            mes: "Server error"
        }
    }
}

export default helper
