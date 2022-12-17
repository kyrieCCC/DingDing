import http from './index.js'

function deleteData(username) {
    http.post(`/delete`, null, { params: { username } })
}

export { deleteData }