import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import Csmdm_interfaceTable from '../csmdm_interface-table';
import Csmdm_interfaceForm from '../csmdm_interface-form';

import './index.less';

/**
 * Csmdm_interfaceRoot Component
 */
class Csmdm_interfaceRoot  extends Component {
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
        actions.csmdm_interface.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='csmdm_interface-root'>
                <Header title='云主数据-资源接口' back={true}/>
                <Csmdm_interfaceForm { ...this.props }/>
                <Csmdm_interfaceTable { ...this.props }/>
            </div>
        )
    }
}
export default Csmdm_interfaceRoot;