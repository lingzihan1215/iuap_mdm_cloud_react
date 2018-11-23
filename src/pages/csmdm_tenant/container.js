import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import Csmdm_tenantTable from './components/csmdm_tenant-root/Csmdm_tenantTable';
import Csmdm_tenantSelectTable from './components/csmdm_tenant-root/Csmdm_tenantSelectTable';
import Csmdm_tenantPaginationTable from './components/csmdm_tenant-root/Csmdm_tenantPaginationTable';
import Csmdm_tenantEdit from './components/csmdm_tenant-edit/Edit';
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedCsmdm_tenantTable = connect( state => state.csmdm_tenant, null )(Csmdm_tenantTable);
export const ConnectedCsmdm_tenantSelectTable = connect( state => state.csmdm_tenant, null )(Csmdm_tenantSelectTable);
export const ConnectedCsmdm_tenantPaginationTable = connect( state => state.csmdm_tenant, null )(Csmdm_tenantPaginationTable);
export const ConnectedCsmdm_tenantEdit = connect( state => state.csmdm_tenant, null )(Csmdm_tenantEdit);
