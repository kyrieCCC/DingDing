import http from "./index.js";

function insertData(username, password, sex) {
  http.post(`/register`, null, { params: { username, password, sex } });
}

function insertAdminData(ID, password, telephone, sex) {
  http.post(`/registerAdmin`, null, {
    params: { ID, password, telephone, sex },
  });
}

function insertProductData(
  spid,
  newpassword,
  newnumber,
  newprice,
  newarehouse
) {
  http.post(`/registerProduct`, null, {
    params: { spid, newpassword, newnumber, newprice, newarehouse },
  });
}

function insertSupplierData(
    ghid,
    telephone,
    name,
    address,
  ) {
    http.post(`/registerSupplier`, null, {
      params: { ghid, telephone, name, address},
    });
  }

function insertOrderData(
    ID,
    ghid,
    buynumber
  ) {
    http.post(`/registerOrder`, null, {
      params: { ID, ghid, buynumber},
    });
  }  

  function insertSaleData(ID, username, number) {
    http.post(`/registerSale`, null, {
      params: { ID, username, number },
    });
}
    
function insertWarehouseData(ckid, ckdz) {
    http.post(`/registerWarehouse`, null, {
      params: { ckid, ckdz },
    });
  }

  function insertShoppingcarData(ID, username, prices, num, buynumber) {
    http.post(`/registerShoppingcar`, null, {
      params: { ID, username, prices, num, buynumber},
    });
  }

export { insertData, insertAdminData, insertProductData, insertSupplierData, insertOrderData, insertSaleData, insertWarehouseData, insertShoppingcarData};
