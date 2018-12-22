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
        let searchObj = queryString.parse(this.props.location.search);
        let { interface_id } = searchObj;
        let tempRowData = await actions.csmdm_interface_t.queryDetail({ interface_id });
        let rowData = this.handleRefShow(tempRowData) || {};

        // console.log('rowData', rowData);
        this.setState({
            rowData: rowData,
        })

    }

    // 处理参照回显
    handleRefShow = (tempRowData) => {
        let rowData = {};
        if(tempRowData){
            let {} = tempRowData;

            this.setState({})
            rowData = Object.assign({},tempRowData,{})
        }
        return rowData;
    }

    onBack = async() => {
        window.history.go(-1);
    }

    // 动态显示标题
    onChangeHead = () => {
        return '资源接口详情';
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

        let {rowData,} = this.state;
        let title = this.onChangeHead();
        let { interface_id,interface_desc,interface_code,interface_name,interface_type,
            interface_status, charge_type, charge_type_desc} = rowData;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='csmdm_interface_t-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true} backFn={this.onBack}>
                </Header>
                <Row className='detail-body'>

                    <Col md={4} xs={6}>
                        <Label>
                            接口编号：
                                </Label>
                        <FormControl disabled={true}
                            {
                            ...getFieldProps('interface_id', {
                                validateTrigger: 'onBlur',
                                initialValue: interface_id + '' || '',
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('interface_id')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            接口编码：
                                </Label>
                        <FormControl disabled={true}
                            {
                            ...getFieldProps('interface_code', {
                                validateTrigger: 'onBlur',
                                initialValue: interface_code || '',
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
                        <FormControl disabled={true}
                            {
                            ...getFieldProps('interface_name', {
                                validateTrigger: 'onBlur',
                                initialValue: interface_name || '',
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('interface_name')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            接口描述：
                                </Label>
                        <FormControl disabled={true}
                            {
                            ...getFieldProps('interface_desc', {
                                validateTrigger: 'onBlur',
                                initialValue: interface_desc || '',
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('interface_desc')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            接口类型：
                                </Label>
                        <Select disabled={true}
                            {
                            ...getFieldProps('interface_type', {
                                initialValue: typeof interface_type === 'undefined' ? "" : interface_type,
                            }
                            )}>
                            <Option value="">请选择</Option>
                            <Option value={"1"}>内部</Option>
                            <Option value={"2"}>客商</Option>
                            <Option value={"3"}>银行</Option>
                        </Select>
                        <span className='error'>
                            {getFieldError('interface_type')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            接口状态：
                        </Label>
                        <FormControl disabled={true} value={interface_status === 1 ? "可用" : "不可用"} />
                        <span className='error'>
                            {getFieldError('interface_status')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            计费方式：
                                </Label>
                        <FormControl disabled={true}
                            {
                            ...getFieldProps('charge_type', {
                                validateTrigger: 'onBlur',
                                initialValue: charge_type || '',
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('charge_type')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            计费方式描述：
                                </Label>
                        <FormControl disabled={true}
                            {
                            ...getFieldProps('charge_type_desc', {
                                validateTrigger: 'onBlur',
                                initialValue: charge_type_desc || '',
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('charge_type_desc')}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Edit);
