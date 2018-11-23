import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Table,Button } from 'tinper-bee'
import moment from "moment/moment";

import './index.less'

// Csmdm_tenantTable 组件定义
class Csmdm_tenantTable extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    /**
     * 编辑,详情，增加
     */
    cellClick = async(record, editFlag) => {


        actions.routing.push(
            {
                pathname: 'csmdm_tenant-edit',
                detailObj: record,
                editFlag: !!editFlag
            }
        )
    }
    delItem = (record, index) => {
        actions.csmdm_tenant.delItem({
            param: [{ id: record.id,ts: record.ts }],
            index: index
        });
    }
    /**
     *
     */
    render(){
        const self = this;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 80,
                render(record, text, index) {
                    return index + 1;
                }
            },
                {
                    title: "租户id",
                    dataIndex: "tenant_id",
                    key: "tenant_id",
                    width: 100,
                },
                {
                    title: "租户名称",
                    dataIndex: "tenant_name",
                    key: "tenant_name",
                    width: 100,
                },
                {
                    title: "联系人",
                    dataIndex: "contact_person",
                    key: "contact_person",
                    width: 100,
                },
                {
                    title: "公司名称",
                    dataIndex: "corp_name",
                    key: "corp_name",
                    width: 100,
                },
                {
                    title: "企业状态",
                    dataIndex: "tenant_states",
                    key: "tenant_states",
                    width: 100,
                },
                {
                    title: "主数据状态",
                    dataIndex: "tenant_mdm_status",
                    key: "tenant_mdm_status",
                    width: 100,
                },
                {
                    title: "企业电话",
                    dataIndex: "tenant_tel",
                    key: "tenant_tel",
                    width: 100,
                },
                {
                    title: "企业邮箱",
                    dataIndex: "tenant_email",
                    key: "tenant_email",
                    width: 100,
                },
                {
                    title: "认证code",
                    dataIndex: "tenant_auth_code",
                    key: "tenant_auth_code",
                    width: 100,
                },
                {
                    title: "认证token",
                    dataIndex: "tenant_token",
                    key: "tenant_token",
                    width: 100,
                },
                {
                    title: "企业地址",
                    dataIndex: "tenant_address",
                    key: "tenant_address",
                    width: 100,
                },
                {
                    title: "所属行业",
                    dataIndex: "tenant_industry",
                    key: "tenant_industry",
                    width: 100,
                },
                {
                    title: "企业所在地",
                    dataIndex: "tenant_area",
                    key: "tenant_area",
                    width: 100,
                },
                {
                    title: "企业代码",
                    dataIndex: "tenant_code",
                    key: "tenant_code",
                    width: 100,
                },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={() => { self.cellClick(record, true) }}>编辑</Button>
                            <Button size='sm' className='del-btn' onClick={() => { self.delItem(record, index) }}>删除</Button>
                        </div>
                    )
                }
            }
        ];
        const { list,showLoading,pageSize, pageIndex, totalPages, } = this.props;
        return (
            <div className="table-list">
                <div className='table-header'>
                    <Button
                        size="sm"
                        colors="primary"
                        shape="border"
                        onClick={() => { self.cellClick({}, true) }}>
                        新增
                    </Button>
                </div>
                <Table
                    loading={{show:showLoading,loadingType:"line"}}
                    rowKey={(r,i)=>i}
                    columns={column}
                    data={list}
                />
            </div>
        )
    }
}

export default Csmdm_tenantTable