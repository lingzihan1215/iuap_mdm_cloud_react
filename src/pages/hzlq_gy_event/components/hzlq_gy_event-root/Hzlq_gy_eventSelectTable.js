import React, { Component } from 'react';
import { Button,Checkbox,Table } from 'tinper-bee';
import moment from "moment/moment";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import Header from 'components/Header';
import Hzlq_gy_eventForm from '../hzlq_gy_event-form';
const MultiSelectTable = multiSelect(Table, Checkbox);

export default class Hzlq_gy_eventSelectTable extends Component {
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
                    title: "开始时间",
                    dataIndex: "beginTime",
                    key: "beginTime",
                    width: 100,
                },
                {
                    title: "审核标识",
                    dataIndex: "auditbz",
                    key: "auditbz",
                    width: 100,
                },
                {
                    title: "应急抢修,抢修内容",
                    dataIndex: "repairContent",
                    key: "repairContent",
                    width: 100,
                },
                {
                    title: "结束时间",
                    dataIndex: "endTime",
                    key: "endTime",
                    width: 100,
                },
                {
                    title: "项目名称",
                    dataIndex: "projectName",
                    key: "projectName",
                    width: 100,
                },
                {
                    title: "项目ID",
                    dataIndex: "projectId",
                    key: "projectId",
                    width: 100,
                },
                {
                    title: "评分",
                    dataIndex: "goal",
                    key: "goal",
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
            <div className="hzlq_gy_event-select-table">
                <Header title='管养突发应急事件记录表' back={true} />
                <Hzlq_gy_eventForm { ...this.props }/>
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