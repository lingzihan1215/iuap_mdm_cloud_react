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
import zhCN from "rc-calendar/lib/locale/zh_CN";
import moment from "moment";

const format = "YYYY-MM-DD";

const dateInputPlaceholder = "选择日期";

function onSelect(d) {
  console.log(d);
}

function onChange(d) {
  console.log(d);
}
function disabledDate(current) {
    
    return current && current.valueOf() > Date.now();
}

class Hzlq_gy_eventForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectMaster: '',
            ondutyPerson: '',
            def10: '',
            def11: '',
            audit: '',
            def12: '',
            def13: '',
            weather: '',
            def14: '',
            def15: '',
            def16: '',
            beginTime: '',
            def17: '',
            event: '',
            def18: '',
            def19: '',
            def3: '',
            def4: '',
            creator: '',
            def1: '',
            def2: '',
            auditbz: '',
            equipment: '',
            pictureSrc: '',
            organName: '',
            def20: '',
            repairContent: '',
            auditTime: '',
            organId: '',
            location: '',
            def9: '',
            endTime: '',
            projectName: '',
            def7: '',
            projectId: '',
            def8: '',
            goal: '',
            def5: '',
            def6: '',
            rangeTime:'',
            dismissal: '',
        }
    }
    componentWillMount(){
        // 获得管养突发应急事件记录表列表数据
        actions.hzlq_gy_event.getRejList();
    }
    onChange2 (d,str) {
        console.log(d);
    }

    getOptions(data){
        let optionArr = [];
        for(let variable in data){
            optionArr.push(<Option value={data[variable].code}>{data[variable].name}</Option>)
        }
        return optionArr;
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        console.log(values)
        this.props.form.validateFields(async (err, values) => {
            values.pageIndex = this.props.pageIndex || 0;
            values.pageSize = this.props.pageSize || 10;
            values.beginTime = values.rangeTime? values.rangeTime[0].format("YYYY-MM-DD") : "";
            values.endTime = values.rangeTime?values.rangeTime[1].format("YYYY-MM-DD"):"";
            let {
            } = this.state;
            await actions.hzlq_gy_event.loadList(values);
        });


    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            projectMaster:'',
            ondutyPerson:'',
            def10:'',
            def11:'',
            audit:'',
            def12:'',
            def13:'',
            weather:'',
            def14:'',
            def15:'',
            def16:'',
            beginTime:'',
            def17:'',
            event:'',
            def18:'',
            def19:'',
            def3:'',
            def4:'',
            creator:'',
            def1:'',
            def2:'',
            auditbz:'',
            equipment:'',
            pictureSrc:'',
            organName:'',
            def20:'',
            repairContent:'',
            auditTime:'',
            organId:'',
            location:'',
            def9:'',
            endTime:'',
            projectName:'',
            def7:'',
            projectId:'',
            def8:'',
            goal:'',
            def5:'',
            def6:'',
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let { rejList } = this.props;
        let self = this;
        let {
        } = this.state;
        return (
            <SearchPanel
                    className='hzlq_gy_event-form'
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>
                            <Col md={6} xs={6}>
                                <FormItem>
                                    <Label>项目名称</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('projectName', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={6} xs={6}>
                                <FormItem>
                                    <Label>审核标识</Label>
                                    <Select
                                            {
                                            ...getFieldProps('auditbz', {
                                            initialValue: '',
                                        })
                                    }
                                    >
                                            <Option value="">请选择</Option>
                                            {this.getOptions(rejList)}
                                    </Select>


                                </FormItem>
                            </Col>
                            <Col md={8} xs={8}>
                                <FormItem>
                                    <Label>填报时间</Label>

                                    <RangePicker
                                        placeholder={'开始 ~ 结束'}
                                        dateInputPlaceholder={['开始', '结束']}
                                        showClear={true}
                                        value={this.state.value}
                                        disabledDate={disabledDate}
                                        onChange={this.onChange2}
                                        {
                                            ...getFieldProps('rangeTime', {
                                                initialValue:'',
                                                onChange:  (v)=> {
                                                    this.setState({
                                                        rangeTime: moment(v)
                                                    })
                                                }
                                            })
                                        }
                                    />
                                </FormItem>
                            </Col>        
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(Hzlq_gy_eventForm)