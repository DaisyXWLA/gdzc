import Ajax from './ajax';

const Request = {
    Print: {
        print(param) {
            return Ajax.postT('/print', param);
        }
    },
    User: {
        info() {
            return Ajax.get('/api/account/info');
        }
    },
    Dict: {
        get() {
            return Ajax.get('/api/dict');
        }
    },
    Home: {
        getMessageList() {
            return Ajax.get('/api/home/messages');
        }
    },
    Login: {
        login(param) {
            return Ajax.post('/oauth/token', param);
        },
        logout(param) {
            return Ajax.post('/api/logout', param);
        },
        getInfo(param) {
            return Ajax.get('/api/login/getInfo', param);
        }
    },
    ceshi: {
        List(params) {
            return Ajax.postJson('/api/assetsCategory/findAll', params);
        }
    },
    Rms: {
        List(params) {
            return Ajax.postJson('/api/rms/user/findUserList', params);
        },
        AList(params) {
            return Ajax.postJson('/api/rms/user/findList', params);
        },
        ListT(params) {
            return Ajax.postJson('/api/rms/user/findUserListT', params);
        }
    },
    ProjectInform: {
        informList(params) {
            return Ajax.postJson('/api/notification/findAll', params);
        },
        informDel(params) {
            return Ajax.postJson('/api/notification/delete', params);
        },
        informFindOne(params) {
            return Ajax.postJson('/api/notification/findOne', params);
        },
        informAdd(params) {
            return Ajax.postJson('/api/notification/save', params);
        },
        informUpdate(params) {
            return Ajax.postJson('/api/notification/update', params);
        }
    },
    userManage: {
        userAdd(params) {
            return Ajax.postJson('/api/rms/user/save', params);
        },
        userUpdate(params) {
            return Ajax.postJson('/api/rms/user/update', params);
        },
        userFindOne(params) {
            return Ajax.postJson('/api/rms/user/findOne', params);
        },
        userFindAllDepartment(params) {
            return Ajax.postJson('/api/rms/user/findAllDepartment', params);
        },
        userFindAllRole(params) {
            return Ajax.postJson('/api/rms/user/findAllRole', params);
        },
        userDelete(params) {
            return Ajax.postJson('/api/rms/user/delete', params);
        },
        userFindAll(params) {
            return Ajax.postJson('/api/rms/user/findAll', params);
        },
        userResetPassword(params) {
            return Ajax.postJson('/api/rms/user/resetPassword', params);
        },
        userImport(params) {
            return Ajax.postJson('/api/rms/import/userImport', params);
        }
    },
    deptManage: {
        departmentAdd(params) {
            return Ajax.postJson('/api/rms/department/save', params);
        },
        departmentUpdate(params) {
            return Ajax.postJson('/api/rms/department/update', params);
        },
        departmentFindOne(params) {
            return Ajax.postJson('/api/rms/department/findOne', params);
        },
        departmentFindAll(params) {
            return Ajax.postJson('/api/rms/department/findAll', params);
        },
        departmentDelete(params) {
            return Ajax.postJson('/api/rms/department/delete', params);
        },
        departmentFindAllDepartment(params) {
            return Ajax.postJson('/api/rms/department/findAllDepartment', params);
        },
        departmentImport(params) {
            return Ajax.postJson('/api/rms/import/departmentImport', params);
        }
    },
    roleManage: {
        roleAdd(params) {
            return Ajax.postJson('/api/rms/role/save', params);
        },
        roleAddUser(params) {
            return Ajax.postJson('/api/rms/role/saveRoleUser', params);
        },
        roleUpdate(params) {
            return Ajax.postJson('/api/rms/role/update', params);
        },
        roleFindOne(params) {
            return Ajax.postJson('/api/rms/role/findOne', params);
        },
        roleFindAll(params) {
            return Ajax.postJson('/api/rms/role/findAll', params);
        },
        roleFindAllUser(params) {
            return Ajax.postJson('/api/rms/role/findAllUser', params);
        },
        roleFindMembers(params) {
            return Ajax.postJson('/api/rms/role/findRoleMembers', params);
        },
        roleDelete(params) {
            return Ajax.postJson('/api/rms/role/delete', params);
        },
        modelTree(params) {
            return Ajax.postJson('/api/rms/role/findModelTree', params);
        },
        ModelBotten(params) {
            return Ajax.post('/api/rms/role/findModelBotten', params);
        },
        saveroleModelBotten(params) {
            return Ajax.post('/api/rms/role/saveroleModelBotten', params);
        },
        deleteRoleMembers(params) {
            return Ajax.postJson('/api/rms/role/deleteRoleMembers', params);
        }
    },
    moduleManage: {
        moduleAdd(params) {
            return Ajax.postJson('/api/rms/model/save', params);
        },
        moduleUpdate(params) {
            return Ajax.postJson('/api/rms/model/update', params);
        },
        moduleFindAll(params) {
            return Ajax.postJson('/api/rms/model/findAll', params);
        },
        moduleFindAllAction(params) {
            return Ajax.postJson('/api/rms/model/findAllAction', params);
        },
        moduleFindAllModule(params) {
            return Ajax.postJson('/api/rms/model/findAllModel', params);
        },
        moduleFindOne(params) {
            return Ajax.postJson('/api/rms/model/findOne', params);
        },
        moduleDelete(params) {
            return Ajax.postJson('/api/rms/model/delete', params);
        }
    },
    buttonManage: {
        buttonAdd(params) {
            return Ajax.postJson('/api/rms/action/save', params);
        },
        buttonAddGroup(params) {
            return Ajax.postJson('/api/rms/action/saveGroup', params);
        },
        buttonUpdate(params) {
            return Ajax.postJson('/api/rms/action/update', params);
        },
        buttonUpdateGroup(params) {
            return Ajax.postJson('/api/rms/action/updateGroup', params);
        },
        buttonFindAll(params) {
            return Ajax.postJson('/api/rms/action/findAll', params);
        },
        buttonFindAllGroup(params) {
            return Ajax.postJson('/api/rms/action/findAllGroup', params);
        },
        buttonFindGroupOne(params) {
            return Ajax.postJson('/api/rms/action/findGropOne', params);
        },
        buttonFindOne(params) {
            return Ajax.postJson('/api/rms/action/findOne', params);
        },
        buttonDelete(params) {
            return Ajax.postJson('/api/rms/action/delete', params);
        }
    },
    dictManage: {
        dictAdd(params) {
            return Ajax.postJson('/api/rms/dict/saveDict', params);
        },
        dictAddValue(params) {
            return Ajax.postJson('/api/rms/dict/saveDictValue', params);
        },
        dictUpdate(params) {
            return Ajax.postJson('/api/rms/dict/updateDict', params);
        },
        dictUpdateValue(params) {
            return Ajax.postJson('/api/rms/dict/updateDictValue', params);
        },
        dictFindAll(params) {
            return Ajax.postJson('/api/rms/dict/findAll', params);
        },
        dictFindAllDep(params) {
            return Ajax.postJson('/api/rms/dict/findAllDict', params);
        },
        dictFindOne(params) {
            return Ajax.postJson('/api/rms/dict/findDictOne', params);
        },
        dictFindValueOne(params) {
            return Ajax.postJson('/api/rms/dict/findDictValueOne', params);
        },
        dictDelete(params) {
            return Ajax.postJson('/api/rms/dict/delete', params);
        }
    },
    operLogManage: {
        operLogFindAll(params) {
            return Ajax.postJson('/api/rms/log/findAll', params);
        },
        operLogDelete(params) {
            return Ajax.postJson('/api/rms/log/delete', params);
        }
    },
    PurchaseAssets: {
        AddPurchaseAssets(params) {
            return Ajax.postJson('/api/purchaseAssets/save', params);
        },
        UpdatePurchaseAssets(params) {
            return Ajax.postJson('/api/purchaseAssets/update', params);
        },
        PurchaseAssetsList(params) {
            return Ajax.postJson('/api/purchaseAssets/findAll', params);
        },
        DeletePurchaseAssets(params) {
            return Ajax.postJson('/api/purchaseAssets/delete', params);
        },
        CheckPurchaseAssets(params) {
            return Ajax.postJson('/api/purchaseAssets/checkPurchaseAssets', params);
        },
        DeleteAll(params) {
            return Ajax.postJson('/api/purchaseAssets/deleteAll', params);
        }
    },
    Purchase: {
        checkPurchase(params) {
            return Ajax.postJson('/api/purchase/checkPurchase', params);
        },
        PurchaseFindOne(params) {
            return Ajax.postJson('/api/purchase/findOne', params);
        },
        PurchaseFindOneImg(params) {
            return Ajax.postJson('/api/purchase/findOneImg', params);
        },
        AddPurchase(params) {
            return Ajax.postJson('/api/purchase/save', params);
        },
        checkSavePurchase(params) {
            return Ajax.postJson('/api/purchase/checkSave', params);
        },
        PurchaseList(params) {
            return Ajax.postJson('/api/purchase/findAllPlan', params);
        },
        PurchaseAList(params) {
            return Ajax.postJson('/api/purchase/findAllApply', params);
        },
        PurchaseApList(params) {
            return Ajax.postJson('/api/purchase/findAllApproval', params);
        },
        DeletePurchase(params) {
            return Ajax.postJson('/api/purchase/delete', params);
        },
        UpdatePurchase(params) {
            return Ajax.postJson('/api/purchase/update', params);
        }
    },
    Approval: {
        Agree(params) {
            return Ajax.postJsonT('/api/purchaseApproved/success', params);
        },
        Refuse(params) {
            return Ajax.postJsonT('/api/purchaseApproved/fail', params);
        },
        List(params) {
            return Ajax.postJsonT('/api/purchaseApproved/findApprovedInfo', params);
        },
        ScrappedAgree(params) {
            return Ajax.postJson('/api/scrappedApproved/success', params);
        },
        ScrappedRefuse(params) {
            return Ajax.postJson('/api/scrappedApproved/fail', params);
        },
        ScrappedList(params) {
            return Ajax.postJson('/api/scrappedApproved/findApprovedInfo', params);
        },
        findAllPlanApproved(params) {
            return Ajax.postJson('/api/purchase/findAllPlanApproved', params);
        },
        findAllApplyApproved(params) {
            return Ajax.postJson('/api/purchase/findAllApplyApproved', params);
        },
        findAllScrappedApproved(params) {
            return Ajax.postJson('/api/scrapped/findAllScrappedApproved', params);
        }
    },
    Upload: {
        Upload(params) {
            return Ajax.postJsonT('/api/docInfo/uploadFile', params);
        },
        delete(params) {
            return Ajax.get('/api/docInfo/delete', params);
        }
    },
    pullDownList: {
        user(params) {
            return Ajax.postJsonT('/api/pullDownList/userName', params);
        },
        department(params) {
            return Ajax.postJsonT('/api/pullDownList/departmentName', params);
        },
        assetsCategory(params) {
            return Ajax.postJsonT('/api/pullDownList/assetsCategory', params);
        },
        findPullDownInfo(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownInfo', params);
        },
        findPullDownOne(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownOne', params);
        },
        findPullDownTwo(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownTwo', params);
        },
        findPullDownThree(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownThree', params);
        },
        findPullDownFour(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownFour', params);
        },
        findPullDownFive(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownFive', params);
        },
        findPullDownSix(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownSix', params);
        },
        findPullDownSeven(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownSeven', params);
        },
        findPullDownEight(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownEight', params);
        },
        findPullDownNine(params) {
            return Ajax.postJsonT('/api/pullDownList/findPullDownNine', params);
        },
        findDepartmentNameByUser(params) {
            return Ajax.postJsonT('/api/pullDownList/findDepartmentNameByUser', params);
        },
        findDepartmentAndUser(params) {
            return Ajax.postJsonT('/api/pullDownList/findDepartmentAndUser', params);
        }
    },
    Scrapped: {
        ScrappedList(params) {
            return Ajax.postJsonT('/api/scrapped/findAllScrappedAssets', params);
        },
        ScrappedAdd(params) {
            return Ajax.postJsonT('/api/scrapped/saveScrappedAssets', params);
        },
        ScrappedUpdate(params) {
            return Ajax.postJsonT('/api/scrapped/updateScrappedAssets', params);
        },
        ScrappedDel(params) {
            return Ajax.postJsonT('/api/scrapped/deleteScrappedAssets', params);
        },
        ScrappedAssetsList(params) {
            return Ajax.postJson('/api/scrapped/showScrappedAssets', params);
        },
        ScrappedFindOneImg(params) {
            return Ajax.postJson('/api/scrapped/findOneImg', params);
        },
        ScrappedFindOne(params) {
            return Ajax.postJson('/api/scrapped/findOneScrappedAssets', params);
        },
        ScrappedGetUserAndDate(params) {
            return Ajax.postJson('/api/scrapped/getUserAndDate', params);
        },
        ScrappedSelectAssetsConfirm(params) {
            return Ajax.postJson('/api/scrapped/clickAffirm', params);
        },
        ScrappedSelectAssetsCancel(params) {
            return Ajax.postJson('/api/scrapped/clickClose', params);
        },
        ScrappedSelectAssetsDelete(params) {
            return Ajax.postJson('/api/scrapped/clickDelete', params);
        },
        findAllAssets(params) {
            return Ajax.postJson('/api/scrapped/findAllAssets', params);
        },
        ScrappedFindAllDepartment(params) {
            return Ajax.postJson('/api/scrapped/findAllDepartment', params);
        },
        showUpdateAssets(params) {
            return Ajax.postJson('/api/scrapped/showUpdateAssets', params);
        },
        updateAssets(params) {
            return Ajax.postJson('/api/scrapped/updateAssets', params);
        }
    },
    Assets: {
        cache(params) {
            return Ajax.postJsonT('/api/assets/savePrinting', params);
        },
        cacheK(params) {
            return Ajax.postJsonT('/api/assets/savePrintingK', params);
        },
        findCache() {
            return Ajax.postJsonT('/api/assets/findPrinting');
        },
        findCacheK() {
            return Ajax.postJsonT('/api/assets/findPrintingK');
        },
        cleanCache() {
            return Ajax.postJsonT('/api/assets/cleanPrinting');
        },
        cleanCacheK() {
            return Ajax.postJsonT('/api/assets/cleanPrintingK');
        },

        AssetsList(params) {
            return Ajax.postJsonT('/api/assets/findAll', params);
        },
        AssetsFindOneImg(params) {
            return Ajax.postJsonT('/api/assets/findOneImg', params);
        },
        assetsDelete(params) {
            return Ajax.postJson('/api/assets/delete', params);
        },
        findSpecialPlantAnimal(params) {
            return Ajax.postJson('/api/assets/findAnimalAndBotanyById', params);
        },
        findBrand(params) {
            return Ajax.postJson('/api/assets/findBrandById', params);
        },
        findCopyright(params) {
            return Ajax.postJson('/api/assets/findCopyrightById', params);
        },
        findMark(params) {
            return Ajax.postJson('/api/assets/findFirmById', params);
        },
        findGoodwill(params) {
            return Ajax.postJson('/api/assets/findGoodwillById', params);
        },
        findInformation(params) {
            return Ajax.postJson('/api/assets/findInformationDataById', params);
        },
        findGeneric(params) {
            return Ajax.postJson('/api/assets/findPatentById', params);
        },
        findPatent(params) {
            return Ajax.postJson('/api/assets/findPatentById', params);
        },
        findResource(params) {
            return Ajax.postJson('/api/assets/findResourceAptitudeById', params);
        },
        booksFileFindOne(params) {
            return Ajax.postJson('/api/assets/findAssetsBookOne', params);
        },
        vehicleFindOne(params) {
            return Ajax.postJson('/api/assets/findAssetsCarOne', params);
        },
        culturalRelicFindOne(params) {
            return Ajax.postJson('/api/assets/findAssetsDisplayOne', params);
        },
        furnitureFindOne(params) {
            return Ajax.postJson('/api/assets/findAssetsFurnitureOne', params);
        },
        houseFindOne(params) {
            return Ajax.postJson('/api/assets/findAssetsLandOrHouseOne', params);
        },
        generalEquipmentFindOne(params) {
            return Ajax.postJson('/api/assets/findAssetsOne', params);
        },
        specialPlantAnimal(params) {
            return Ajax.postJson('/api/assets/saveAnimalAndBotany', params);
        },
        generalEquipmentAdd(params) {
            return Ajax.postJson('/api/assets/saveAssets', params);
        },
        booksFileAdd(params) {
            return Ajax.postJson('/api/assets/saveAssetsBook', params);
        },
        vehicleAdd(params) {
            return Ajax.postJson('/api/assets/saveAssetsCar', params);
        },
        culturalRelicAdd(params) {
            return Ajax.postJson('/api/assets/saveAssetsDisplay', params);
        },
        furnitureAdd(params) {
            return Ajax.postJson('/api/assets/saveAssetsFurniture', params);
        },
        houseAdd(params) {
            return Ajax.postJson('/api/assets/saveAssetsLandOrHouse', params);
        },
        brandAdd(params) {
            return Ajax.postJson('/api/assets/saveBrand', params);
        },
        copyrightAdd(params) {
            return Ajax.postJson('/api/assets/saveCopyright', params);
        },
        markAdd(params) {
            return Ajax.postJson('/api/assets/saveFirm', params);
        },
        goodwillAdd(params) {
            return Ajax.postJson('/api/assets/saveGoodwill', params);
        },
        informationAdd(params) {
            return Ajax.postJson('/api/assets/saveInformationData', params);
        },
        genericAdd(params) {
            return Ajax.postJson('/api/assets/savePatent', params);
        },
        patentsAdd(params) {
            return Ajax.postJson('/api/assets/savePatent', params);
        },
        resourceAdd(params) {
            return Ajax.postJson('/api/assets/saveResourceAptitude', params);
        },
        specialPlantAnimalModify(params) {
            return Ajax.postJson('/api/assets/updateAnimalAndBotany', params);
        },
        generalEquipmentModify(params) {
            return Ajax.postJson('/api/assets/updateAssets', params);
        },
        booksFileModify(params) {
            return Ajax.postJson('/api/assets/updateAssetsBook', params);
        },
        vehicleModify(params) {
            return Ajax.postJson('/api/assets/updateAssetsCar', params);
        },
        culturalRelicModify(params) {
            return Ajax.postJson('/api/assets/updateAssetsDisplay', params);
        },
        furnitureModify(params) {
            return Ajax.postJson('/api/assets/updateAssetsFurniture', params);
        },
        houseModify(params) {
            return Ajax.postJson('/api/assets/updateAssetsLandOrHouse', params);
        },
        brandModify(params) {
            return Ajax.postJson('/api/assets/updateBrand', params);
        },
        copyrightModify(params) {
            return Ajax.postJson('/api/assets/updateCopyright', params);
        },
        markModify(params) {
            return Ajax.postJson('/api/assets/updateFirm', params);
        },
        goodwillModify(params) {
            return Ajax.postJson('/api/assets/updateGoodwill', params);
        },
        informationModify(params) {
            return Ajax.postJson('/api/assets/updateInformationData', params);
        },
        genericModify(params) {
            return Ajax.postJson('/api/assets/updatePatent', params);
        },
        patentsModify(params) {
            return Ajax.postJson('/api/assets/updatePatent', params);
        },
        resourceModify(params) {
            return Ajax.postJson('/api/assets/updateResourceAptitude', params);
        },
        importExcel(params) {
            return Ajax.postJson('/api/assets/importExcel', params);
        },
        exportExcel(params) {
            return Ajax.get('/api/assets/exportExcel', params);
        },
        changeAssetsStatus(params) {
            return Ajax.postJson('/api/assets/changeAssetsStatus', params);
        },
        importFailAssetsInfo(params) {
            return Ajax.postJson('/api/assets/importFailAssetsInfo', params);
        },
        financeAssetsImportInfo(params) {
            return Ajax.postJson('/api/assets/financeAssetsImportInfo', params);
        },
        getValue(params) {
            return Ajax.postJson('/api/assets/getValue', params);
        },
        findAssetsInfoById(params) {
            return Ajax.postJson('/api/print/findAssetsInfoById', params);
        },
        findOne(params) {
            return Ajax.postJson('/api/assets/findOne', params);
        },
        luoyangExportExcel(params) {
            return Ajax.get('/api/luoYangImport/exportExcel', params);
        },
        luoyangGetValue(params) {
            return Ajax.postJson('/api/luoYangImport/getValue', params);
        }
    },
    setUp: {
        findAll(params) {
            return Ajax.postJson('/api/setUp/findAll', params);
        },
        findAllGroup(params) {
            return Ajax.postJson('/api/setUp/findAllGroup', params);
        },
        save(params) {
            return Ajax.postJson('/api/setUp/save', params);
        },
        update(params) {
            return Ajax.postJson('/api/setUp/update', params);
        },
        delete(params) {
            return Ajax.postJson('/api/setUp/delete', params);
        },
        deleteByCode(params) {
            return Ajax.postJson('/api/setUp/deleteByCode', params);
        },
        findAssetsInfoAll(params) {
            return Ajax.postJson('/api/setUp/findAssetsInfoAll', params);
        },
        findOne(params) {
            return Ajax.postJson('/api/setUp/findOne', params);
        },
        saveCodeAndName(params) {
            return Ajax.postJson('/api/setUp/saveCodeAndName', params);
        },
        findCommonInfo(params) {
            return Ajax.postJson('/api/setUp/findCommonInfo', params);
        },
        findInfoByIds(params) {
            return Ajax.postJson('/api/setUp/findInfoByIds', params);
        },
        deleteAll(params) {
            return Ajax.postJson('/api/setUp/deleteAll', params);
        }
    },
    supplier: {
        findAll(params) {
            return Ajax.postJson('/api/supplier/findAll', params);
        },
        save(params) {
            return Ajax.postJson('/api/supplier/save', params);
        },
        update(params) {
            return Ajax.postJson('/api/supplier/update', params);
        },
        delete(params) {
            return Ajax.postJson('/api/supplier/delete', params);
        },
        findOneImg(params) {
            return Ajax.postJson('/api/supplier/findOneImg', params);
        },
        findOne(params) {
            return Ajax.postJson('/api/supplier/findOne', params);
        }
    },
    Inventory: {
        findAll(params) {
            return Ajax.postJson('/api/inventory/findAll', params);
        },
        delete(params) {
            return Ajax.postJson('/api/inventory/delete', params);
        },
        findAllAssets(params) {
            return Ajax.postJson('/api/inventory/findAllAssets', params);
        },
        findDetails(params) {
            return Ajax.postJson('/api/inventory/findDetails', params);
        },
        findOne(params) {
            return Ajax.postJson('/api/inventory/findOne', params);
        },
        save(params) {
            return Ajax.postJson('/api/inventory/save', params);
        },
        submitInventory(params) {
            return Ajax.postJson('/api/inventory/submitInventory', params);
        },
        update(params) {
            return Ajax.postJson('/api/inventory/update', params);
        },
        findDictAll(params) {
            return Ajax.postJson('/api/rms/dict/findDictAll', params);
        },
        updateAssetsInfo(params) {
            return Ajax.postJson('/api/inventory/updateAssetsInfo', params);
        }
    },
    useReturn: {
        useReturnFindAll(params) {
            return Ajax.postJson('/api/useReturn/findAll', params);
        },
        useReturnFindOne(params) {
            return Ajax.postJson('/api/useReturn/findOne', params);
        },
        useReturnAdd(params) {
            return Ajax.postJson('/api/useReturn/save', params);
        },
        useReturnModify(params) {
            return Ajax.postJson('/api/useReturn/update', params);
        },
        return(params) {
            return Ajax.postJson('/api/useReturn/useReturn', params);
        },
        useReturnDelete(params) {
            return Ajax.postJson('/api/useReturn/delete', params);
        },
        findAllDepartment(params) {
            return Ajax.postJson('/api/useReturn/findAllDepartment', params);
        },
        findAllAssets(params) {
            return Ajax.postJson('/api/useReturn/findAllAssetsByAssetsName', params);
        },
        findAllUse(params) {
            return Ajax.postJson('/api/useReturn/findAllUse', params);
        },
        showSelectAssets(params) {
            return Ajax.postJson('/api/useReturn/showSelectAssets', params);
        },
        selectAssetsConfirm(params) {
            return Ajax.postJson('/api/useReturn/clickAffirm', params);
        },
        selectAssetsCancel(params) {
            return Ajax.postJson('/api/useReturn/clickClose', params);
        },
        selectAssetsDelete(params) {
            return Ajax.postJson('/api/useReturn/clickDelete', params);
        },
        useReturnFindOneImg(params) {
            return Ajax.postJson('/api/useReturn/findOneImg', params);
        },
        showUseReturn(params) {
            return Ajax.postJson('/api/useReturn/showUseReturn', params);
        },
        showUpdateAssets(params) {
            return Ajax.postJson('/api/useReturn/showUpdateAssets', params);
        },
        findAllDepartment(params) {
            return Ajax.postJson('/api/useReturn/findAllDepartment', params);
        }
    },
    assetsCategory: {
        tree(params) {
            return Ajax.postJson('/api/assetsCategory/findAll', params);
        },
        treeById(params) {
            return Ajax.postJson('/api/assetsCategory/findById', params);
        }
    },
    Statistics: {
        Staut(params) {
            return Ajax.postJson('/api/statistics/countAssetsStaut', params);
        },
        Department(params) {
            return Ajax.postJson('/api/statistics/countAssetsDepartment', params);
        },
        Category(params) {
            return Ajax.postJson('/api/statistics/countAssetsCategory', params);
        },
        Year(params) {
            return Ajax.postJson('/api/statistics/countAssetsYear', params);
        },
        StautPrice(params) {
            return Ajax.postJson('/api/statistics/countAssetsStautPrice', params);
        },
        DepartmentPrice(params) {
            return Ajax.postJson('/api/statistics/countAssetsDepartmentPrice', params);
        },
        CategoryPrice(params) {
            return Ajax.postJson('/api/statistics/countAssetsCategoryPrice', params);
        },
        YearPrice(params) {
            return Ajax.postJson('/api/statistics/countAssetsYearPrice', params);
        },
        linkList(params) {
            return Ajax.postJson('/api/statistics/countAssetsPrice', params);
        }
    },
    repairStatistics: {
        breakdownAssetsCategory(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsCategory', params);
        },
        breakdownAssetsStatus(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsStaut', params);
        },
        breakdownAssetsDepartment(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsDepartment', params);
        },
        breakdownAssetsYear(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsYear', params);
        },
        expenseAssetsCategory(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsCategoryPrice', params);
        },
        expenseAssetsStatus(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsStautPrice', params);
        },
        expenseAssetsDepartment(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsDepartmentPrice', params);
        },
        expenseAssetsYear(params) {
            return Ajax.postJson('/api/repairStatistics/countAssetsYearPrice', params);
        }
    },
    library: {
        experienceAdd(params) {
            return Ajax.postJson('/api/library/save', params);
        },
        experienceModify(params) {
            return Ajax.postJson('/api/library/update', params);
        },
        experienceFindAll(params) {
            return Ajax.postJson('/api/library/findAll', params);
        },
        experienceFindOne(params) {
            return Ajax.postJson('/api/library/findOne', params);
        },
        experienceFindOneImg(params) {
            return Ajax.postJson('/api/library/findOneImg', params);
        },
        experienceDelete(params) {
            return Ajax.postJson('/api/library/delete', params);
        },
        categoryAdd(params) {
            return Ajax.postJson('/api/library/saveCategory', params);
        },
        categoryFindAll(params) {
            return Ajax.postJson('/api/library/findAllCategory', params);
        },
        categoryDropDownList(params) {
            return Ajax.postJson('/api/library/findDropDownList', params);
        },
        getExperienceTree(params) {
            return Ajax.postJson('/api/library/getExperienceTree', params);
        },
        updateCategory(params) {
            return Ajax.postJson('/api/library/updateCategory', params);
        },
        deleteCategory(params) {
            return Ajax.postJson('/api/library/deleteCategory', params);
        }
    },
    transferAssets: {
        transferAssetsFindAll(params) {
            return Ajax.postJson('/api/assetsTransfer/findAll', params);
        },
        transferAssetsSave(params) {
            return Ajax.postJson('/api/assetsTransfer/saveTransferAssets', params);
        },
        transferAssetsModify(params) {
            return Ajax.postJson('/api/assetsTransfer/updateTransferAssets', params);
        },
        transferAssetsDelete(params) {
            return Ajax.postJson('/api/assetsTransfer/deleteTransferAssets', params);
        },
        transferAssetsFindOne(params) {
            return Ajax.postJson('/api/assetsTransfer/findOneTransferAssets', params);
        },
        transferAssetsFindOneImg(params) {
            return Ajax.postJson('/api/assetsTransfer/findOneImg', params);
        },
        transferAssetsFindAllDepartment(params) {
            return Ajax.postJson('/api/assetsTransfer/findAllDepartment', params);
        },
        findAllAssets(params) {
            return Ajax.postJson('/api/assetsTransfer/findAllAssets', params);
        },
        transferAssetsShowTransferAssets(params) {
            return Ajax.postJson('/api/assetsTransfer/showTransferAssets', params);
        },
        transferAssetsShowUpdateAssets(params) {
            return Ajax.postJson('/api/assetsTransfer/showUpdateAssets', params);
        },
        transferAssetsClickConfirm(params) {
            return Ajax.postJson('/api/assetsTransfer/clickAffirm', params);
        },
        transferAssetsClickClose(params) {
            return Ajax.postJson('/api/assetsTransfer/clickClose', params);
        },
        transferAssetsClickDelete(params) {
            return Ajax.postJson('/api/assetsTransfer/clickDelete', params);
        },
        updateAssets(params) {
            return Ajax.postJson('/api/assetsTransfer/updateAssets', params);
        },
        findAssetsByUser(params) {
            return Ajax.postJson('/api/assetsTransfer/findAssetsByUser', params);
        }
    },
    assetsRepair: {
        findAll(params) {
            return Ajax.postJson('/api/repair/findAllWorkPublic', params);
        },
        findOneImg(params) {
            return Ajax.postJson('/api/repair/findOneImg', params);
        },
        findOne(params) {
            return Ajax.postJson('/api/repair/findOneWork', params);
        },
        save(params) {
            return Ajax.postJson('/api/repair/save', params);
        },
        update(params) {
            return Ajax.postJson('/api/repair/update', params);
        },
        findAllAssets(params) {
            return Ajax.postJson('/api/repair/findAllAssets', params);
        },
        clickConfirm(params) {
            return Ajax.postJson('/api/repair/clickAffirm', params);
        },
        clickClose(params) {
            return Ajax.postJson('/api/repair/clickClose', params);
        },
        clickDelete(params) {
            return Ajax.postJson('/api/repair/clickDelete', params);
        },
        showRepairAssets(params) {
            return Ajax.postJson('/api/repair/showRepairAssets', params);
        },
        showUpdateAssets(params) {
            return Ajax.postJson('/api/repair/showUpdateAssets', params);
        },
        delete(params) {
            return Ajax.postJson('/api/repair/delete', params);
        },
        findAllWork(params) {
            return Ajax.postJson('/api/repair/findAllWork', params);
        },
        assign(params) {
            return Ajax.postJson('/api/repair/assignWork', params);
        },
        findAllUser(params) {
            return Ajax.postJson('/api/repair/findAllUser', params);
        },
        findAllMyOrder(params) {
            return Ajax.postJson('/api/repair/findAll', params);
        },
        start(params) {
            return Ajax.postJson('/api/repair/start', params);
        },
        over(params) {
            return Ajax.postJson('/api/repair/over', params);
        }
    },
    subContractorRepair: {
        findAll(params) {
            return Ajax.postJson('/api/expatriate/findAll', params);
        },
        findAllAssets(params) {
            return Ajax.postJson('/api/expatriate/findAllAssets', params);
        },
        findAllDepartment(params) {
            return Ajax.postJson('/api/expatriate/findAllDepartment', params);
        },
        findOne(params) {
            return Ajax.postJson('/api/expatriate/findOne', params);
        },
        findOneImg(params) {
            return Ajax.postJson('/api/expatriate/findOneImg', params);
        },
        showSelectAssets(params) {
            return Ajax.postJson('/api/expatriate/showSelectAssets', params);
        },
        showUpdateAssets(params) {
            return Ajax.postJson('/api/expatriate/showUpdateAssets', params);
        },
        save(params) {
            return Ajax.postJson('/api/expatriate/save', params);
        },
        update(params) {
            return Ajax.postJson('/api/expatriate/update', params);
        },
        delete(params) {
            return Ajax.postJson('/api/expatriate/delete', params);
        },
        clickConfirm(params) {
            return Ajax.postJson('/api/expatriate/clickAffirm', params);
        },
        clickClose(params) {
            return Ajax.postJson('/api/expatriate/clickClose', params);
        },
        clickDelete(params) {
            return Ajax.postJson('/api/expatriate/clickDelete', params);
        },
        saveRepairToExpatriate(params) {
            return Ajax.postJson('/api/expatriate/saveRepairToExpatriate', params);
        }
    },
    home: {
        assetStatusDistribution(params) {
            return Ajax.postJson('/api/homePage/assetStatusDistribution', params);
        },
        assetsCategoryDistribution(params) {
            return Ajax.postJson('/api/homePage/assetsCategoryDistribution', params);
        },
        findAssetsInfo(params) {
            return Ajax.postJson('/api/homePage/findAssetsInfo', params);
        },
        findSixAssetsPrice(params) {
            return Ajax.postJson('/api/homePage/findSixAssetsPrice', params);
        },
        repairInfo(params) {
            return Ajax.postJson('/api/homePage/repairInfo', params);
        },
        scrappedInfo(params) {
            return Ajax.postJson('/api/homePage/scrappedInfo', params);
        },
        updatePassword(params) {
            return Ajax.postJson('/api/homePage/updatePassword', params);
        },
        statisticsAssetsPrice(params) {
            return Ajax.postJson('/api/homePage/statisticsAssetsPrice', params);
        },
        inventoryInfo(params) {
            return Ajax.postJson('/api/homePage/inventoryInfo', params);
        }
    },
    dataMigration: {
        migrateData(params) {
            return Ajax.postJson('/api/migrate/migrateData', params);
        }
    }
};
export default Request;
