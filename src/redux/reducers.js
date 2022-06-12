import { combineReducers } from 'redux';
import { commonReducer } from "./common/reducer";
import { checkAuthReducer } from '../components/molecules/CheckAuth/logic'
import { statusNotificationReducer } from '../components/molecules/StatusNotification/logic';
import { apiReducer } from "./api/reducer"
import {
    clientProjectGroupModalReducer,
    clientProjectGroupTableReducer,
    createEditClientProjectGroupModalReducer,
    deleteClientProjectGroupsReducer,
    createEditClientProjectGroupReducer,
    projectMappingTableReducer,
    saveProjectMappingByAllianceReducer,
    saveProjectMappingTableReducer,
    projectMappingInvoiceFormatListReducer
} from '../components/molecules/ProjectMapping/logic'

import {
    clientSubcontractModalReducer,subcontractTableReducer,
    clientSubcontractPOTableReducer ,subcontractPODetailModalReducer,getSubcontractorPOSummaryTotalReducer,getSubcontractorPODetailTotalReducer,
    subcontractPODetailReducer,subcontractStatusReducer,saveSubcontractorReducer,subcontractorPOReducer
} from '../components/molecules/Subcontracts/logic'

import {
    taskMappingTableReducer, saveTaskMappingTableReducer,saveQuickTaskMappingTableReducer, 
    getTaskMappingTableReducer, taskBillingMethodTableReducer,getTaskLevelMappingReducer,
    getTaskNumberNameMappingReducer,getNameOfCharactersMappingReducer,
    getEditTaskMappingGroupingReducer,saveTaskNumberNameReducer,globalTaskMappingGroupingReducer
} from '../components/molecules/TaskMapping/logic'

import { addModuleAllReducer, requiredReducer } from '../components/molecules/AddNewFieldModal/logic'
import { backDropLoaderReducer } from '../components/molecules/BackDropLoader/logic';
import { expenditureMappingTableReducer, saveExpenditureMappingReducer } from '../components/molecules/ExpenditureMapping/logic'
import {
    userDefineFieldsModalReducer,
    getAllUdfReducer,
    deleteUserDefineFieldsReducer,
    createEditUserDefineFieldModalReducer,
    createEditUserDefineFieldReducer,
    getExistingDropdownOptionsReducer
} from '../components/molecules/UserDefineFields/logic'

import { getAllModulesReducer, getAllFieldTypesReducer, getUdfModuleColumnsReducer, getUdfNumericFormatReducer } from '../components/views/Setup/logic'
import { drawerReducer } from '../components/molecules/Drawer/logic';
import { getCollectionIdReducer } from '../components/molecules/CollectionChange/logic'
import {
    billingPeriodsTableReducer, saveBillingPeriodsTableReducer, billingFrequencyTableReducer,
    billingThroughDateTableReducer, billingThroughDateJacobsReducer, billingGridDeleteReducer
} from '../components/molecules/BillingPeriods/logic'
import {indirectRatesTableReducer,saveIndirectRatesTableReducer,searchEmployeeIdReducer,getEmployeeRateGroupReducer,saveEmployeeOverrideReducer} from '../components/molecules/BillingIndirectorRates/logic'
import { puMappingTableReducer, savePuMappingTableReducer, rateGroupTableReducer, puMappingDeleteReducer } from '../components/molecules/PuMapping/logic'
import {
    searchProjectNumberIdReducer,
    searchManualEventBatchNumberReducer,
    searchBillingPeriodsReducer,
} from '../components/molecules/Events/logic'
import {
    fundingTableReducer,
    saveFundingTableReducer,
    allocateToTaskModalReducer,
    fundingTaskGroupsListReducer,
    fundingSourceListReducer,
    getAllocateToTaskListReducer,
    getProrateClientTaskReducer,
    saveFundingSourceReducer,
    deleteFundingSourceReducer
} from '../components/molecules/Funding/logic'

import {
    budgetTableReducer,
    saveBudgetTableReducer,
    budgetExpenditure1DropdownReducer,
    budgetExpenditure2DropdownReducer,
    budgetSubcontractorDropdownReducer,
} from '../components/molecules/Budget/logic'

