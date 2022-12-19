import http from './index.js'

function updateData(username, password, sex) {
    http.post(`/update`, null, { params: { username, password, sex } })
}


function payProduct(ID, number, buynumber, username) {
    http.post(`/payproduct`, null, { params: { ID, number, buynumber, username } })
}
export { updateData, payProduct }