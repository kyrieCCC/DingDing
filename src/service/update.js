import http from './index.js'

function updateData(username, password, sex) {
    http.post(`/update`, null, { params: { username, password, sex } })
}

export { updateData }