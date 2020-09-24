/* eslint-disable space-before-function-paren */
const fullMenus = [
    {
        title: '购置管理',
        key: 'Purchase',
        icon: 'icon-layers',
        children: [
            {
                title: '采购计划',
                key: 'purchasePlan'
            }, {
                title: '采购申请',
                key: 'purchaseApplication'
            }, {
                title: '资产验收',
                key: 'assetsAcceptance'
            }
        ]
    },
    {
        title: '资产管理',
        key: 'Assets',
        icon: 'icon-server',
        children: [
            {
                title: '资产信息',
                key: 'assetInformation'
            },
            {
                title: '资产盘点',
                key: 'assetInventory'
            },
            {
                title: '我的盘点',
                key: 'myInventory'
            },
            // {
            //     title: '标签打印',
            //     key: 'labelPrinting'
            // }, 
            // {
            //     title: '标签市场',
            //     key: 'labelMarket'
            // },
             {
                title: '供应商管理',
                key: 'supplierManagement'
            }
        ]
    },
    {
        title: '资产处置',
        key: 'Disposal',
        icon: 'icon-paper',
        children: [
            {
                title: '领用归还',
                key: 'useReturn'
            }, {
                title: '资产报废',
                key: 'assetRetirement'
            }, {
                title: '资产移交',
                key: 'transferAssets'
            }, 
            // {
            //     title: '部门变更',
            //     key: 'changeDepartment'
            // }
        ]
    },
    {
        title: '审批管理',
        key: 'Approval',
        icon: 'icon-square-check',
        children: [
            {
                title: '采购计划审批',
                key: 'purchasePlanApproval'
            }, {
                title: '采购申请审批',
                key: 'purchaseApplicationApproval'
            }, {
                title: '资产报废审批',
                key: 'assetRetirementApproval'
            }
        ]
    }, {
        title: '维修管理',
        key: 'Repair',
        icon: 'icon-unlock',
        children: [
            {
                title: '资产报修',
                key: 'assetsRepair'
            }, {
                title: '报修处理',
                key: 'repairProcess'
            }, {
                title: '我的工单',
                key: 'myOrder'
            }, {
                title: '外委维修',
                key: 'subContractorRepair'
            }
        ]
    }, {
        title: '资料库',
        key: 'Library',
        icon: 'icon-book',
        children: [
            {
                title: '资产资料',
                key: 'assetData'
            }, {
                title: '维修经验',
                key: 'repairExperience'
            }
        ]
    }, {
        title: '统计分析',
        key: 'Statistics',
        icon: 'icon-bar-graph-2',
        children: [
            {
                title: '资产统计',
                key: 'assetStatistics'
            }, {
                title: '维修统计',
                key: 'repairStatistics'
            }
        ]
    }, {
        title: '系统设置',
        key: 'SysSetting',
        icon: 'icon-cog',
        children: [
            {
                title: '用户管理',
                key: 'userManage'
            },
            {
                title: '部门管理',
                key: 'deptManage'
            },
            {
                title: '角色管理',
                key: 'roleManage'
            },
            {
                title: '模块管理',
                key: 'moduleManage'
            }, {
                title: '按钮管理',
                key: 'btnManage'
            }, {
                title: '字典管理',
                key: 'dictManage'
            }, {
                title: '操作日志',
                key: 'operationLog'
            }, {
                title: '登录日志',
                key: 'loginLog'
            }, {
                title: '数据迁移',
                key: 'dataMigration'
            }, 
            // {
            //     title: '系统公告',
            //     key: 'notice'
            // }
        ]
    }
];

const getMenus = function (menuIdList = []) {
    return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
    let configMenu = [];
    for (let menu of menus) {
        let m = Utils.copy(menu);
        if (menuIdList.indexOf(m.key) > -1) {
            configMenu.push(m);
        }
        if (menu.children && menu.children.length) {
            m.children = getAuthMenu(menu.children, menuIdList);
        }
    }
    return configMenu;
};

const getKeys = function (menus) {
    let keys = [];
    for (let menu of menus) {
        keys.push(menu.key);
        if (menu.children && menu.children.length) {
            keys.push(...getKeys(menu.children));
        }
    }
    return keys;
};

let fullMenuKeys = getKeys(fullMenus);

const isAuthPage = function (name) {
    let menus = G.get('SYS_MENUS') || [];
    if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
        return false;
    }
    return true;
};

export {
    getMenus,
    fullMenus,
    fullMenuKeys,
    isAuthPage
};
