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

function updateSupplierData(ghid, telephone, name, address) {
    http.post(`/updateSupplier`, null, { params: { ghid, telephone, name, address } })
}

function updateOrderData(ID, ghid, buynumber) {
    http.post(`/updateOrder`, null, { params: { ID, ghid, buynumber } })
}

function updateSaleData(ID, username, number) {
    http.post(`/updateSale`, null, { params: { ID, username, number } })
}

function updateWarehouseData(ckid, ckdz) {
    http.post(`/updateWarehouse`, null, { params: { ckid, ckdz } })
}

function updateSendData(ID, username, number) {
    http.post(`/updateSendData`, null, { params: { ID, username, number } })
}

export { updateData, payProduct, updateAdminData, updateSupplierData, updateOrderData, updateSaleData, updateWarehouseData, updateSendData }