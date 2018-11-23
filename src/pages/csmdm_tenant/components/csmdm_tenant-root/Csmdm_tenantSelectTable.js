import React, { Component } from 'react';
import { Button,Checkbox,Table } from 'tinper-bee';
import moment from "moment/moment";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import Header from 'components/Header';
import Csmdm_tenantForm from '../csmdm_tenant-form';
const MultiSelectTable = multiSelect(Table, Checkbox);

export default class Csmdm_tenantSelectTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectData:[]
        }
    }
    /**
     * 编辑
     */
    edit = () =>{
        console.log('进入编辑');
    }
    /**
     * tabel选中数据
     * @param {*} data
     */
    tabelSelect = (data) => {
        this.setState({
            selectData: data
        })
    }
    render(){
        const self=this;
        const { list,showLoading,pageSize, pageIndex, totalPages } = this.props;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100,
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
                            <Button size='sm' className='edit-btn' onClick={() => { self.edit(record,true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="csmdm_tenant-select-table">
                <Header title='云主数据-租户' back={true} />
                <Csmdm_tenantForm { ...this.props }/>
                <div className="table-list">
                    <MultiSelectTable
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        columns={column}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
                    />
                </div>
            </div>
        )
    }
}