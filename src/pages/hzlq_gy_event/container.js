import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import Hzlq_gy_eventTable from './components/hzlq_gy_event-root/Hzlq_gy_eventTable';
import Hzlq_gy_eventSelectTable from './components/hzlq_gy_event-root/Hzlq_gy_eventSelectTable';
import Hzlq_gy_eventPaginationTable from './components/hzlq_gy_event-root/Hzlq_gy_eventPaginationTable';
import Hzlq_gy_eventEdit from './components/hzlq_gy_event-edit/Edit';
import Hzlq_gy_eventBpmChart from './components/hzlq_gy_event-bpm-chart'
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedHzlq_gy_eventTable = connect( state => state.hzlq_gy_event, null )(Hzlq_gy_eventTable);
export const ConnectedHzlq_gy_eventSelectTable = connect( state => state.hzlq_gy_event, null )(Hzlq_gy_eventSelectTable);
export const ConnectedHzlq_gy_eventPaginationTable = connect( state => state.hzlq_gy_event, null )(Hzlq_gy_eventPaginationTable);
export const ConnectedHzlq_gy_eventEdit = connect( state => state.hzlq_gy_event, null )(Hzlq_gy_eventEdit);
export const ConnectedHzlq_gy_eventBpmChart = connect( state => state.hzlq_gy_event, null )(Hzlq_gy_eventBpmChart);
