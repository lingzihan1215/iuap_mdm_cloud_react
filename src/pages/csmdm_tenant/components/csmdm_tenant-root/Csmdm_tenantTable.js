import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import Csmdm_tenantTable from '../csmdm_tenant-table';
import Csmdm_tenantForm from '../csmdm_tenant-form';

import './index.less';

/**
 * Csmdm_tenantRoot Component
 */
class Csmdm_tenantRoot  extends Component {
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
        actions.csmdm_tenant.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='csmdm_tenant-root'>
                <Header title='云主数据-租户' back={true}/>
                <Csmdm_tenantForm { ...this.props }/>
                <Csmdm_tenantTable { ...this.props }/>
            </div>
        )
    }
}
export default Csmdm_tenantRoot;