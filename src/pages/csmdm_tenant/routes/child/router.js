import React from 'react'
import { Route } from 'mirrorx'

// 导入节点

import {
    ConnectedCsmdm_tenantPaginationTable,
    ConnectedCsmdm_tenantEdit,
} from '../../container'



/**
 * 路由说明：
 * 1、单表【search-table】：
 *      simple-table：form+最简单表格
 *      pagination-table：form+综合表格功能
 * 6、参照功能示例【ref-exmaple】：
 * 7、新节点主子表【master-table】
 */
export default ({ match }) => (
    <div className="templates-route">

        {/*配置根路由记载节点*/}
        {<Route exact path={'/'} component={ConnectedCsmdm_tenantPaginationTable} />}

        {/*配置节点路由*/}
        <Route  path={`${match.url}Csmdm_tenant-table`} component={ConnectedCsmdm_tenantPaginationTable} />
        <Route  path={`${match.url}Csmdm_tenant-edit`} component={ConnectedCsmdm_tenantEdit} />
    </div>
)