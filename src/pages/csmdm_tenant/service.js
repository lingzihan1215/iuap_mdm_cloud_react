import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL":  `${GROBAL_HTTP_CTX}/tenant/list`,
    "SAVE_ORDER":  `${GROBAL_HTTP_CTX}/tenant/updateTenant`,
    "GET_LIST":  `${GROBAL_HTTP_CTX}/tenant/list`,
    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/tenant/deleteBatch`,
    "GET_ASSIGNED_INTER":  `${GROBAL_HTTP_CTX}/tenant/getAssignedInter`,        //获取租户已分配接口列表
    "GET_UNASSIGNED_INTER":  `${GROBAL_HTTP_CTX}/tenant/getUnassignedInter`,    //获取租户未分配接口列表
    "GET_ALL_INTER":  `${GROBAL_HTTP_CTX}/inter/getAllInter`,                   //获取所有接口列表

}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (params) => {
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        if((attr!='pageIndex')&&(attr!='pageSize')){
            // url+='&search_'+attr+'='+params[attr];
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
export const saveCsmdm_tenant = (params) => {
    return request(URL.SAVE_ORDER, {
        method: "post",
        data: params
    });
}
export const delCsmdm_tenant = (params) => {
    return request(URL.DEL_ORDER, {
        method: "post",
        data: params
    });
}

/**
 * 通过search_id 查询列表详情
*/
export const getDetail = (params) => {
    return request(URL.GET_DETAIL, {
        method: "get",
        param: params
    });
}

/**
 * 获取所有接口列表
 * @param {*} params
 */
export const getAllInter = (params) => {
    let url =URL.GET_ALL_INTER+'?1=1';
    for(let attr in params){
       url+='&'+attr+'='+params[attr];
    }
    console.log("url:",url);
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 获取未分配接口列表
 * @param {*} params
 */
export const getUnAssignedInter = (params) => {
    let url =URL.GET_UNASSIGNED_INTER+'?1=1';
    for(let attr in params){
       url+='&'+attr+'='+params[attr];
    }
    console.log("url:",url);
    return request(url, {
        method: "get",
        data: params
    });
}
/**
 * 获取已分配接口列表
 * @param {*} params
 */
export const getAssignedInter = (params) => {
    let url =URL.GET_ASSIGNED_INTER+'?1=1';
    for(let attr in params){
       url+='&'+attr+'='+params[attr];
    }
    console.log("url:",url);
    return request(url, {
        method: "get",
        data: params
    });
}


