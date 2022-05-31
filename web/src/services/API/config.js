// gateway
const URL_SYSTEM_V1 = 'http://localhost:32/api';

export default {
  URL_AUTH: URL_SYSTEM_V1 + '/login',
  URL_RESET_PASSWORD: URL_SYSTEM_V1 + '/users/reset-password',
  URL_GET_NEW_PASSWORD: URL_SYSTEM_V1 + '/users/get-new-password',
  URL_GET_COURSE_BY_ID: URL_SYSTEM_V1 + '/courses',
  URL_GET_ALL_COURSE: URL_SYSTEM_V1 + '/courses',
  // some api
  URL_SYSTEM_V1: URL_SYSTEM_V1,
};