import http from './index.js'

function deleteData(username) {
    http.post(`/delete`, null, { params: { username } })
}

function deleteProductData(ID) {
    http.post(`/deleteproduct`, null, { params: { ID } })
}

function deleteAdminData(ID) {
    http.post(`/deleteAdmin`, null, { params: { ID } })
}
export { deleteData, deleteProductData, deleteAdminData }