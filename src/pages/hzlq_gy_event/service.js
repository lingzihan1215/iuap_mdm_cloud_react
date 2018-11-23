import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL":  `${GROBAL_HTTP_CTX}/hzlq_gy_event/list`,
    "SAVE_ORDER":  `${GROBAL_HTTP_CTX}/hzlq_gy_event/save`,
    "GET_LIST":  `${GROBAL_HTTP_CTX}/hzlq_gy_event/list`,    
    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/hzlq_gy_event/deleteBatch`,
    "REJ_LIST":  `${GROBAL_HTTP_CTX}/hzlq_data_dictionary/rejectList`,
    "GET_AUTH" : `/wbalone/security/auth`,
    "REJECT" : `${GROBAL_HTTP_CTX}/hzlq_gy_event/reject`,
    "PASS" : `${GROBAL_HTTP_CTX}/hzlq_gy_event/pass`,
    "GOAL" : `${GROBAL_HTTP_CTX}/hzlq_gy_event/goal`,
}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (params) => {
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        if((attr!='pageIndex')&&(attr!='pageSize')){
            url+='&search_'+attr+'='+params[attr];
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
 * 获取审核下拉选项
 * @param {*} params
 */
export const getRejSelect = (params) => {
    return request(URL.REJ_LIST, {
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
export const saveHzlq_gy_event = (params) => {
    return request(URL.SAVE_ORDER, {
        method: "post",
        data: params
    });
}
export const delHzlq_gy_event = (params) => {
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
 * 通过funcCode查询按钮权限
*/
export const getAuth = (funcCode) => { 
    return request(URL.GET_AUTH, {
        method: "get",
        param: {
            funcCode
        }
    });
}

export const rejectHzlq_gy_event = (params) => {
    return request(URL.REJECT, {
        method: "post",
        data: params
    });
}

export const passHzlq_gy_event = (params) => {
    return request(URL.PASS, {
        method: "post",
        data: params
    });
}

export const goalHzlq_gy_event = (params) => {
    return request(URL.GOAL, {
        method: "post",
        data: params
    });
}
