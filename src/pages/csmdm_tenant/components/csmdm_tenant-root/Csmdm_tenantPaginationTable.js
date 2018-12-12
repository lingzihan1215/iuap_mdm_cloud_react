import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import { actions } from 'mirrorx';
import { Button, Message, Modal, Loading, Transfer } from 'tinper-bee';
import Select from 'bee-select';
import moment from "moment/moment";
import Header from 'components/Header';
import Csmdm_tenantForm from '../csmdm_tenant-form';
import './index.less'

//模态框示例
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    // disabled: i % 3 < 1,
  });
}
//过滤数组得到子数组，并把对象转换为对象的key，最后是一个字符串数组
const targetKeys = mockData
        .filter(item => +item.key % 3 > 1)
        .map(item => item.key);


export default class Csmdm_tenantPaginationTable extends Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            //模态框
            showModal:false,

            //模态框示例
            targetKeys,
            selectedKeys: [],

            // 表格中所选中的数据，拿到后可以去进行增删改查
            selectData: [],
            step: 10,
            delData:[],
            column:[
                {
                    title: "租户id",
                    dataIndex: "tenant_id",
                    key: "tenant_id",
                     width:200,
                },
                {
                    title: "租户名称",
                    dataIndex: "tenant_name",
                    key: "tenant_name",
                     width:200,
                },
                {
                    title: "联系人",
                    dataIndex: "contact_person",
                    key: "contact_person",
                     width:200,
                },
                {
                    title: "企业电话",
                    dataIndex: "tenant_tel",
                    key: "tenant_tel",
                     width:200,
                },
                {
                    title: "企业邮箱",
                    dataIndex: "tenant_email",
                    key: "tenant_email",
                     width:200,
                },
                {
                    title: "认证code",
                    dataIndex: "tenant_auth_code",
                    key: "tenant_auth_code",
                     width:200,
                },
                {
                    title: "认证token",
                    dataIndex: "tenant_token",
                    key: "tenant_token",
                     width:200,
                },
                {
                    title: "企业地址",
                    dataIndex: "tenant_address",
                    key: "tenant_address",
                     width:200,
                },
                {
                    title: "所属行业",
                    dataIndex: "tenant_industry",
                    key: "tenant_industry",
                     width:200,
                },
                {
                    title: "企业所在地",
                    dataIndex: "tenant_area",
                    key: "tenant_area",
                     width:200,
                },
                {
                    title: "企业代码",
                    dataIndex: "tenant_code",
                    key: "tenant_code",
                     width:200,
                },
                {
                    title: "企业状态",
                    dataIndex: "tenant_states",
                    key: "tenant_states",
                     width:200,
                },
                {
                    title: "主数据状态",
                    dataIndex: "tenant_mdm_status",
                    key: "tenant_mdm_status",
                     width:200,
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
                                <i size='sm' className='uf uf-pencil edit-btn' onClick={() => { self.cellClick(record,1) }}></i>
                                <i size='sm' className='uf uf-setting edit-btn' onClick={() => { self.assignInter(record, index) }}></i>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    
    componentDidMount(){
        //获取租户列表数据
        actions.csmdm_tenant.loadList();
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
        await actions.csmdm_tenant.updateState({
            rowData : record,
        });

        let id = "";
        if(record){
            id = record["tenant_id"];//yangyfu，改成自己的
        }
        actions.routing.push(
            {
                pathname: 'csmdm_tenant-edit',
                search:`?tenant_id=${id}&btnFlag=${btnFlag}`//yangyfu，改成自己的
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

    // 分配资源操作
    assignInter = async (record, index) => {
        //清理一下缓存数据
        this.setState({
            selectedKeys: [],
        });

        //获取tenantId
        let tenantId = "";
        if(record){
            tenantId = record["tenant_id"];
        }
        console.log("tenantId:",tenantId);

        // 所有接口数据
        await actions.csmdm_tenant.getAllInter();
        // 租户未分配接口数据
        await actions.csmdm_tenant.getUnAssignedInter({
            tenantId:tenantId
        });
        // 租户已分配接口数据
        await actions.csmdm_tenant.getAssignedInter({
            tenantId:tenantId
        });

        let allInter = this.props.allInterList;
        let unassign = this.props.unAssignInterList;
        let assign = this.props.assignInterList;
        console.log("allInter:",allInter);
        console.log("unassign:",unassign);
        console.log("assign:",assign);

        this.setState({
            targetKeys:this.props.assignInterList,
            showModal:true,
        });
    }
    //穿梭操作
    handleChange = async (nextTargetKeys, direction, moveKeys) => {
        console.log('nextTargetKeys: ', nextTargetKeys);

        await this.setState({ targetKeys: nextTargetKeys });

        console.log('targetKeys: ', this.state.targetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    }
    //选中操作
    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    }
    handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    }

    // 表格勾选回调函数，返回选中数据
    onTableSelectedData = data => {
        this.setState({
            selectData: data
        })
    }

    // 分页单页数据条数选择函数
    onPageSizeSelect = (index, value) => {
        actions.csmdm_tenant.loadList({
            pageSize: value
        })
        actions.csmdm_tenant.updateState({
            pageSize: value
        })
    }

    // 分页组件点击页面数字索引执行函数
    onPageIndexSelect = value => {
        actions.csmdm_tenant.loadList({
            pageIndex: value
        })
        actions.csmdm_tenant.updateState({
            pageIndex: value
        })
    }

    // 流程提交成功后回调函数
    onSubmitSuc = async ()=>{
        await actions.csmdm_tenant.loadList();
        actions.csmdm_tenant.updateState({showLoading:false});
        Message.create({content: '单据提交成功', color: 'success'});
        this.setState({
            selectData: data
        })
    }
    
    // 提交操作初始执行操作
    onSubmitStart = ()=>{
        actions.csmdm_tenant.updateState({showLoading:true});

    }
    // 提交失败回调函数
    onSubmitFail = (error)=>{
        actions.csmdm_tenant.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }

    // 撤回成功回调函数
    onRecallSuc = async ()=>{
        console.log("onRecallSuc 成功进入recall回调");
        await actions.csmdm_tenant.loadList();
        actions.csmdm_tenant.updateState({showLoading:false});
        Message.create({content: '单据撤回成功', color: 'success'});
        this.setState({
            selectData: data
        })
    }

    // 撤回失败回调函数
    onRecallFail = (error)=>{
        actions.csmdm_tenant.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }


    onSubmitEnd = () => {
        actions.csmdm_tenant.updateState({ showLoading: false });
    }

    // 撤回操作执行起始函数,通常用于设置滚动条
    onRecallStart = ()=>{
        actions.csmdm_tenant.updateState({showLoading:true});
    }

    // 查看方法
    onExamine = async (text, record, index)=> {
        console.log("record", record);
        await actions.csmdm_tenant.updateState({rowData:record});
        await actions.routing.push(
            {
                pathname: 'csmdm_tenant-edit',
                detailObj: record,
            }
        )
    }

    // 模态框确认删除
    onModalDel = async (delFlag)=>{
        let {delData} = this.state;
        if(delFlag){
            await actions.csmdm_tenant.delItem({
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
        //模态框示例
        const state = this.state;
        
        const self = this;
        let { list, showLoading, pageIndex, pageSize, totalPages, total, 
            allInterList, unAssignInterList, assignInterList } = this.props;
        let { selectData, showModal } = this.state;
        let exportProps = { total, pageIndex, pageSize, selectData, list };
        // console.log("list",list)
        return (
            <div className='csmdm_tenant-root'>
                <Header title='云主数据-租户'/>
                <Csmdm_tenantForm { ...this.props }/>
                <div className='table-header mt25'>
                    <Button colors="primary" style={{"marginLeft":15}} size='sm' onClick={() => { self.cellClick({},0) }}>
                    新增
                    </Button>
                    <Button colors="primary" style={{"marginLeft":15}} size='sm' onClick={this.open}>
                    分配资源
                    </Button>


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
                >
                    <Modal.Header>
                        <Modal.Title>分配资源</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Transfer
                            dataSource={allInterList}
                            titles={['待分配资源', '已分配资源']}
                            targetKeys={state.targetKeys}
                            selectedKeys={state.selectedKeys}
                            onChange={this.handleChange}
                            onSelectChange={this.handleSelectChange}
                            onScroll={this.handleScroll}
                            render={item => item.title}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.onModalDel(false)} shape="border" style={{ marginRight: 50 }}>关闭</Button>
                        <Button onClick={() => this.onModalDel(true)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>

                {/* <Modal
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
                </Modal> */}
            </div>

        )

    }
}