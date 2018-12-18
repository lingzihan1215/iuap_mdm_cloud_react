import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Switch, InputNumber, Col, Row,FormControl, Label, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
import options from "components/RefOption";
const { RangePicker } = DatePicker;
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './index.less'

class Csmdm_tenantForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            tenant_id: '',
            tenant_name: '',
            contact_person: '',
            corp_name: '',
            tenant_states: '',
            tenant_mdm_status: '',
            tenant_tel: '',
            tenant_email: '',
            tenant_auth_code: '',
            tenant_token: '',
            tenant_address: '',
            tenant_industry: '',
            tenant_area: '',
            tenant_code: '',
        }
    }
    componentWillMount(){
        // 获得云主数据-租户列表数据
        actions.csmdm_tenant.getOrderTypes();
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        this.props.form.validateFields(async (err, values) => {  
            values.pageIndex = 0;//查询操作后从第一页开始显示
            values.pageSize = this.props.pageSize || 10;

            //设置搜索参数
            actions.csmdm_tenant.updateState({
                searchParam:values
            })

            await actions.csmdm_tenant.loadList(values);
        });


    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            tenant_id:'',
            tenant_name:'',
            contact_person:'',
            corp_name:'',
            tenant_states:'',
            tenant_mdm_status:'',
            tenant_tel:'',
            tenant_email:'',
            tenant_auth_code:'',
            tenant_token:'',
            tenant_address:'',
            tenant_industry:'',
            tenant_area:'',
            tenant_code:'',
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let { orderTypes } = this.props;
        let self = this;
        let {
        } = this.state;
        return (
            <SearchPanel
                    className='csmdm_tenant-form'
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>

                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>租户id</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_id', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>租户名称</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_name', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>联系人</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('contact_person', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>企业电话</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_tel', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>认证code</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_auth_code', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>企业地址</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_address', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>所属行业</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_industry', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>企业所在地</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_area', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>企业代码</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('tenant_code', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>企业状态</Label>
                                    <Radio.RadioGroup
                                            selectedValue={this.state.tenant_states||''}
                                            {
                                            ...getFieldProps('tenant_states', {
                                                initialValue: '',
                                                onChange(value) {
                                                    self.setState({ tenant_states: value });
                                                },
                                            })
                                        }
                                    >
                                        <Radio value="" >全部</Radio>
                                            <Radio value="1">可用</Radio>
                                            <Radio value="2">不可用</Radio>
                                    </Radio.RadioGroup>
                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>主数据状态</Label>
                                    <Radio.RadioGroup
                                            selectedValue={this.state.tenant_mdm_status||''}
                                            {
                                            ...getFieldProps('tenant_mdm_status', {
                                                initialValue: '',
                                                onChange(value) {
                                                    self.setState({ tenant_mdm_status: value });
                                                },
                                            })
                                        }
                                    >
                                        <Radio value="" >全部</Radio>
                                            <Radio value="1">可用</Radio>
                                            <Radio value="2">不可用</Radio>
                                    </Radio.RadioGroup>
                                </FormItem>
                            </Col>
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(Csmdm_tenantForm)