import {
    getProjectNameReducer, getProjectNumberReducer, getClientNameReducer, getKeyMemberReducer, getKeyRoleReducer, getContractTypeReducer,
    getLegalEntityReducer, getPUReducer, getAgreementReducer,
    getProjectStatusReducer, getUmbrellaCodeReducer, getContractNumberReducer, getProjectSearchReducer, selectedProjectNumberReducer
} from '../components/molecules/Modal/logic'

import { getFundingBudgetSummaryTableReducer, fundingBudgetSummaryModalReducer, saveFundingBudgetSummaryTableReducer, getFundingBudgetSummaryTotalReducer } from '../components/molecules/FundingBudgetSummary/logic'

import { billingTitlesAndRatesTableReducer, saveBillingTitlesAndRatesTableReducer, deleteBillingTitlesAndRatesTableReducer } from '../components/molecules/BillingTitlesAndRates/logic'

import { searchEmployeesReducer, employeeOverrideTableReducer, saveEmployeeOverrideTableReducer, employeeOverrideBillingTitleDropdownReducer, employeeOverrideLevelDropdownReducer, deleteEmployeeOverrideTableReducer } from '../components/molecules/EmployeeOverride/logic'
import { contractorCeilingFieldsModalReducer ,getAllContractorCeilingReducer,
        deleteContractorCeilingFieldsReducer,createEditContractorCeilingFieldReducer,getContractCeilingSummaryTotalReducer} from '../components/molecules/ContractorCeilings/logic';

import {
    getAllianceCodeOneReducer, getAllianceCodeTwoReducer,
    getAllianceCodeThreeReducer, saveAllianceProjectReducer,
    getAllianceProjectDetailReducer, getClientCodeReducer
} from '../components/molecules/Steppar/logic'
import { getCurrencyReducer, getGenerateCollectionReducer, projectOrAllianceChangeReducer } from './common/logic'

import { employeeInfoTableReducer, deleteEmployeeInfoReducer, saveEmployeeInfoTableReducer, employeeInfoBillingTitleDropdownReducer } from '../components/molecules/EmployeeInfo/logic'

import { getTiaSubconpoTableReducer, getTiaSubconpoDetailTableReducer, tiaSubconpoModalReducer, tiaSubconpoDetailModalReducer } from '../components/views/Tia/logic'

import {getBillingScheduleReducer} from '../components/molecules/BillingScheduleOverview/logic'
import { costRateTableReducer, deleteCostRatesReducer, saveCostRateTableReducer } from '../components/molecules/CostRate/logic'
import { saveTravelTableReducer, travelTableReducer, deleteTravelTableReducer } from '../components/molecules/Travel/logic'
import {projectInvoiceDetailModalReducer,projectInvoiceDetailReducer,manageSaveViewModalReducer,
    getProjectOverviewSummaryTotalReducer,getProjectInvoiceOverviewReducer,getProjectInvoiceSummaryTotalReducer,
    getAllManageSavedViewsReducer,createEditManageSavedViewsReducer,deleteManageSavedViewsReducer
    ,getRoleListReducer,powerInvoicePeriodReducer,oracleInvoiceStatusReducer,searchAdvancedReducer,advancedSearchIdReducer} from '../components/molecules/InvoiceOverview/logic'

import {
    createBatchInvoiceModelReducer,
    createEditBatchInvoiceModelReducer,
    postInvoicesModelReducer,
    splitInvoiceModelReducer,
    splitInvoiceToNewBatchModelReducer,
    invoiceOptionsReducer,
    splitInvoiceToExistingBatchModelReducer
} from '../components/molecules/InvoiceHome/logic';

import {
    createEventModelReducer,
    eventsOptionsReducer,
    
} from '../components/molecules/Events/logic';

import {getItemBilledHeaderReducer,getItemNotBilledHeaderReducer,powerInvoiceDetailsPeriodReducer,oracleInvoiceDetailsStatusReducer,searchAdvancedInvoiceDetailsReducer,
        changeHistoryReducer,advancedSearchInvoiceDetailsIdReducer,oraclePADraftNumberReducer,clientInvoiceNumberReducer,itemNotBilledReducer,getItemNotBilledTotalReducer,
        getItemBilledTotalReducer
} from '../components/molecules/InvoiceDetails/logic';
import { createEventDetailseModelReducer, createEventInvoiceModelReducer } from '../components/molecules/EventsSummary/logic';


