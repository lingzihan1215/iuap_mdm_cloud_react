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

class Csmdm_interfaceForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            interface_id: '',
            interface_desc: '',
            interface_code: '',
            interface_name: '',
            interface_type: '',
            interface_status: '',
        }
    }
    componentWillMount(){
        // 获得云主数据-资源接口列表数据
        actions.csmdm_interface.getOrderTypes();
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        this.props.form.validateFields(async (err, values) => {
            // values.pageIndex = this.props.pageIndex || 0;
            values.pageIndex = 0;//查询操作后从第一页开始显示
            values.pageSize = this.props.pageSize || 10;

            //设置搜索参数
            actions.csmdm_interface.updateState({
                searchParam:values
            })

            await actions.csmdm_interface.loadList(values);
        });


    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            interface_id:'',
            interface_desc:'',
            interface_code:'',
            interface_name:'',
            interface_type:'',
            interface_status:'',
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
                    className='csmdm_interface-form'
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>

                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>接口编码</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('interface_code', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>接口名称</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('interface_name', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>接口类型</Label>
                                    <Select
                                            {
                                            ...getFieldProps('interface_type', {
                                            initialValue: '',
                                        })
                                    }
                                    >
                                            <Option value="">请选择</Option>
                                                <Option value="1">客商</Option>
                                                <Option value="2">银行</Option>
                                    </Select>

                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>接口状态</Label>
                                    <Radio.RadioGroup
                                            selectedValue={this.state.interface_status||''}
                                            {
                                            ...getFieldProps('interface_status', {
                                                initialValue: '',
                                                onChange(value) {
                                                    self.setState({ interface_status: value });
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

export default Form.createForm()(Csmdm_interfaceForm)