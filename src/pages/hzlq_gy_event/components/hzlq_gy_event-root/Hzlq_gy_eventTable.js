import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import Hzlq_gy_eventTable from '../hzlq_gy_event-table';
import Hzlq_gy_eventForm from '../hzlq_gy_event-form';

import './index.less';

/**
 * Hzlq_gy_eventRoot Component
 */
class Hzlq_gy_eventRoot  extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    /**
     *
     */
    componentWillMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData = () => {
        actions.hzlq_gy_event.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='hzlq_gy_event-root'>
                <Header title='管养突发应急事件记录表' back={true}/>
                <Hzlq_gy_eventForm { ...this.props }/>
                <Hzlq_gy_eventTable { ...this.props }/>
            </div>
        )
    }
}
export default Hzlq_gy_eventRoot;