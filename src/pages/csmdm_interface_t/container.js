import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import Csmdm_interface_tTable from './components/csmdm_interface_t-root/Csmdm_interface_tTable';
import Csmdm_interface_tSelectTable from './components/csmdm_interface_t-root/Csmdm_interface_tSelectTable';
import Csmdm_interface_tPaginationTable from './components/csmdm_interface_t-root/Csmdm_interface_tPaginationTable';
import Csmdm_interface_tEdit from './components/csmdm_interface_t-edit/Edit';
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedCsmdm_interface_tTable = connect( state => state.csmdm_interface_t, null )(Csmdm_interface_tTable);
export const ConnectedCsmdm_interface_tSelectTable = connect( state => state.csmdm_interface_t, null )(Csmdm_interface_tSelectTable);
export const ConnectedCsmdm_interface_tPaginationTable = connect( state => state.csmdm_interface_t, null )(Csmdm_interface_tPaginationTable);
export const ConnectedCsmdm_interface_tEdit = connect( state => state.csmdm_interface_t, null )(Csmdm_interface_tEdit);
