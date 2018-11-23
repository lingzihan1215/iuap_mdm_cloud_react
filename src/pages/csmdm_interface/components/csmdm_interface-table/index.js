import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Table,Button } from 'tinper-bee'
import moment from "moment/moment";

import './index.less'

// Csmdm_interfaceTable 组件定义
class Csmdm_interfaceTable extends Component {
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
                pathname: 'csmdm_interface-edit',
                detailObj: record,
                editFlag: !!editFlag
            }
        )
    }
    delItem = (record, index) => {
        actions.csmdm_interface.delItem({
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

export default Csmdm_interfaceTable