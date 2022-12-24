import http from "./index.js";

function deleteData(username) {
  http.post(`/delete`, null, { params: { username } });
}

function deleteProductData(ID) {
  http.post(`/deleteproduct`, null, { params: { ID } });
}

function deleteAdminData(ID) {
  http.post(`/deleteAdmin`, null, { params: { ID } });
}

function deleteSupplierData(ghid) {
  http.post(`/deleteSupplier`, null, { params: { ghid } });
}

function deleteOrderData(ID, number) {
  http.post(`/deleteOrder`, null, { params: { ID, number } });
}

function deleteSaleData(ID, username, number) {
  http.post(`/deleteSale`, null, { params: { ID, username, number } });
}

function deleteWarehouseData(ckid) {
  http.post(`/deleteWarehouse`, null, { params: { ckid } });
}

function deleteShoppingCarData(username, prices) {
  http.post(`/deleteShoppingCar`, null, { params: { username, prices } });
}

function deleteAllCarData(username) {
  http.post(`/deleteAllCar`, null, { params: { username } });
}

export {
  deleteData,
  deleteProductData,
  deleteAdminData,
  deleteSupplierData,
  deleteOrderData,
  deleteSaleData,
  deleteWarehouseData,
  deleteShoppingCarData,
  deleteAllCarData,
};
