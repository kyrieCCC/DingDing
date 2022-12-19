import http from './index.js'

function buyProductData(ID, ghid, buynumber, number) {
    http.post(`/buyproduct`, null, { params: { ID, ghid, buynumber, number } })
}

export { buyProductData }