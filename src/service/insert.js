import http from './index.js'

function insertData(username, password, sex) {
    http.post(`/register`, null, { params: { username, password, sex } })
}

export { insertData }