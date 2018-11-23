import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { Switch, InputNumber,Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio,FormGroup } from "tinper-bee";
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
import Header from "components/Header";
import options from "components/RefOption";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import Select from 'bee-select';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './edit.less';
import 'ac-upload/build/ac-upload.css';
import { setCookie, getCookie} from "utils";
import zhCN from "rc-calendar/lib/locale/zh_CN";
//import Viewer from 'bee-viewer';
//import 'bee-viewer/build/Viewer.css';
import 'bee-message/build/Message.css';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

const FormItem = Form.FormItem;
const Option = Select.Option;

const format = "YYYY-MM-DD";

const dateInputPlaceholder = "选择日期";

function onSelect(d) {
  console.log(d);
}

function onChange(d) {
  console.log(d);
}

function disabledDate(current) {
  return current && current.valueOf() < Date.now();
}

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            fileNameData: props.rowData.attachment || [],//上传附件数据
            btnFlag:2,
            showRejectModal: false,
            showPassModal:false,
            showGoleModal:false,
        }
    }
    async componentWillMount() {
        await actions.hzlq_gy_event.getOrderTypes();
        await actions.hzlq_gy_event.queryAuth('gy_event');
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { search_id } = searchObj;
            let tempRowData = await actions.hzlq_gy_event.queryDetail({ search_id });
            let rowData = this.handleRefShow(tempRowData) || {};

            console.log('rowData',rowData);
            this.setState({
                rowData:rowData,
                btnFlag: Number(btnFlag)
            })
        }

    }
    save = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            values.attachment = this.state.fileNameData;
            let numArray = [
                "goal",
            ];
            for(let i=0,len=numArray.length; i<len; i++ ) {
                values[numArray[i]] = Number(values[numArray[i]]);
            }

            if (err) {
                console.log("数据填写错误",values)
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let {rowData,
                } = this.state;
                if (rowData && rowData.id) {
                    values.id = rowData.id;
                    values.ts = rowData.ts;
                }
                // values.beginTime = values.beginTime.format(format);
                // values.endTime = values.endTime.format(format);

                await actions.hzlq_gy_event.save(
                    values,
                );
            }
        });
    }
    edit = () => {
        let searchObj = queryString.parse(this.props.location.search);
        let { search_id } = searchObj;
        actions.routing.replace(
            {
                pathname: 'hzlq_gy_event-edit',
                search:`?search_id=${search_id}&btnFlag=1`
            }
        )
        this.setState({ btnFlag : 1 })
    }

    // close = async(flag) => {
    //     let { dismissal } = this.state;
    //     if(flag){
    //         let rejectReason = {};
    //         let searchObj = queryString.parse(this.props.location.search);
    //         let { search_id } = searchObj;
    //         rejectReason.id = search_id;
    //         rejectReason.reason = dismissal;
    //         // if(dismissal.length > 50){
    //         //     Message.create({content: '长度不能超过50个字符', color: 'danger'});
    //         //     return false;
    //         // }else if(dismissal == ''){
    //         //     rejectReason.reason = "无"
    //         // }
    //         // console.log(dismissal,'提交驳回原因')
    //         await actions.hzlq_gy_event.handleReject(
    //             rejectReason,
    //         );
    //         window.history.go(-1);
    //     }
    //     this.setState({
    //         showRejectModal: false
    //     });
    // }

    closeReject(flag){
        if(flag){
            this.props.form.validateFields((err, values) => {
                if (err) {
                    // console.log('校验失败', values);
                    return false;
                } else {
                    let rejectReason = {};
                    let searchObj = queryString.parse(this.props.location.search);
                    let { search_id } = searchObj;
                    rejectReason.id = search_id;
                    rejectReason.reason = values.dismissal;

                    console.log('提交成功', rejectReason);
                    actions.hzlq_gy_event.handleReject(
                        rejectReason,
                    );
                    window.history.go(-1);
                }
            });
        }else{
            this.setState({
                showRejectModal: false
            });
        }
    }

    reject = () => {
        this.setState({
            showRejectModal: true
        });
    }
    //驳回原因
    // handleDismissalChange = (value) => {
    //     this.setState({
    //         dismissal:value
    //     })
    // }
    // 审核通过
    pass = () =>{
        this.setState({
            showPassModal: true
        });
    }
    closePass = async(flag) => {
        if(flag){
            let passReason = {};
            let searchObj = queryString.parse(this.props.location.search);
            let { search_id } = searchObj;
            passReason.id = search_id;
            await actions.hzlq_gy_event.handlePass(
                passReason
            );
            window.history.go(-1);
        }
        this.setState({
            showPassModal: false
        });
    }
    // 评分
    goal = () => {
        this.setState({
            showGoleModal: true
        });
    }
    closeGoal(flag){
        // let { goal } = this.state;
        if(flag){
            this.props.form.validateFields((err, values) => {
                if (err) {
                    // console.log('校验失败', values);
                    return false;
                } else {
                    let goalParam = {};
                    let searchObj = queryString.parse(this.props.location.search);
                    let { search_id } = searchObj;
                    goalParam.id = search_id;
                    goalParam.param = values.goal;

                    // console.log('提交成功', rejectReason);
                    actions.hzlq_gy_event.handleGoal(
                        goalParam,
                    );
                    window.history.go(-1);
                }
            });
        }else{
            this.setState({
                showGoleModal: false
            });
        }
    }
    handleGoalChange = (value) => {
        console.log(value)
        this.setState({
            goal:value
        })
    }

    // 处理参照回显
    handleRefShow = (tempRowData) => {
        let rowData = {};
        if(tempRowData){

            let {
            } = tempRowData;

            this.setState({
            })
            rowData = Object.assign({},tempRowData,
                {
                }
            )
        }
        return rowData;
    }

    onBack = async() => {
        window.history.go(-1);
    }

    // 动态显示标题
    onChangeHead = (btnFlag) => {
        let titleArr = ["新增","编辑","详情"];
        return titleArr[btnFlag]||'新增';
    }

    // 跳转到流程图
    onClickToBPM = (rowData) => {
        console.log("actions", actions);
        actions.routing.push({
            pathname: 'hzlq_gy_event-chart',
            search: `?id=${rowData.id}`
        })
    }
    
    // 流程图相关回调函数
    onBpmStart = () => {
        actions.hzlq_gy_event.updateState({ showLoading: true });
    }
    onBpmEnd = () => {
        actions.hzlq_gy_event.updateState({ showLoading: false });
    }
    onBpmSuccess = () => {
        actions.hzlq_gy_event.updateState({ showLoading: false });
        // actions.routing.push('pagination-table');
        actions.routing.goBack();
    }
    onBpmError = () => {
        actions.hzlq_gy_event.updateState({ showLoading: false });
    }

    // 审批面板展示
    showBpmComponent = (btnFlag, appType, id, processDefinitionId, processInstanceId, rowData) => {
        // btnFlag为2表示为详情
        if ((btnFlag == 2) && rowData && rowData['id']) {
            console.log("showBpmComponent", btnFlag)
            return (
                <div >
                    {appType == 1 &&<BpmTaskApprovalWrap
                        id={rowData.id}
                        onBpmFlowClick={() => { this.onClickToBPM(rowData) }}
                        appType={appType}
                        onStart={this.onBpmStart}
                        onEnd={this.onBpmEnd}
                        onSuccess={this.onBpmSuccess}
                        onError={this.onBpmError}
                    />}
                    {appType == 2 &&<BpmTaskApprovalWrap
                        id={id}
                        processDefinitionId={processDefinitionId}
                        processInstanceId={processInstanceId}
                        onBpmFlowClick={() => { this.onClickToBPM(rowData) }}
                        appType={appType}
                        onStart={this.onBpmStart}
                        onEnd={this.onBpmEnd}
                        onSuccess={this.onBpmSuccess}
                        onError={this.onBpmError}
                    />}
                </div>

            );
        }
    }

    arryDeepClone = (array)=>{
        let result = [];
        if(array){
            array.map((item)=>{
                let temp = Object.assign([],item);
                result.push(temp);
            })
        }
    }

    // 通过search_id查询数据

    render() {
        const self = this;
        // 拿到权限对象
        let { updateAuth, goalAuth,rejectAuth} = this.props;
        let {appType, id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        // btnFlag = Number(btnFlag);
        let {rowData,
            btnFlag,
            errorMessage
        } = this.state;

        let title = this.onChangeHead(btnFlag);
        let { projectMaster,ondutyPerson,def10,def11,audit,def12,def13,weather,def14,def15,def16,beginTime,def17,event,def18,def19,def3,def4,creator,def1,def2,auditbz,equipment,pictureSrc,organName,def20,repairContent,auditTime,organId,location,def9,endTime,projectName,def7,projectId,def8,goal,def5,def6,dismissal } = rowData;
        //  let pictureSrc = "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg,http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg,";
        let _img = [];//图片列表
        let img1="";
        if(pictureSrc){
            pictureSrc.split(",").map((item,index)=>{
                if(index ==0){
                    img1=item;
                }
                if(item != ''){
                    _img.push({src: item, alt: ''});
                }
            })
        }


        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='hzlq_gy_event-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true} backFn={this.onBack}>
                    {(btnFlag < 2) ? (
                        <div className='head-btn'>
                        {updateAuth && 
                            <Button className='head-cancel' onClick={this.onBack}>取消</Button>
                        } 
                        {updateAuth &&   
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        }   
                        </div>
                    ) : ''}
                     {(btnFlag ==2) ? (
                          <div className='head-btn'>
                          {updateAuth && 
                            <Button className='head-save' onClick={this.edit}>编辑</Button>
                          }
                          {rejectAuth && (auditbz==1||auditbz==3) &&
                            <Button className='head-save' onClick={this.pass}>审核通过</Button>
                          }
                          {rejectAuth && (auditbz==1||auditbz==2) &&
                            <Button className='head-save' onClick={this.reject}>审核驳回</Button>
                          }
                          {goalAuth && 
                          <Button className='head-save' onClick={this.goal}>评分</Button>
                          }
                        </div>
                    ) : ''} 
                </Header>
                {
                    self.showBpmComponent(btnFlag, appType ? appType : "1", id, processDefinitionId, processInstanceId, rowData)
                }
                <Row className='detail-body'>

                            <Col md={4} xs={6}>
                                <Label>
                                    出勤人员：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('ondutyPerson', {
                                            validateTrigger: 'onBlur',
                                            initialValue: ondutyPerson || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入出勤人员',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('ondutyPerson')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    天气：
                                </Label>
                                    <Select disabled={btnFlag == 2}
                                        {
                                        ...getFieldProps('weather', {
                                            initialValue: weather || '',
                                            rules: [{
                                                type:'string',required: true, message: '请选择天气',
                                            }],
                                        }
                                        )}>
                                        <Option value="">请选择</Option>
                                            <Option value="0">晴</Option>
                                            <Option value="1">雨</Option>
                                    </Select>


                                <span className='error'>
                                    {getFieldError('weather')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label className="datepicker">
                                    开始时间：
                                </Label>
                                <DatePicker className='form-item' disabled
                                        format={format}
                                        onSelect={onSelect}
                                        onChange={this.onChange}
                                        locale={zhCN}
                                        showTime={true}
                                        defaultValue={moment(rowData.beginTime)}
                                        placeholder={dateInputPlaceholder}
                                        getCalendarContainer={this.getCalendarContainer}
                                    />

                                <span className='error'>
                                    {getFieldError('beginTime')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label className="datepicker">
                                    结束时间：
                                </Label>
                                <DatePicker className='form-item' disabled
                                        format={format}
                                        onSelect={onSelect}
                                        onChange={this.onChange}
                                        locale={zhCN}
                                        defaultValue={moment(rowData.endTime)}
                                        placeholder={dateInputPlaceholder}
                                        getCalendarContainer={this.getCalendarContainer}
                                />


                                <span className='error'>
                                    {getFieldError('endTime')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    事件：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('event', {
                                            validateTrigger: 'onBlur',
                                            initialValue: event || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入事件',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('event')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    动用设备：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('equipment', {
                                            validateTrigger: 'onBlur',
                                            initialValue: equipment || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入动用设备',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('equipment')}
                                </span>
                            </Col>
                            
                            <Col md={4} xs={6}>
                                <Label>
                                    地点：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('location', {
                                            validateTrigger: 'onBlur',
                                            initialValue: location || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入地点',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('location')}
                                </span>
                            </Col>
                            
                            <Col md={4} xs={6}>
                                <Label>
                                    项目名称：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||btnFlag == 1}
                                        {
                                        ...getFieldProps('projectName', {
                                            validateTrigger: 'onBlur',
                                            initialValue: projectName || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入项目名称',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('projectName')}
                                </span>
                            </Col>
                            {auditbz!=2 &&
                                <Col md={12} xs={6} className="textarea">
                                <Label>
                                    驳回原因：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||btnFlag == 1} componentClass='textarea' 
                                        {
                                        ...getFieldProps('dismissal', {
                                            validateTrigger: 'onBlur',
                                            initialValue: dismissal || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入驳回原因',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('dismissal')}
                                </span>
                                </Col>
                            }
                            {/* <Col md={8} className="textarea-label">
                            </Col> */}
                            {/* <Col md={1} className="textarea-label">
                                <Label>
                                    应急抢修，<br/>抢修内容：
                                </Label>
                            </Col> */}
                            <Col md={12} xs={6} className="textarea">
                                <Label>
                                    应急抢修，<br/>抢修内容：
                                </Label>
                                    <FormControl disabled={btnFlag == 2 || false} componentClass='textarea' 
                                        {
                                        ...getFieldProps('repairContent', {
                                            validateTrigger: 'onBlur',
                                            initialValue: repairContent || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入应急抢修,抢修内容',
                                            }],
                                        }
                                        )}
                                    />

                                <span className='error'>
                                    {getFieldError('repairContent')}
                                </span>
                            </Col>
                            <Col md={12} xs={6} className="imgContainer">
                                <Label>
                                    图片：
                                </Label>
                                {/* <Viewer>
                                    <div>
                                        {pictureSrc?
                                            String(pictureSrc).split(",").map((item,index) => {
                                                // if(item != '')
                                                return (<img className="img" key={index} src={item} alt="Picture"/>)
                                            }) :null
                                        }
                                    </div>
                                </Viewer> */}

                                <img src={img1} onClick={() => { this.setState({ visible: !this.state.visible }); } } />
                                <Viewer
                                visible={this.state.visible}
                                onClose={() => { this.setState({ visible: false }); } }
                                images={_img}
                                />
                            </Col>
                </Row>

                <Modal
                    show={this.state.showRejectModal}
                    onHide={this.closeReject}
                    className="dismissal-modal"
                >
                <Modal.Header className="text-center">
                            <Modal.Title>驳回原因</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <div style={{ width: 300, margin: '0 auto' }}>
                                <FormControl  
                                    componentClass="textarea"             
                                    onChange={this.handleDismissalChange}
                                    {...getFieldProps('dismissal', {
                                        validateTrigger: 'onBlur',
                                        // initialValue:dismissal || '无',
                                        rules: [{
                                            max:50,message:'最大长度为50'
                                        }],
                                    }) }
                                />
                                <span className='error'>
                                {getFieldError('dismissal')}
                               </span>
                            </div>
                </Modal.Body>
                <Modal.Footer className="text-center">
                            <Button bordered style={{ marginRight: 20 }} onClick={()=>this.closeReject(false)}>
                                取消
                            </Button>
                            <Button colors="primary" onClick={() => this.closeReject(true)}>
                                确认
                            </Button>
                </Modal.Footer>
                </Modal>
                
                <Modal
                    show={this.state.showPassModal}
                    onHide={this.closePass}
                    className="pass-modal"
                >
                <Modal.Header className="text-center">
                            <Modal.Title>审核通过</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer className="text-center">
                            <Button bordered style={{ marginRight: 20 }} onClick={()=>this.closePass(false)}>
                                取消
                            </Button>
                            <Button colors="primary" onClick={() => this.closePass(true)}>
                                确认
                            </Button>
                </Modal.Footer>
                </Modal>
                
                <Modal
                    show={this.state.showGoleModal}
                    onHide={this.closeGoal}
                    className="goal-modal"
                >
                <Modal.Header className="text-center">
                            <Modal.Title>评分</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <div style={{ width: 300, margin: '0 auto' }}>
                                {/* <Label>分数</Label> */}
                                <FormControl               
                                    onChange={this.handleGoalChange}
                                    {...getFieldProps('goal', {
                                        validateTrigger: 'onBlur',
                                        initialValue: '',
                                        rules: [{
                                            // required: true, message:'请输入分数',
                                        },{
                                            pattern:/^(?:0|[1-9][0-9]?|100)$/, message:'请输入整数且在0-100之间',
                                        }],
                                    }) }
                                />
                                <span className='error'>
                                {getFieldError('goal')}
                               </span>
                            </div>
                </Modal.Body>
                <Modal.Footer className="text-center">
                            <Button bordered style={{ marginRight: 20 }} onClick={()=>this.closeGoal(false)}>
                                取消
                            </Button>
                            <Button colors="primary" onClick={() => this.closeGoal(true)}>
                                确认
                            </Button>
                </Modal.Footer>
                </Modal>

            </div>
            
        )
    }
}

export default Form.createForm()(Edit);
