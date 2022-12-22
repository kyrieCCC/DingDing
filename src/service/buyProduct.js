import http from './index.js'

function buyProductData(ID, ghid, buynumber, number, ckid) {
    http.post(`/buyproduct`, null, { params: { ID, ghid, buynumber, number, ckid } })
}

export { buyProductData }