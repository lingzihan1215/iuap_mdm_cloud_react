import React, { Component } from 'react';
import { Button,Checkbox,Table } from 'tinper-bee';
import moment from "moment/moment";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import Header from 'components/Header';
import Csmdm_interfaceForm from '../csmdm_interface-form';
const MultiSelectTable = multiSelect(Table, Checkbox);

export default class Csmdm_interfaceSelectTable extends Component {
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
                    title: "接口编号",
                    dataIndex: "interface_id",
                    key: "interface_id",
                    width: 100,
                },
                {
                    title: "接口描述",
                    dataIndex: "interface_desc",
                    key: "interface_desc",
                    width: 100,
                },
                {
                    title: "接口编码",
                    dataIndex: "interface_code",
                    key: "interface_code",
                    width: 100,
                },
                {
                    title: "接口名称",
                    dataIndex: "interface_name",
                    key: "interface_name",
                    width: 100,
                },
                {
                    title: "接口类型",
                    dataIndex: "interface_type",
                    key: "interface_type",
                    width: 100,
                },
                {
                    title: "接口状态",
                    dataIndex: "interface_status",
                    key: "interface_status",
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
            <div className="csmdm_interface-select-table">
                <Header title='云主数据-资源接口' back={true} />
                <Csmdm_interfaceForm { ...this.props }/>
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