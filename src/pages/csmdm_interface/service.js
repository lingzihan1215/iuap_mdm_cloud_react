import request from "utils/request";
//定义接口地址
const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/inter/listInter`,
    "UPDATE_INTER":  `${GROBAL_HTTP_CTX}/inter/save`,
    "GET_DETAIL":  `${GROBAL_HTTP_CTX}/inter/listInter`,

    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/inter/deleteBatch`,
}

/**
 * 获取接口列表
 * @param {*} params
 */
export const getList = (params) => {
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        if((attr!='pageIndex')&&(attr!='pageSize')){
            url+='&'+attr+'='+params[attr];
        }else{
            url+='&'+attr+'='+params[attr];
        }
    }
    return request(url, {
        method: "get",
        data: params
    });
}

//更新接口
export const saveCsmdm_interface = (params) => {
    return request(URL.UPDATE_INTER, {
        method: "post",
        data: params
    });
}

/**
 * 查询接口详情
*/
export const getDetail = (params) => {
    debugger
    return request(URL.GET_DETAIL, {
        method: "get",
        param: params
    });
}

/**
 * 获取下拉列表
 * @param {*} params
 */
export const getSelect = (params) => {
    return request(URL.GET_SELECT, {
        method: "get",
        data: params
    });
}
/**
 * 删除table数据
 * @param {*} params
 */
export const deleteList = (params) => {
    return request(URL.DELETE, {
        method: "post",
        data:params
    });
}

export const saveList = (params) => {
    return request(URL.SAVE, {
        method: "post",
        data:params
    });
}

export const delCsmdm_interface = (params) => {
    return request(URL.DEL_ORDER, {
        method: "post",
        data: params
    });
}


