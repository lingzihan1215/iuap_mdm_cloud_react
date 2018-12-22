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
        await actions.csmdm_tenant.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { tenant_id } = searchObj;//yangyfu，改成自己的
            let tempRowData = await actions.csmdm_tenant.queryDetail({ tenant_id });//yangyfu，改成自己的
            let rowData = this.handleRefShow(tempRowData) || {};

            // console.log('rowData',rowData);
            this.setState({
                rowData:rowData,
            })
        }

    }
    save = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            values.attachment = this.state.fileNameData;
            let numArray = [];
            for (let i = 0, len = numArray.length; i < len; i++) {
                values[numArray[i]] = Number(values[numArray[i]]);
            }

            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let { rowData, } = this.state;
                let saveObj = Object.assign({}, rowData, values);

                await actions.csmdm_tenant.save(
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
        let { tenant_id,tenant_name,contact_person,corp_name,tenant_states,tenant_mdm_status,tenant_tel,tenant_email,tenant_auth_code,tenant_token,tenant_address,tenant_industry,tenant_area,tenant_code, } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='csmdm_tenant-detail'>
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
                                    租户id：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||true}
                                        {
                                        ...getFieldProps('tenant_id', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_id || '',
                                            rules: [{
                                                message: '请输入租户id',
                                            }],
                                        }
                                        )}
                                    />
                                <span className='error'>
                                    {getFieldError('tenant_id')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    租户名称：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||true}
                                        {
                                        ...getFieldProps('tenant_name', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_name || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入租户名称',
                                            }],
                                        }
                                        )}
                                    />
                                <span className='error'>
                                    {getFieldError('tenant_name')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    联系人：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('contact_person', {
                                            validateTrigger: 'onBlur',
                                            initialValue: contact_person || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入联系人',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('contact_person')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    企业电话：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_tel', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_tel || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入企业电话',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_tel')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    企业邮箱：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_email', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_email || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入企业邮箱',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_email')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    认证code：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_auth_code', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_auth_code || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入认证code',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_auth_code')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    认证token：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_token', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_token || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入认证token',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_token')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    企业地址：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_address', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_address || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入企业地址',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_address')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    所属行业：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_industry', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_industry || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入所属行业',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_industry')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    企业所在地：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_area', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_area || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入企业所在地',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_area')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    企业代码：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('tenant_code', {
                                            validateTrigger: 'onBlur',
                                            initialValue: tenant_code || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入企业代码',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('tenant_code')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    主数据状态：
                                </Label>
                                    {
                                        (btnFlag < 2) ?
                                            (<Radio.RadioGroup
                                                disabled={true}
                                                selectedValue={tenant_mdm_status||''}
                                                {
                                                ...getFieldProps('tenant_mdm_status', {
                                                    initialValue: tenant_mdm_status||'',
                                                    validateTrigger: 'onBlur',
                                                    rules: [{
                                                        required: true, message: '请选择主数据状态',
                                                    }],
                                                    onChange(value) {
                                                        let tempRow = Object.assign({},rowData,{ tenant_mdm_status: value });
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
                                                <FormControl disabled={btnFlag == 2} value={tenant_mdm_status===1?"可用":"不可用"} />
                                            )
                                    }


                                <span className='error'>
                                    {getFieldError('tenant_mdm_status')}
                                </span>
                            </Col>
                            {
                                (btnFlag < 2) ?
                                (
                                    ''
                                ):
                                (
                                    <Col md={4} xs={6}>
                                        <Label>
                                            企业状态：
                                        </Label>
                                        {
                                            <FormControl disabled={btnFlag == 2} value={tenant_states===1?"可用":"不可用"} />
                                        }
                                    </Col>
                                )
                            }       
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Edit);
