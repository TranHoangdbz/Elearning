# Hướng dẫn sử dụng auth

Để có thể call các api bị chặn bởi auth middleware ở backend cần thêm jwt vào header của request.

* Gọi hàm "getToken()" trong "feature/auth/localStorage.js" để lấy jwt token. Jwt token chỉ có được khi đăng nhập thành công.
* Thêm jwt token vào header của request.

```javascript
import API from "../../services";
import { getToken } from "./localStorage";

const callTest = async () => {
  const token = getToken();
  const result = API.get("http://localhost:32/api/users/test", null, {
    headers: { "procources-access-token": `${token}` },
  });
};
```
