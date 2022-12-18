import http from './index.js'

function updateData(username, password, sex) {
    http.post(`/update`, null, { params: { username, password, sex } })
}


function payProduct(ID, number) {
    http.post(`/payproduct`, null, { params: { ID, number } })
}
export { updateData, payProduct }