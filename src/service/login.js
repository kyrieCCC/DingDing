import http from './index.js'

function loginService(username, password) {
    return http.get(`/login`, { params: { username, password } }) //注意，这里用的是get方法，这个方法的第一个参数传url，第二个参数传参数
}

export { loginService }