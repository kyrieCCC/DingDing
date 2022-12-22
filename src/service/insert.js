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

export { insertData, insertAdminData, insertProductData };
