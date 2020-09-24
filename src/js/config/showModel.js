function showModelName(data) { // 资产状态
  if (data.assetsStatus == 0) {
    data.assetsStatus = '闲置';
  } else if (data.assetsStatus == 1) {
    data.assetsStatus = '故障';
  } else if (data.assetsStatus == 2) {
    data.assetsStatus = '报废';
  } else if (data.assetsStatus == 3) {
    data.assetsStatus = '在用';
  } else {
    data.assetsStatus = '缺失';
  }
  // 取得方式
  if (data.acquisitionMethod == '0') {
    data.acquisitionMethod = '新购';
  } else if (data.acquisitionMethod == '1') {
    data.acquisitionMethod = '调拨';
  } else if (data.acquisitionMethod == '2') {
    data.acquisitionMethod = '接受捐赠';
  } else if (data.acquisitionMethod == '3') {
    data.acquisitionMethod = '自建';
  } else if (data.acquisitionMethod == '4') {
    data.acquisitionMethod = '置换';
  } else if (data.acquisitionMethod == '5') {
    data.acquisitionMethod = '盘盈';
  } else {
    data.acquisitionMethod = '其他';
  }
  // 采购组织形式
  if (data.procurementOrganizationForm == '0') {
    data.procurementOrganizationForm = '政府集中采购';
  } else if (data.procurementOrganizationForm == '1') {
    data.procurementOrganizationForm = '部门集中采购';
  } else if (data.procurementOrganizationForm == '2') {
    data.procurementOrganizationForm = '分散采购';
  } else {
    data.procurementOrganizationForm = '其他';
  }
  // 持证人
  if (data.holder == '0') {
    data.holder = '本单位';
  } else {
    data.holder = '非本单位';
  }
  // 价值类型
  if (data.priceType == '0') {
    data.priceType = '原价';
  } else if (data.priceType == '1') {
    data.priceType = '暂估价';
  } else if (data.priceType == '2') {
    data.priceType = '重置价';
  } else if (data.priceType == '3') {
    data.priceType = '评估价';
  } else {
    data.priceType = '名义金额';
  }

  // 价值类型
  if (data.averagePrice == '0') {
    data.averagePrice = '原价';
  } else if (data.averagePrice == '1') {
    data.averagePrice = '暂估价';
  } else if (data.averagePrice == '2') {
    data.averagePrice = '重置价';
  } else if (data.averagePrice == '3') {
    data.averagePrice = '评估价';
  } else {
    data.averagePrice = '名义金额';
  }
  // 财务入账状态
  if (data.financialType == '0') {
    data.financialType = '已入账';
  }
  if (data.financialType == '1') {
    data.financialType = '未入账';
  }
  // 折旧状态
  if (data.depreciationStatus == '0') {
    data.depreciationStatus = '提折旧';
  } else if (data.depreciationStatus == '1') {
    data.depreciationStatus = '不提折旧';
  } else {
    data.depreciationStatus = '已完成折旧';
  }
  // 摊销状态
  if (data.distributionStatus == '0') {
    data.distributionStatus = '提折旧';
  } else if (data.distributionStatus == '1') {
    data.distributionStatus = '不提折旧';
  } else {
    data.distributionStatus = '已完成折旧';
  }

  // 编制情况
  if (data.preparationSituation == '0') {
    data.preparationSituation = '在编';
  } else if (data.preparationSituation == '1') {
    data.preparationSituation = '不在编';
  } else {
    data.preparationSituation = '未核定车编';
  }
  // 车辆行驶证
  if (data.drivingLicense == '0') {
    data.drivingLicense = '微型车';
  } else if (data.drivingLicense == '1') {
    data.drivingLicense = '小型车';
  } else if (data.drivingLicense == '2') {
    data.drivingLicense = '紧凑型车';
  } else if (data.drivingLicense == '3') {
    data.drivingLicense = '中型车';
  } else if (data.drivingLicense == '4') {
    data.drivingLicense = '中大型';
  } else if (data.drivingLicense == '5') {
    data.drivingLicense = '豪华车';
  }

  // 持证人
  if (data.licensee == '0') {
    data.licensee = '本单位';
  } else if (data.licensee == '1') {
    data.licensee = '非本单位';
  }

  // 汽车排量
  if (data.exhaustVolume == '0') {
    data.exhaustVolume = '1.6(含)升以下';
  } else if (data.exhaustVolume == '1') {
    data.exhaustVolume = '1.6~1.8(含)升';
  } else if (data.exhaustVolume == '2') {
    data.exhaustVolume = '2.0~2.5(含)升';
  } else if (data.exhaustVolume == '3') {
    data.exhaustVolume = '2.5(含)升以上';
  } else if (data.exhaustVolume == '4') {
    data.exhaustVolume = '新能源';
  } else if (data.exhaustVolume == '5') {
    data.exhaustVolume = '柴油';
  }

  // 建筑结构
  if (data.buildingStructure == '0') {
    data.buildingStructure = '钢结构';
  } else if (data.buildingStructure == '1') {
    data.buildingStructure = '钢筋混凝土结构';
  } else if (data.buildingStructure == '2') {
    data.buildingStructure = '砖混结构';
  } else if (data.buildingStructure == '3') {
    data.buildingStructure = '砖本结构';
  } else if (data.buildingStructure == '4') {
    data.buildingStructure = '简易房';
  } else if (data.buildingStructure == '5') {
    data.buildingStructure = '其他';
  }

  // 权属性质
  if (data.ownershipNature == '0') {
    data.ownershipNature = '国有';
  } else if (data.ownershipNature == '1') {
    data.ownershipNature = '集体';
  }
  // 设备用途
  if (data.facilityUse == '0') {
    data.facilityUse = '办公';
  } else if (data.facilityUse == '1') {
    data.facilityUse = '教学';
  } else if (data.facilityUse == '2') {
    data.facilityUse = '培训';
  } else if (data.facilityUse == '3') {
    data.facilityUse = '执法';
  } else if (data.facilityUse == '4') {
    data.facilityUse = '窗口';
  } else if (data.facilityUse == '5') {
    data.facilityUse = '专用';
  } else {
    data.facilityUse = '其他';
  }
  // 产权形式
  if (data.formOfProperty == '0') {
    data.formOfProperty = '有产权';
  } else if (data.formOfProperty == '1') {
    data.formOfProperty = '无产权';
  } else {
    data.formOfProperty = '产权待界定';
  }
  // 使用权类型
  if (data.userType == '0') {
    data.userType = '出让';
  } else if (data.userType == '1') {
    data.userType = '划拨';
  } else if (data.userType == '2') {
    data.userType = '租赁';
  } else {
    data.userType = '其他';
  }

  // 土地级次
  if (data.landLevel == '0') {
    data.landLevel = '一级';
  } else if (data.landLevel == '1') {
    data.landLevel = '二级';
  } else {
    data.landLevel = '三级';
  }
  // 文物等级
  if (data.culturalRelicLevel == '0') {
    data.culturalRelicLevel = '一级';
  } else if (data.culturalRelicLevel == '1') {
    data.culturalRelicLevel = '二级';
  } else if (data.culturalRelicLevel == '2') {
    data.culturalRelicLevel = '三级';
  } else {
    data.culturalRelicLevel = '一般';
  }
  return data;
}

export default { showModelName };
