import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import {BpmButtonSubmit,BpmButtonRecall} from 'yyuap-bpm';
import { actions } from 'mirrorx';
import { Button,Message,Modal, Loading } from 'tinper-bee';
import Select from 'bee-select';
import moment from "moment/moment";
import Header from 'components/Header';
import Hzlq_gy_eventForm from '../hzlq_gy_event-form';
import './index.less'
export default class Hzlq_gy_eventPaginationTable extends Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            // 表格中所选中的数据，拿到后可以去进行增删改查
            selectData: [],
            step: 10,
            showModal:false,
            delData:[],
            column:[
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
                    title: "项目名称",
                    dataIndex: "projectName",
                    key: "projectName",
                     width:200,
                },
                {
                    title: "开始时间",
                    dataIndex: "beginTime",
                    key: "beginTime",
                     width:150,
                    sorter: (a, b) => {
                        let val1 = a.beginTime;
                        let val2 = b.beginTime;
                        return new Date(val1.split('-').join('/')).getTime()
                   -new Date(val2.split('-').join('/')).getTime()
                   } 
                },
                {
                    title: "结束时间",
                    dataIndex: "endTime",
                    key: "endTime",
                    width:150,
                    sorter: (a, b) => {
                        let val1 = a.endTime;
                        let val2 = b.endTime;
                        return new Date(val1.split('-').join('/')).getTime()
                   -new Date(val2.split('-').join('/')).getTime()
                    }
                },
                {
                    title: "审核状态",
                    dataIndex: "auditbz",
                    key: "auditbz",
                     width:150,
                },
                {
                    title: "评分",
                    dataIndex: "goal",
                    key: "goal",
                    width:150,
                    sorter: (a, b) => a.goal - b.goal
                },
                {
                    title: "操作",
                    dataIndex: "d",
                    key: "d",
                    width:100,
                    fixed: "right",
                    render(text, record, index) {
                        return (
                            <div className='operation-btn'>
                                <i size='sm' className='uf uf-search edit-btn' onClick={() => { self.cellClick(record,2) }}></i>
                                {/* <i size='sm' className='uf uf-pencil edit-btn' onClick={() => { self.cellClick(record,1) }}></i> */}
                                {/* <i size='sm' className='uf uf-del del-btn' onClick={() => { self.delItem(record, index) }}></i> */}
                            </div>
                        )
                    }
                }
            ]
        }
    }
    
    componentDidMount(){
        // this.setState({ step: this.props.pageSize })
        actions.hzlq_gy_event.loadList();//table数据
    }

    tabelSelect = (data) => {//tabel选中数据
        this.setState({
            selectData: data
        })
    }
    /**
     * 编辑,详情，增加
     */

    cellClick = async (record,btnFlag) => {
        await actions.hzlq_gy_event.updateState({
            rowData : record,
        });

        let id = "";
        if(record){
            id = record["id"];
        }
        actions.routing.push(
            {
                pathname: 'hzlq_gy_event-edit',
                search:`?search_id=${id}&btnFlag=${btnFlag}`
            }
        )
    }

    // 删除操作
    delItem = (record, index) => {
        this.setState({
            showModal:true,
            delData:[{ id: record.id,ts: record.ts }]
        });

    }

    // 表格勾选回调函数，返回选中数据
    onTableSelectedData = data => {

        this.setState({
            selectData: data
        })
    }

    // 分页单页数据条数选择函数
    onPageSizeSelect = (index, value) => {
        actions.hzlq_gy_event.loadList({
            pageSize: value
        })
        actions.hzlq_gy_event.updateState({
            pageSize: value
        })
    }

    // 分页组件点击页面数字索引执行函数
    onPageIndexSelect = value => {
        actions.hzlq_gy_event.loadList({
            pageIndex: value
        })
        actions.hzlq_gy_event.updateState({
            pageIndex: value
        })
    }

    // 流程提交成功后回调函数
    onSubmitSuc = async ()=>{
        await actions.hzlq_gy_event.loadList();
        actions.hzlq_gy_event.updateState({showLoading:false});
        Message.create({content: '单据提交成功', color: 'success'});

    }
    
    // 提交操作初始执行操作
    onSubmitStart = ()=>{
        actions.hzlq_gy_event.updateState({showLoading:true});

    }
    // 提交失败回调函数
    onSubmitFail = (error)=>{
        actions.hzlq_gy_event.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }

    // 撤回成功回调函数
    onRecallSuc = async ()=>{
        console.log("onRecallSuc 成功进入recall回调");
        await actions.hzlq_gy_event.loadList();
        actions.hzlq_gy_event.updateState({showLoading:false});
        Message.create({content: '单据撤回成功', color: 'success'});

    }

    // 撤回失败回调函数
    onRecallFail = (error)=>{
        actions.hzlq_gy_event.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }


    onSubmitEnd = () => {
        actions.hzlq_gy_event.updateState({ showLoading: false });
    }

    // 撤回操作执行起始函数,通常用于设置滚动条
    onRecallStart = ()=>{
        actions.hzlq_gy_event.updateState({showLoading:true});
    }

    // 查看方法
    onExamine = async (text, record, index)=> {
        console.log("record", record);
        await actions.hzlq_gy_event.updateState({rowData:record});
        await actions.routing.push(
            {
                pathname: 'hzlq_gy_event-edit',
                detailObj: record,
            }
        )
    }

    // 模态框确认删除
    onModalDel = async (delFlag)=>{
        let {delData} = this.state;
        if(delFlag){
            await actions.hzlq_gy_event.delItem({
                param: delData
            });
        }
        this.setState({
            showModal:false,
            delData:[]
        })
    }


    // 动态设置列表滚动条x坐标
    getCloumnsScroll = (columns) => {
        let sum = 0;
        columns.forEach((da) => {
            sum += da.width;
        })
        return (sum);
    }

    render(){
        const self=this;
        let { list, showLoading, pageIndex, pageSize, totalPages , total } = this.props;
        let {selectData,showModal} = this.state;
        let exportProps = { total, pageIndex, pageSize, selectData, list};
        console.log("list",list)
        return (
            <div className='hzlq_gy_event-root'>
                <Header title='管养突发应急事件记录表'/>
                <Hzlq_gy_eventForm { ...this.props }/>
                <div className='table-header mt25'>
                    {/* <Button colors="primary" style={{"marginLeft":15}} size='sm' onClick={() => { self.cellClick({},0) }}>
                    新增
                    </Button> */}
                {/*     <BpmButtonSubmit
                            className="ml5 "
                            checkedArray = {selectData}
                            funccode = "hzlqzw"
                            nodekey = "003"
                            url = {`${GROBAL_HTTP_CTX}/hzlq_gy_event/submit`}
                            urlAssignSubmit={`${GROBAL_HTTP_CTX}/hzlq_gy_event/assignSubmit`}
                            onSuccess = {this.onSubmitSuc}
                            onError = {this.onSubmitFail}
                            onStart={this.onSubmitStart}
                            onEnd={this.onSubmitEnd}
                    >
                        <Button size='sm' style={{"marginLeft":"15px"}} className="admin"  colors="primary">提交</Button>
                    </BpmButtonSubmit>
                    <BpmButtonRecall
                            className="ml5 "
                            checkedArray = {selectData}
                            url = {`${GROBAL_HTTP_CTX}/hzlq_gy_event/recall`}
                            onSuccess = {this.onRecallSuc}
                            onError = {this.onRecallFail}
                            onStart = {this.onRecallStart}
                            onEnd={this.onSubmitEnd}
                    >
                        <Button size='sm' style={{"marginLeft":"15px"}} className="admin"  colors="primary">收回</Button>
                    </BpmButtonRecall>
                  */} 


                </div> 
                <PaginationTable
                        data={list}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        total = {total}
                        columns={this.state.column}
                        checkMinSize={6}
                        getSelectedDataFunc={this.tabelSelect}
                        onTableSelectedData={this.onTableSelectedData}
                        onPageSizeSelect={this.onPageSizeSelect}
                        onPageIndexSelect={this.onPageIndexSelect}
                />
                <Loading show={showLoading} loadingType="line" />
                <Modal
                        show={showModal}
                        onHide={this.close} >
                    <Modal.Header>
                        <Modal.Title>确认删除</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        是否删除选中内容
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=>this.onModalDel(false)} shape="border" style={{ marginRight: 50 }}>关闭</Button>
                        <Button onClick={()=>this.onModalDel(true)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )

    }
}