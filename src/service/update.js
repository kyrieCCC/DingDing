import http from './index.js'

function updateData(username, password, sex) {
    http.post(`/update`, null, { params: { username, password, sex } })
}


function payProduct(ID, number, buynumber, username) {
    http.post(`/payproduct`, null, { params: { ID, number, buynumber, username } })
}

function updateAdminData(ID, password, telephone, sex) {
    http.post(`/updateAdmin`, null, { params: { ID, password, telephone, sex } })
}
export { updateData, payProduct, updateAdminData }