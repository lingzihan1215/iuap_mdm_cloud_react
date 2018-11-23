import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import Csmdm_interfaceTable from './components/csmdm_interface-root/Csmdm_interfaceTable';
import Csmdm_interfaceSelectTable from './components/csmdm_interface-root/Csmdm_interfaceSelectTable';
import Csmdm_interfacePaginationTable from './components/csmdm_interface-root/Csmdm_interfacePaginationTable';
import Csmdm_interfaceEdit from './components/csmdm_interface-edit/Edit';
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedCsmdm_interfaceTable = connect( state => state.csmdm_interface, null )(Csmdm_interfaceTable);
export const ConnectedCsmdm_interfaceSelectTable = connect( state => state.csmdm_interface, null )(Csmdm_interfaceSelectTable);
export const ConnectedCsmdm_interfacePaginationTable = connect( state => state.csmdm_interface, null )(Csmdm_interfacePaginationTable);
export const ConnectedCsmdm_interfaceEdit = connect( state => state.csmdm_interface, null )(Csmdm_interfaceEdit);
