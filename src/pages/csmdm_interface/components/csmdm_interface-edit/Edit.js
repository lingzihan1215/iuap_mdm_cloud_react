import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { Switch, InputNumber,Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio } from "tinper-bee";
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

const FormItem = Form.FormItem;
const Option = Select.Option;
const format = "YYYY-MM-DD HH:mm:ss";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            fileNameData: props.rowData.attachment || [],//上传附件数据
        }
    }
    async componentWillMount() {
        await actions.csmdm_interface.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { interface_id } = searchObj;
            let tempRowData = await actions.csmdm_interface.queryDetail({ interface_id });
            let rowData = this.handleRefShow(tempRowData) || {};

            console.log('rowData',rowData);
            this.setState({
                rowData:rowData,
            })
        }

    }
    save = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            values.attachment = this.state.fileNameData;
            let numArray = [
            ];
            for(let i=0,len=numArray.length; i<len; i++ ) {
                values[numArray[i]] = Number(values[numArray[i]]);
            }


            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let {rowData,
                } = this.state;
                
                let saveObj = Object.assign({}, rowData, values);
                
                await actions.csmdm_interface.save(
                    saveObj,
                );
            }
        });
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

        let { btnFlag,appType, id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        btnFlag = Number(btnFlag);
        let {rowData,
        } = this.state;


        let title = this.onChangeHead(btnFlag);
        let { interface_id,interface_desc,interface_code,interface_name,interface_type,interface_status, } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='csmdm_interface-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true} backFn={this.onBack}>
                    {(btnFlag < 2) ? (
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.onBack}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ) : ''}
                </Header>
                <Row className='detail-body'>

                            <Col md={4} xs={6}>
                                <Label>
                                    接口编号：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||true}
                                        {
                                        ...getFieldProps('interface_id', {
                                            validateTrigger: 'onBlur',
                                            initialValue: interface_id+'' || '',
                                            rules: [{
                                                message: '请输入接口编号',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('interface_id')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    接口描述：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('interface_desc', {
                                            validateTrigger: 'onBlur',
                                            initialValue: interface_desc || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入接口描述',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('interface_desc')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    接口编码：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('interface_code', {
                                            validateTrigger: 'onBlur',
                                            initialValue: interface_code || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入接口编码',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('interface_code')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    接口名称：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('interface_name', {
                                            validateTrigger: 'onBlur',
                                            initialValue: interface_name || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入接口名称',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('interface_name')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    接口类型：
                                </Label>
                                    <Select disabled={btnFlag == 2}
                                        {
                                        ...getFieldProps('interface_type', {
                                            initialValue: typeof interface_type === 'undefined' ? "" : interface_type ,
                                            rules: [{
                                                required: true, message: '请选择接口类型',
                                            }],
                                        }
                                        )}>
                                        <Option value="">请选择</Option>
                                            <Option value={ "1" }>客商</Option>
                                            <Option value={ "2" }>银行</Option>
                                    </Select>


                                <span className='error'>
                                    {getFieldError('interface_type')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    接口状态：
                                </Label>
                                    {
                                        (btnFlag < 2) ?
                                            (<Radio.RadioGroup
                                                disabled={true}
                                                selectedValue={interface_status||''}
                                                {
                                                ...getFieldProps('interface_status', {
                                                    initialValue: interface_status||'',
                                                    validateTrigger: 'onBlur',
                                                    rules: [{
                                                        required: true, message: '请选择接口状态',
                                                    }],
                                                    onChange(value) {
                                                        let tempRow = Object.assign({},rowData,{ interface_status: value });
                                                        self.setState({
                                                            rowData:tempRow
                                                        })
                                                    },
                                                }
                                                )}
                                            >
                                                <Radio value={1}>可用</Radio>
                                                <Radio value={2}>不可用</Radio>
                                            </Radio.RadioGroup>) : (
                                                <FormControl disabled={btnFlag == 2} value={interface_status === 1?"可用":"不可用"} />
                                            )
                                    }


                                <span className='error'>
                                    {getFieldError('interface_status')}
                                </span>
                            </Col>
                </Row>


            </div>
        )
    }
}

export default Form.createForm()(Edit);
