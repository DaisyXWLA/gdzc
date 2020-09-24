export default [
  {
    path: '/purchasePlan',
    name: 'purchasePlan',
    component: resolve => require(['components/purchase/purchase_plan/plan'], resolve),
    meta: { title: '采购计划' }
  },
  {
    path: '/planAdd',
    name: 'planAdd',
    component: resolve => require(['components/purchase/purchase_plan/plan_add'], resolve),
    meta: { title: '添加计划' }
  },
  {
    path: '/planDetail',
    name: 'planDetail',
    component: resolve => require(['components/purchase/purchase_plan/plan_detail'], resolve),
    meta: { title: '计划详情' }
  },
  {
    path: '/approvalDetail',
    name: 'approvalDetail',
    component: resolve => require(['components/purchase/purchase_plan/approval_detail'], resolve),
    meta: { title: '审批详情' }
  },
  {
    path: '/purchaseApplication',
    name: 'purchaseApplication',
    component: resolve => require(['components/purchase/purchase_application/application'], resolve),
    meta: { title: '采购申请' }
  },
  {
    path: '/applicationAdd',
    name: 'applicationAdd',
    component: resolve => require(['components/purchase/purchase_application/application_add'], resolve),
    meta: { title: '添加申请' }
  },
  {
    path: '/applicationDetail',
    name: 'applicationDetail',
    component: resolve => require(['components/purchase/purchase_application/application_detail'], resolve),
    meta: { title: '申请详情' }
  },
  {
    path: '/assetsAcceptance',
    name: 'assetsAcceptance',
    component: resolve => require(['components/purchase/assets_acceptance/assets_acceptance'], resolve),
    meta: { title: '资产验收' }
  },
  {
    path: '/purchaseAcceptance/:id',
    name: 'purchaseAcceptance',
    component: resolve => require(['components/purchase/assets_acceptance/purchase_acceptance'], resolve),
    meta: { title: '验收详情' }
  },
  {
    path: '/assetInformation',
    name: 'assetInformation',
    component: resolve => require(['components/assets/asset_information/asset_information'], resolve),
    meta: { title: '资产信息' }
  },
  {
    path: '/assetsAdd',
    name: 'assetsAdd',
    component: resolve => require(['components/assets/asset_information/assets_add/assets_add'], resolve),
    meta: { title: '资产新增' }
  },
  {
    path: '/assetsModify',
    name: 'assetsModify',
    component: resolve => require(['components/assets/asset_information/assets_add/assets_modify'], resolve),
    meta: { title: '资产修改' }
  },
  {
    path: '/assetsDetail/:id/:Category/:CategoryName',
    name: 'assetsDetail',
    component: resolve => require(['components/assets/asset_information/assets_add/assets_detail'], resolve),
    meta: { title: '资产详情' }
  },
  // {
  //     path: '/selectAssets',
  //     name: 'selectAssets',
  //     component: resolve => require(['components/assets/components/select_assets/select_assets'], resolve),
  //     meta: { title: '选择资产' }
  // },
  {
    path: '/land',
    name: 'land',
    component: resolve => require(['components/assets/asset_information/new_assets/land'], resolve),
    meta: { title: '土地' }
  },
  {
    path: '/house',
    name: 'house',
    component: resolve => require(['components/assets/asset_information/new_assets/house'], resolve),
    meta: { title: '房屋' }
  },
  {
    path: '/build',
    name: 'build',
    component: resolve => require(['components/assets/asset_information/new_assets/build'], resolve),
    meta: { title: '构建物' }
  },
  {
    path: '/generalEquipment',
    name: 'generalEquipment',
    component: resolve => require(['components/assets/asset_information/new_assets/general_equipment'], resolve),
    meta: { title: '通用设备' }
  },
  {
    path: '/vehicle',
    name: 'vehicle',
    component: resolve => require(['components/assets/asset_information/new_assets/vehicle'], resolve),
    meta: { title: '车辆' }
  },
  {
    path: '/specializedEquipment',
    name: 'specializedEquipment',
    component: resolve => require(['components/assets/asset_information/new_assets/specialized_equipment'], resolve),
    meta: { title: '专用设备' }
  },
  {
    path: '/culturalRelic',
    name: 'culturalRelic',
    component: resolve => require(['components/assets/asset_information/new_assets/cultural_relic'], resolve),
    meta: { title: '文物和陈列品' }
  },
  {
    path: '/booksFile',
    name: 'booksFile',
    component: resolve => require(['components/assets/asset_information/new_assets/books_file'], resolve),
    meta: { title: '图书档案' }
  },
  {
    path: '/furniture',
    name: 'furniture',
    component: resolve => require(['components/assets/asset_information/new_assets/furniture'], resolve),
    meta: { title: '家具用具装具' }
  },
  {
    path: '/specialPlantAnimal',
    name: 'specialPlantAnimal',
    component: resolve => require(['components/assets/asset_information/new_assets/special_plant_animal'], resolve),
    meta: { title: '特种动植物' }
  },
  {
    path: '/patents',
    name: 'patents',
    component: resolve => require(['components/assets/asset_information/new_assets/patents'], resolve),
    meta: { title: '无形资产专利' }
  },
  {
    path: '/generic',
    name: 'generic',
    component: resolve => require(['components/assets/asset_information/new_assets/generic'], resolve),
    meta: { title: '无形资产非专利技术' }
  },
  {
    path: '/copyright',
    name: 'copyright',
    component: resolve => require(['components/assets/asset_information/new_assets/copyright'], resolve),
    meta: { title: '无形资产著作权' }
  },
  {
    path: '/resource',
    name: 'resource',
    component: resolve => require(['components/assets/asset_information/new_assets/resource'], resolve),
    meta: { title: '无形资产资源资质' }
  },
  {
    path: '/brand',
    name: 'brand',
    component: resolve => require(['components/assets/asset_information/new_assets/brand'], resolve),
    meta: { title: '无形资产商标' }
  },
  {
    path: '/information',
    name: 'information',
    component: resolve => require(['components/assets/asset_information/new_assets/information'], resolve),
    meta: { title: '无形资产信息数据' }
  },
  {
    path: '/mark',
    name: 'mark',
    component: resolve => require(['components/assets/asset_information/new_assets/mark'], resolve),
    meta: { title: '无形资产商号' }
  },
  {
    path: '/goodwill',
    name: 'goodwill',
    component: resolve => require(['components/assets/asset_information/new_assets/goodwill'], resolve),
    meta: { title: '无形资产商誉' }
  },
  {
    path: '/assetInventory',
    name: 'assetInventory',
    component: resolve => require(['components/assets/asset_inventory/asset_inventory'], resolve),
    meta: { title: '资产盘点' }
  },
  {
    path: '/inventoryAdd',
    name: 'inventoryAdd',
    component: resolve => require(['components/assets/asset_inventory/inventory_add'], resolve),
    meta: { title: '新增盘点' }
  },
  {
    path: '/inventoryDetail/:id',
    name: 'inventoryDetail',
    component: resolve => require(['components/assets/asset_inventory/inventory_detail'], resolve),
    meta: { title: '盘点详情' }
  },
  {
    path: '/myInventory',
    name: 'myInventory',
    component: resolve => require(['components/assets/my_inventory/my_inventory'], resolve),
    meta: { title: '我的盘点' }
  },
  {
    path: '/startInventory',
    name: 'startInventory',
    component: resolve => require(['components/assets/my_inventory/start_inventory'], resolve),
    meta: { title: '开始盘点' }
  },
  {
    path: '/labelPrinting',
    name: 'labelPrinting',
    component: resolve => require(['components/assets/label_printing/label_printing'], resolve),
    meta: { title: '标签打印' }
  },
  {
    path: '/labelMarket',
    name: 'labelMarket',
    component: resolve => require(['components/assets/label_market/label_market'], resolve),
    meta: { title: '标签市场' }
  },
  {
    path: '/supplierManagement',
    name: 'supplierManagement',
    component: resolve => require(['components/assets/supplier_management/supplier_management'], resolve),
    meta: { title: '供应商管理' }
  },
  {
    path: '/supplierAdd',
    name: 'supplierAdd',
    component: resolve => require(['components/assets/supplier_management/supplier_add'], resolve),
    meta: { title: '新增供应商' }
  },
  {
    path: '/useReturn',
    name: 'useReturn',
    component: resolve => require(['components/disposal/use_return/use_return'], resolve),
    meta: { title: '领用归还' }
  },
  {
    path: '/useAdd',
    name: 'useAdd',
    component: resolve => require(['components/disposal/use_return/use_add'], resolve),
    meta: { title: '新增领用' }
  },
  {
    path: '/return',
    name: 'return',
    component: resolve => require(['components/disposal/use_return/return'], resolve),
    meta: { title: '归还' }
  },
  {
    path: '/useReturnDetail/:id',
    name: 'useReturnDetail',
    component: resolve => require(['components/disposal/use_return/use_return_detail'], resolve),
    meta: { title: '领用归还详情' }
  },
  {
    path: '/assetRetirement',
    name: 'assetRetirement',
    component: resolve => require(['components/disposal/asset_retirement/asset_retirement'], resolve),
    meta: { title: '资产报废' }
  },
  {
    path: '/retirementAdd',
    name: 'retirementAdd',
    component: resolve => require(['components/disposal/asset_retirement/retirement_add'], resolve),
    meta: { title: '新增报废' }
  },
  {
    path: '/retirementDetail',
    name: 'retirementDetail',
    component: resolve => require(['components/disposal/asset_retirement/retirement_detail'], resolve),
    meta: { title: '报废详情' }
  },
  {
    path: '/transferAssets',
    name: 'transferAssets',
    component: resolve => require(['components/disposal/transfer_assets/transfer_assets'], resolve),
    meta: { title: '资产移交' }
  },
  {
    path: '/transferAssetsDetail/:id',
    name: 'transferAssetsDetail',
    component: resolve => require(['components/disposal/transfer_assets/transfer_assets_detail'], resolve),
    meta: { title: '资产移交详情' }
  },
  {
    path: '/transferAdd',
    name: 'transferAdd',
    component: resolve => require(['components/disposal/transfer_assets/transfer_add'], resolve),
    meta: { title: '新增移交' }
  },
  {
    path: '/changeDepartment',
    name: 'changeDepartment',
    component: resolve => require(['components/disposal/change_department/change_department'], resolve),
    meta: { title: '部门变更' }
  },
  {
    path: '/purchasePlanApproval',
    name: 'purchasePlanApproval',
    component: resolve => require(['components/approval/purchase_plan_approval/purchase_plan_approval'], resolve),
    meta: { title: '采购计划审批' }
  },
  {
    path: '/planApprovalDetail/:id',
    name: 'planApprovalDetail',
    component: resolve => require(['components/approval/purchase_plan_approval/plan_approval_detail'], resolve),
    meta: { title: '审批详情' }
  },
  {
    path: '/approvalDetail',
    name: 'approvalDetail',
    component: resolve => require(['components/approval/purchase_plan_approval/approval_detail'], resolve),
    meta: { title: '采购计划审批详情' }
  },
  {
    path: '/purchaseApplicationApproval',
    name: 'purchaseApplicationApproval',
    component: resolve => require(['components/approval/purchase_application_approval/purchase_application_approval'], resolve),
    meta: { title: '采购申请审批' }
  },
  {
    path: '/applicationApprovalDetail',
    name: 'applicationApprovalDetail',
    component: resolve => require(['components/approval/purchase_application_approval/application_approval_detail'], resolve),
    meta: { title: '采购申请审批详情' }
  },
  {
    path: '/assetRetirementApproval',
    name: 'assetRetirementApproval',
    component: resolve => require(['components/approval/asset_retirement_approval/asset_retirement_approval'], resolve),
    meta: { title: '资产报废审批' }
  },
  {
    path: '/retirementApprovalDetail/:id',
    name: 'retirementApprovalDetail',
    component: resolve => require(['components/approval/asset_retirement_approval/retirement_approval_detail'], resolve),
    meta: { title: '报废审批详情' }
  },
  {
    path: '/approvalDetail',
    name: 'approvalDetail',
    component: resolve => require(['components/approval/asset_retirement_approval/approval_detail'], resolve),
    meta: { title: '审批详情' }
  },
  {
    path: '/transferApprovalDetail',
    name: 'transferApprovalDetail',
    component: resolve => require(['components/approval/transfer_assets_approval/transfer_approval_detail'], resolve),
    meta: { title: '移交审批详情' }
  },
  {
    path: '/approvalDetail',
    name: 'approvalDetail',
    component: resolve => require(['components/approval/transfer_assets_approval/approval_detail'], resolve),
    meta: { title: '审批详情' }
  },
  {
    path: '/assetsRepair',
    name: 'assetsRepair',
    component: resolve => require(['components/repair/assets_repair/assets_repair'], resolve),
    meta: { title: '资产报修' }
  },
  {
    path: '/assetsRepairDetail/:id',
    name: 'assetsRepairDetail',
    component: resolve => require(['components/repair/assets_repair/assets_repair_detail'], resolve),
    meta: { title: '资产报修详情' }
  },
  {
    path: '/assignRepair',
    name: 'assignRepair',
    component: resolve => require(['components/repair/repair_process/assign_repair'], resolve),
    meta: { title: '分配报修' }
  },
  {
    path: '/repairAdd',
    name: 'repairAdd',
    component: resolve => require(['components/repair/assets_repair/repair_add'], resolve),
    meta: { title: '新增报修' }
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: resolve => require(['components/repair/my_order/my_order'], resolve),
    meta: { title: '我的工单' }
  },
  {
    path: '/myOrderDetail/:id',
    name: 'myOrderDetail',
    component: resolve => require(['components/repair/my_order/my_order_detail'], resolve),
    meta: { title: '我的工单详情' }
  },
  {
    path: '/repairProcess',
    name: 'repairProcess',
    component: resolve => require(['components/repair/repair_process/repair_process'], resolve),
    meta: { title: '报修处理' }
  },
  {
    path: '/repairProcessDetail/:id',
    name: 'repairProcessDetail',
    component: resolve => require(['components/repair/repair_process/repair_process_detail'], resolve),
    meta: { title: '报修处理详情' }
  },
  {
    path: '/subContractorRepair',
    name: 'subContractorRepair',
    component: resolve => require(['components/repair/subContractor_repair/subContractor_repair'], resolve),
    meta: { title: '外委维修' }
  },
  {
    path: '/subContractorRepairDetail/:id',
    name: 'subContractorRepairDetail',
    component: resolve => require(['components/repair/subContractor_repair/subContractor_repair_detail'], resolve),
    meta: { title: '外委维修详情' }
  },
  {
    path: '/subContractorRepairAdd',
    name: 'subContractorRepairAdd',
    component: resolve => require(['components/repair/subContractor_repair/subContractor_repair_add'], resolve),
    meta: { title: '新增外委维修' }
  },
  {
    path: '/assetData',
    name: 'assetData',
    component: resolve => require(['components/library/asset_data/asset_data'], resolve),
    meta: { title: '资产资料' }
  },
  {
    path: '/information',
    name: 'information',
    component: resolve => require(['components/library/asset_data/information'], resolve),
    meta: { title: '资料信息' }
  },
  {
    path: '/repairExperience',
    name: 'repairExperience',
    component: resolve => require(['components/library/repair_experience/repair_experience'], resolve),
    meta: { title: '维修经验' }
  },
  {
    path: '/repairExperienceDetail/:id',
    name: 'repairExperienceDetail',
    component: resolve => require(['components/library/repair_experience/repair_experience_detail'], resolve),
    meta: { title: '维修经验详情' }
  },
  {
    path: '/experienceAdd',
    name: 'experienceAdd',
    component: resolve => require(['components/library/repair_experience/experience_add'], resolve),
    meta: { title: '新增经验' }
  },
  {
    path: '/experienceModify',
    name: 'experienceModify',
    component: resolve => require(['components/library/repair_experience/experience_modify'], resolve),
    meta: { title: '修改经验' }
  },
  {
    path: '/assetStatistics',
    name: 'assetStatistics',
    component: resolve => require(['components/statistics/asset_statistics'], resolve),
    meta: { title: '资产统计' }
  },
  {
    path: '/repairStatistics',
    name: 'repairStatistics',
    component: resolve => require(['components/statistics/repair_statistics'], resolve),
    meta: { title: '维修统计' }
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: resolve => require(['components/syssetting/userManage/user-list'], resolve),
    meta: { title: '用户管理' }
  },
  {
    path: '/deptManage',
    name: 'deptManage',
    component: resolve => require(['components/syssetting/deptManage/dept-list'], resolve),
    meta: { title: '部门管理' }
  },
  {
    path: '/roleManage',
    name: 'roleManage',
    component: resolve => require(['components/syssetting/roleManage/role-list'], resolve),
    meta: { title: '角色管理' }
  },
  {
    path: '/rolemember-list',
    name: 'rolemember-list',
    component: resolve => require(['components/syssetting/roleManage/rolemember-list'], resolve),
    meta: { title: '角色成员' }
  },
  {
    path: '/moduleManage',
    name: 'moduleManage',
    component: resolve => require(['components/syssetting/moduleManage/module-list'], resolve),
    meta: { title: '模块管理' }
  },
  {
    path: '/btnManage',
    name: 'btnManage',
    component: resolve => require(['components/syssetting/btnManage/btn-list'], resolve),
    meta: { title: '按钮管理' }
  },
  {
    path: '/dictManage',
    name: 'dictManage',
    component: resolve => require(['components/syssetting/dictManage/dict-list'], resolve),
    meta: { title: '字典管理' }
  },
  {
    path: '/operationLog',
    name: 'operationLog',
    component: resolve => require(['components/syssetting/operationLog/operationLog-list'], resolve),
    meta: { title: '操作日志' }
  },
  {
    path: '/loginLog',
    name: 'loginLog',
    component: resolve => require(['components/syssetting/loginLog/loginlog-list'], resolve),
    meta: { title: '登录日志' }
  },
  {
    path: '/notice',
    name: 'notice',
    component: resolve => require(['components/syssetting/noticeManage/notice_list.vue'], resolve),
    meta: { title: '系统公告' }
  },
  {
    path: '/notice_detail/:dataId',
    name: 'notice_detail',
    component: resolve => require(['components/syssetting/noticeManage/components/notice_detail'], resolve),
    meta: { title: '系统公告详情' }
  },
  {
    path: '/dataMigration',
    name: 'dataMigration',
    component: resolve => require(['components/syssetting/dataMigration/data_migration'], resolve),
    meta: { title: '数据迁移' }
  }
];
