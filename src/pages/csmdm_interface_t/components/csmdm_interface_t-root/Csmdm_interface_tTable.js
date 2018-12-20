import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import Csmdm_interface_tTable from '../csmdm_interface_t-table';
import Csmdm_interface_tForm from '../csmdm_interface_t-form';

import './index.less';

/**
 * Csmdm_interface_tRoot Component
 */
class Csmdm_interface_tRoot  extends Component {
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
        actions.csmdm_interface_t.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='csmdm_interface_t-root'>
                <Header title='云主数据-资源接口' back={true}/>
                <Csmdm_interface_tForm { ...this.props }/>
                <Csmdm_interface_tTable { ...this.props }/>
            </div>
        )
    }
}
export default Csmdm_interface_tRoot;