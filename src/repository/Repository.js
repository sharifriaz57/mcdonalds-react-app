import axios from 'axios';

const urlPrefix = 'https://sharifriaz57.insourcezone.com';

export const getMenus = async () => {
    const response = await axios.get(`${urlPrefix}/menu/list`)
        .then(res => res)
        .catch(error => error);
    return response;
}

export const getProductsByCategoryId = async (id) => {
    let response;
    
    if (id) {
        response = await axios.get(`${urlPrefix}/product/list?id=${id}`)
            .then(res => res)
            .catch(error => error);
    } else {
        response = await axios.get(`${urlPrefix}/product/list`)
            .then(res => res)
            .catch(error => error);
    }
    
    return response;
}

export const getCategoryByCategoryId = async (id) => {
    const response = await axios.get(`${urlPrefix}/menu?id=${id}`)
        .then(res => res)
        .catch(error => error);
    
    return response;
}

export const getDetailsByProductId = async (id) => {
    const response = await axios.get(`${urlPrefix}/product/detailsById?id=${id}`)
        .then(res => res)
        .catch(error => error);

    return response;
}

export const SearchMenuProductsByName = async (name) => {
    const response = await axios.get(`${urlPrefix}/searchByName?name=${name}`)
        .then(res => res)
        .catch(error => error);

    return response;
}

