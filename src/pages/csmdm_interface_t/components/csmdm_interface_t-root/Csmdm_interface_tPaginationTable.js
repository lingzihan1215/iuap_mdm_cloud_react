import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import { actions } from 'mirrorx';
import { Button,Message,Modal, Loading } from 'tinper-bee';
import Select from 'bee-select';
import moment from "moment/moment";
import Header from 'components/Header';
import Csmdm_interface_tForm from '../csmdm_interface_t-form';
import './index.less'
export default class Csmdm_interface_tPaginationTable extends Component {
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
                    title: "接口编号",
                    dataIndex: "interface_id",
                    key: "interface_id",
                     width:80,
                },
                {
                    title: "接口编码",
                    dataIndex: "interface_code",
                    key: "interface_code",
                    width: 160,
                },
                {
                    title: "接口名称",
                    dataIndex: "interface_name",
                    key: "interface_name",
                    width: 160,
                },
                {
                    title: "接口描述",
                    dataIndex: "interface_desc",
                    key: "interface_desc",
                    width: 300,
                },
                {
                    title: "接口类型",
                    dataIndex: "interface_type",
                    key: "interface_type",
                    width: 80,
                    render: (text, record, index) => (
                        <Select
                            className="hideselect"
                            disabled={true}
                            value={typeof text === 'undefined' ? "" : text}
                        >
                            <Option value="">请选择</Option>
                            <Option value={"1"}>内部</Option>
                            <Option value={"2"}>客商</Option>
                            <Option value={"3"}>银行</Option>
                        </Select>
                    )
                },
                {
                    title: "接口状态",
                    dataIndex: "interface_status",
                    key: "interface_status",
                    width: 70,
                },
                {
                    title: "计费方式",
                    dataIndex: "charge_type",
                    key: "charge_type",
                    width: 70,
                },
                {
                    title: "计费方式描述",
                    dataIndex: "charge_type_desc",
                    key: "charge_type_desc",
                    width: 210,
                },
                {
                    title: "分组编号",
                    dataIndex: "group_num",
                    key: "group_num",
                    width: 70,
                },
                {
                    title: "分组顺序",
                    dataIndex: "group_order",
                    key: "group_order",
                    width: 70,
                },
                {
                    title: "操作",
                    dataIndex: "d",
                    key: "d",
                    width: 50,
                    fixed: "right",
                    render(text, record, index) {
                        return (
                            <div className='operation-btn'>
                                <i size='sm' className='uf uf-search edit-btn' onClick={() => { self.cellClick(record, 2) }}></i>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    
    componentDidMount(){
        actions.csmdm_interface_t.loadList();//table数据
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
        await actions.csmdm_interface_t.updateState({
            rowData : record,
        });

        let id = "";
        if(record){
            id = record["interface_id"];//yangyfu，改成自己的
        }
        actions.routing.push(
            {
                pathname: 'csmdm_interface_t-edit',
                search:`?interface_id=${id}`//yangyfu，改成自己的
            }
        )
    }


    // 表格勾选回调函数，返回选中数据
    onTableSelectedData = data => {
        this.setState({
            selectData: data
        })
    }

    //******************** 分页相关 begin ********************
    // 更换分页条数
    onPageSizeSelect = (index, value) => {
        //带搜索参数
        let curSearchParam = this.props.searchParam;
        // console.log("curSearchParam:",curSearchParam);
        curSearchParam.pageIndex = 0;
        curSearchParam.pageSize = value;
        actions.csmdm_interface_t.loadList(curSearchParam);

        actions.csmdm_interface_t.updateState({
            pageSize: value
        })
    }
    // 点击分页
    onPageIndexSelect = value => {
        //带搜索参数
        let curSearchParam = this.props.searchParam;
        // console.log("curSearchParam:",curSearchParam);
        curSearchParam.pageIndex = value;
        curSearchParam.pageSize = this.props.pageSize;
        actions.csmdm_interface_t.loadList(curSearchParam);

        actions.csmdm_interface_t.updateState({
            pageIndex: value
        })
    }
    //******************** 分页相关 end ********************

    // 流程提交成功后回调函数
    onSubmitSuc = async ()=>{
        await actions.csmdm_interface_t.loadList();
        actions.csmdm_interface_t.updateState({showLoading:false});
        Message.create({content: '单据提交成功', color: 'success'});
        this.setState({
            selectData: data
        })
    }
    
    // 提交操作初始执行操作
    onSubmitStart = ()=>{
        actions.csmdm_interface_t.updateState({showLoading:true});

    }
    // 提交失败回调函数
    onSubmitFail = (error)=>{
        actions.csmdm_interface_t.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }

    // 撤回成功回调函数
    onRecallSuc = async ()=>{
        console.log("onRecallSuc 成功进入recall回调");
        await actions.csmdm_interface_t.loadList();
        actions.csmdm_interface_t.updateState({showLoading:false});
        Message.create({content: '单据撤回成功', color: 'success'});
        this.setState({
            selectData: data
        })
    }

    // 撤回失败回调函数
    onRecallFail = (error)=>{
        actions.csmdm_interface_t.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }


    onSubmitEnd = () => {
        actions.csmdm_interface_t.updateState({ showLoading: false });
    }

    // 撤回操作执行起始函数,通常用于设置滚动条
    onRecallStart = ()=>{
        actions.csmdm_interface_t.updateState({showLoading:true});
    }

    // 查看方法
    onExamine = async (text, record, index)=> {
        console.log("record", record);
        await actions.csmdm_interface_t.updateState({rowData:record});
        await actions.routing.push(
            {
                pathname: 'csmdm_interface_t-edit',
                detailObj: record,
            }
        )
    }

    // 模态框确认删除
    onModalDel = async (delFlag)=>{
        let {delData} = this.state;
        if(delFlag){
            await actions.csmdm_interface_t.delItem({
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
        // console.log("list",list)
        return (
            <div className='csmdm_interface_t-root'>
                <Header title='云主数据-租户-资源接口'/>
                <Csmdm_interface_tForm { ...this.props }/>

                <PaginationTable
                        needMultiSelect={false}
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
            </div>

        )

    }
}