export const rootReducer = combineReducers({
    common: commonReducer,
    checkAuth: checkAuthReducer,
    statusNotification: statusNotificationReducer,
    api: apiReducer,
    clientProjectGroupModal: clientProjectGroupModalReducer,
    clientProjectGroupTable: clientProjectGroupTableReducer,
    createEditClientProjectGroupModal: createEditClientProjectGroupModalReducer,
    createEditClientProjectGroup: createEditClientProjectGroupReducer,
    addModuleAllReducer: addModuleAllReducer,
    requiredReducer: requiredReducer,
    backDropLoader: backDropLoaderReducer,
    projectMappingTable: projectMappingTableReducer,
    subcontractModal: clientSubcontractModalReducer,
    subcontractTableReducer: subcontractTableReducer,
    subcontractPOTableReducer: clientSubcontractPOTableReducer,
    getSubcontractorPOSummaryTotalReducer:getSubcontractorPOSummaryTotalReducer,
    getSubcontractorPODetailTotalReducer:getSubcontractorPODetailTotalReducer,
    subcontractPODetailModalReducer: subcontractPODetailModalReducer,
    subcontractPODetailReducer: subcontractPODetailReducer,
    subcontractStatusReducer: subcontractStatusReducer,
    saveSubcontractorReducer: saveSubcontractorReducer,
    subcontractorPOReducer: subcontractorPOReducer,
    expenditureMappingTable: expenditureMappingTableReducer,
    taskMappingTableReducer: taskMappingTableReducer,
    saveTaskMappingTableReducer: saveTaskMappingTableReducer,
    saveQuickTaskMappingTableReducer: saveQuickTaskMappingTableReducer,
    getTaskLevelMappingReducer:getTaskLevelMappingReducer,
    getTaskNumberNameMappingReducer:getTaskNumberNameMappingReducer,
    getNameOfCharactersMappingReducer:getNameOfCharactersMappingReducer,
    getEditTaskMappingGroupingReducer:getEditTaskMappingGroupingReducer,
    saveTaskNumberNameReducer:saveTaskNumberNameReducer,
    globalTaskMappingGrouping:globalTaskMappingGroupingReducer,
    getTaskMappingTableReducer: getTaskMappingTableReducer,
    taskBillingMethodTableReducer: taskBillingMethodTableReducer,
    saveExpenditureMappingReducer: saveExpenditureMappingReducer,
    userDefineFieldsModal: userDefineFieldsModalReducer,
    deleteUserDefineFields: deleteUserDefineFieldsReducer,
    createEditUserDefineFieldModal: createEditUserDefineFieldModalReducer,
    createEditUserDefineField: createEditUserDefineFieldReducer,
    getAllModules: getAllModulesReducer,
    getAllFieldTypes: getAllFieldTypesReducer,
    getUdfModuleColumns: getUdfModuleColumnsReducer,
    getAllUdf: getAllUdfReducer,
    getUdfNumericFormat: getUdfNumericFormatReducer,
    getExistingDropdownOptions: getExistingDropdownOptionsReducer,
    drawer: drawerReducer,
    deleteClientProjectGroups: deleteClientProjectGroupsReducer,
    saveProjectMappingByAlliance: saveProjectMappingByAllianceReducer,
    saveProjectMappingTable: saveProjectMappingTableReducer,
    getCollectionId: getCollectionIdReducer,
    fundingTable: fundingTableReducer,
    saveFundingTable: saveFundingTableReducer,
    allocateToTaskModal: allocateToTaskModalReducer,
    fundingTaskGroupsList: fundingTaskGroupsListReducer,
    fundingSourceList: fundingSourceListReducer,
    getAllocateToTaskList: getAllocateToTaskListReducer,
    getProrateClientTask: getProrateClientTaskReducer,
    getProjectSearchReducer: getProjectSearchReducer,
    getProjectNameReducer: getProjectNameReducer,
    getProjectNumberReducer: getProjectNumberReducer,
    getClientNameReducer: getClientNameReducer,
    getKeyMemberReducer: getKeyMemberReducer,
    getKeyRoleReducer: getKeyRoleReducer,
    getContractTypeReducer: getContractTypeReducer,
    getLegalEntityReducer: getLegalEntityReducer,
    getPUReducer: getPUReducer,
    getAgreementReducer: getAgreementReducer,
    getProjectStatusReducer: getProjectStatusReducer,
    getUmbrellaCodeReducer: getUmbrellaCodeReducer,
    getContractNumberReducer: getContractNumberReducer,
    selectedProjectNumberReducer: selectedProjectNumberReducer,
    budgetTable: budgetTableReducer,
    saveBudgetTable: saveBudgetTableReducer,
    getFundingBudgetSummaryTable: getFundingBudgetSummaryTableReducer,
    fundingBudgetSummaryModal: fundingBudgetSummaryModalReducer,
    budgetExpenditure1Dropdown: budgetExpenditure1DropdownReducer,
    budgetExpenditure2Dropdown: budgetExpenditure2DropdownReducer,
    budgetSubcontractorDropdown: budgetSubcontractorDropdownReducer,
    billingTitlesAndRatesTable: billingTitlesAndRatesTableReducer,
    saveBillingTitlesAndRatesTable: saveBillingTitlesAndRatesTableReducer,
    deleteBillingTitlesAndRatesTable: deleteBillingTitlesAndRatesTableReducer,
    billingPeriodsTable: billingPeriodsTableReducer,
    billingGridDelete: billingGridDeleteReducer,
    saveBillingPeriodsTable: saveBillingPeriodsTableReducer,
    billingFrequencyTableReducer: billingFrequencyTableReducer,
    billingThroughDateTableReducer: billingThroughDateTableReducer,
    billingThroughDateJacobsReducer: billingThroughDateJacobsReducer,
    indirectRatesTableReducer: indirectRatesTableReducer,
    saveIndirectRatesTableReducer: saveIndirectRatesTableReducer,
    searchEmployeeIdReducer: searchEmployeeIdReducer,
    searchProjectNumberIdReducer:searchProjectNumberIdReducer,
    searchBillingPeriodsReducer:searchBillingPeriodsReducer,
    searchManualEventBatchNumberReducer:searchManualEventBatchNumberReducer,
    getEmployeeRateGroupReducer:getEmployeeRateGroupReducer,
    saveEmployeeOverrideReducer: saveEmployeeOverrideReducer,
    deleteEmployeeOverrideTable: deleteEmployeeOverrideTableReducer,
    puMappingTableReducer: puMappingTableReducer,
    puMappingDelete: puMappingDeleteReducer,
    savePuMappingTable: savePuMappingTableReducer,
    getCurrency: getCurrencyReducer,
    getGenerateCollectionId: getGenerateCollectionReducer,
    employeeOverrideTable: employeeOverrideTableReducer,
    saveEmployeeOverrideTable: saveEmployeeOverrideTableReducer,
    employeeOverrideBillingTitleDropdown: employeeOverrideBillingTitleDropdownReducer,
    employeeOverrideLevelDropdown: employeeOverrideLevelDropdownReducer,
    searchEmployees: searchEmployeesReducer,
    saveFundingSource: saveFundingSourceReducer,
    deleteFundingSource: deleteFundingSourceReducer,
    rateGroupTableReducer: rateGroupTableReducer,
    saveFundingBudgetSummaryTable: saveFundingBudgetSummaryTableReducer,
    projectMappingInvoiceFormatList: projectMappingInvoiceFormatListReducer,
    getAllianceCodeOneReducer: getAllianceCodeOneReducer,
    getAllianceCodeTwoReducer: getAllianceCodeTwoReducer,
    getAllianceCodeThreeReducer: getAllianceCodeThreeReducer,
    saveAllianceProjectReducer: saveAllianceProjectReducer,
    getAllianceProjectDetailReducer: getAllianceProjectDetailReducer,
    employeeInfoTable: employeeInfoTableReducer,
    saveEmployeeInfoTable: saveEmployeeInfoTableReducer,
    employeeInfoBillingTitleDropdown: employeeInfoBillingTitleDropdownReducer,
    getClientCodeReducer: getClientCodeReducer,
    projectOrAllianceChange: projectOrAllianceChangeReducer,
    getFundingBudgetSummaryTotal: getFundingBudgetSummaryTotalReducer,
    getTiaSubconpoTable: getTiaSubconpoTableReducer,
    getTiaSubconpoDetailTable: getTiaSubconpoDetailTableReducer,
    tiaSubconpoModal: tiaSubconpoModalReducer,
    tiaSubconpoDetailModal: tiaSubconpoDetailModalReducer,
    getBillingScheduleReducer: getBillingScheduleReducer,
    contractorCeilingFieldsModalReducer: contractorCeilingFieldsModalReducer,
    getAllContractorCeilingReducer: getAllContractorCeilingReducer,
    deleteContractorCeilingFieldsReducer: deleteContractorCeilingFieldsReducer,
    createEditContractorCeilingFieldReducer: createEditContractorCeilingFieldReducer,
    getContractCeilingSummaryTotalReducer: getContractCeilingSummaryTotalReducer,
    costRateTable: costRateTableReducer,
    saveCostRateTable: saveCostRateTableReducer,
    saveTravelTable: saveTravelTableReducer,
    deleteTravelTable: deleteTravelTableReducer,
    travelTable: travelTableReducer,
    projectInvoiceDetailModalReducer:projectInvoiceDetailModalReducer,
    projectInvoiceDetailReducer:projectInvoiceDetailReducer,
    manageSaveViewModalReducer:manageSaveViewModalReducer,
    getProjectInvoiceOverviewReducer: getProjectInvoiceOverviewReducer,
    getProjectOverviewSummaryTotalReducer:getProjectOverviewSummaryTotalReducer,
    getProjectInvoiceSummaryTotalReducer:getProjectInvoiceSummaryTotalReducer,
    getAllManageSavedViewsReducer:getAllManageSavedViewsReducer,
    createEditManageSavedViewsReducer:createEditManageSavedViewsReducer,
    deleteManageSavedViewsReducer:deleteManageSavedViewsReducer,
    powerInvoicePeriodReducer: powerInvoicePeriodReducer,
    oracleInvoiceStatusReducer:oracleInvoiceStatusReducer,
    getRoleListReducer:getRoleListReducer,
    searchAdvancedReducer:searchAdvancedReducer,
    advancedSearchIdReducer: advancedSearchIdReducer,
    deleteEmployeeInfo: deleteEmployeeInfoReducer,
    deleteCostRates: deleteCostRatesReducer,
    createBatchInvoiceModel: createBatchInvoiceModelReducer,
    createEventModel: createEventModelReducer,
    createEditBatchInvoiceModel: createEditBatchInvoiceModelReducer,
    postInvoicesModel: postInvoicesModelReducer,
    oracleInvoiceDetailsStatusReducer:oracleInvoiceDetailsStatusReducer,
    getItemBilledHeaderReducer:getItemBilledHeaderReducer,
    getItemNotBilledHeaderReducer:getItemNotBilledHeaderReducer,
    changeHistoryReducer:changeHistoryReducer,
    getItemBilledTotalReducer:getItemBilledTotalReducer,
    getItemNotBilledTotalReducer:getItemNotBilledTotalReducer,
    powerInvoiceDetailsPeriodReducer:powerInvoiceDetailsPeriodReducer,
    searchAdvancedInvoiceDetailsReducer:searchAdvancedInvoiceDetailsReducer,
    advancedSearchInvoiceDetailsIdReducer:advancedSearchInvoiceDetailsIdReducer,
    oraclePADraftNumberReducer:oraclePADraftNumberReducer,
    clientInvoiceNumberReducer:clientInvoiceNumberReducer,
    itemNotBilledReducer:itemNotBilledReducer,
    invoiceOptions: invoiceOptionsReducer,
    eventsOptions: eventsOptionsReducer,
    createBatchInvoiceModel: createBatchInvoiceModelReducer,
    createEditBatchInvoiceModel: createEditBatchInvoiceModelReducer,
    postInvoicesModel: postInvoicesModelReducer,
    splitInvoiceModel: splitInvoiceModelReducer,
    splitInvoiceToNewBatchModel: splitInvoiceToNewBatchModelReducer,
    splitInvoiceToExistingBatchModel: splitInvoiceToExistingBatchModelReducer,
    createEventInvoiceModelReducer:createEventInvoiceModelReducer,
    createEventDetailseModelReducer:createEventDetailseModelReducer
});
