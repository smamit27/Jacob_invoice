// http://usqts0-app096.jacobs.com/a/api/GetUDFModuleAll?Active=Y&RoleID=0

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { parse, stringify } from 'query-string'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProjectMapping from '../../molecules/ProjectMapping';
import TaskMapping from '../../molecules/TaskMapping';
import CreateEditClientProjectGroup from "../../molecules/ProjectMapping/CreateEditClientProjectGroup";
import ClientProjectGroups from "../../molecules/ProjectMapping/ClientProjectGroups";
import SubcontractSummary from "../../molecules/Subcontracts";
import SubcontractPO from  '../../molecules/Subcontracts/SubcontractPO'
import SubcontractPODetail from  '../../molecules/Subcontracts/SubcontractPODetail'
import ExpenditureMapping from '../../molecules/ExpenditureMapping'
import UserDefineFields from '../../molecules/UserDefineFields';
import CreateEditUserDefineField from "../../molecules/UserDefineFields/CreateEditUserDefineField";
import CollectionDetails from '../../molecules/CollectionDetails'
import Funding from '../../molecules/Funding'
import Budget from '../../molecules/Budget'
import { getAllFieldTypesAction, getAllModulesAction, getUdfModuleColumnsAction, getUdfModuleColumnsResetAction, getUdfNumericFormatAction } from "./logic";
import { Loader } from '../../atoms'
import { getCurrencyAction } from '../../../redux/common/logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import FundingBudgetSummary from '../../molecules/FundingBudgetSummary'
import TextEditor from '../../atoms/Editors/TextEditor'
import NumberEditor from '../../atoms/Editors/NumberEditor'
import SelectEditor from '../../atoms/Editors/SelectEditor'
import DateEditor from '../../atoms/Editors/DateEditor'
import {Events} from '../../molecules/EventsTravel'
import TextFilter from "../../atoms/Filters/TextFilter";

const numFormat = {
  1: '',
  2: 'Decimal',
  3: 'Percent'
}

function TabPanel(props) {
  const collectionId = useSelector(state => state.getCollectionId)
  const { value, index, moduleId, udf, component, ...other } = props;
  const dispatch = useDispatch()
  const { loading: udfModuleColumnsLoading, error: udfModuleColumnsError, data: udfModuleColumns } = useIntialSelector('getUdfModuleColumns', !udf)
  const { data: allFieldTypes } = useIntialSelector('getAllFieldTypes')
  const { data: numericFormats } = useIntialSelector('getUdfNumericFormat')

  useEffect(() => {
    if (udf) {
      dispatch(getUdfModuleColumnsAction({
        ModuleID: moduleId,
        CollectionID: collectionId
      }))
    }
    return () => {
      dispatch(getUdfModuleColumnsResetAction())
    }
  }, [])

  const loading = udfModuleColumnsLoading
  const error = udfModuleColumnsError

  const formUdfData = () => {
    const dat = udfModuleColumns.map(d => ({
      accessor: `${d.UDF_ID}`,
      Header: d.UDF_NAME,
      editable: true,
      width: 200,
      type: allFieldTypes?.find(z => z.FIELD_TYPE_ID === d.FIELD_TYPE_ID)?.FIELD_TYPE_NAME,
      ...(d.IS_DROPDOWN_YN === 'Y' ? { valueOptions: d.DROPDOWN_VALUE || [] } : {}),
      ...(d.IS_NUM_TEXTBOX_YN === 'Y' ? { format: numFormat[d.NUMERIC_TYPE_FORMAT] || '' } : {})
    }))
    return dat
  }

  const formEditorType = (type) => {
    switch (type) {
      case 'Free Text':
        return TextEditor
      case 'Numeric':
        return NumberEditor
      case 'Currency':
        return NumberEditor
      case 'Dropdown':
        return SelectEditor
      case 'Date':
        return DateEditor
      default:
        return TextEditor
    }
  }

  const formUdfGridData = () => {
    const dat = udfModuleColumns.map(d => ({
      width: 130,
      key: `${d.UDF_ID}`,
      name: d.UDF_NAME,
      udf: true,
      editor: formEditorType(d.FIELD_TYPE_NAME),
      ...(d.IS_DROPDOWN_YN === 'Y' ? { valueOptions: d.DROPDOWN_VALUE || [] } : {}),
      ...(d.IS_NUM_TEXTBOX_YN === 'Y' ? { format: numFormat[d.NUMERIC_TYPE_FORMAT] || '' } : {}),
      "cellClass": "rdg-editor-cell",
      ...((d.FIELD_TYPE_NAME === 'Free Text' || d.FIELD_TYPE_NAME === 'Dropdown') && moduleId === 4 ? { filterEditor: TextFilter } : {})
    }))
    return dat
  }

  return (
    <div
      role="tabpanel"
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Loader loading={loading} error={error} style={{ height: "calc(100vh - 130px)" }} >
        <Box p={3}>
          <Typography component="div" >{component({ moduleId, udfData: formUdfData(), udfGridColumns: formUdfGridData(), udfRawData: udfModuleColumns })}</Typography>
        </Box>
      </Loader>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
}));

export default function Setup() {
  
  const TabContent = [
    {
      name: 'Collection Details',
      // component: (props) => <CollectionDetails {...props} />,
      component: () => <div>Collection Details</div>,
      moduleId: 1,
      udf: false
    },
    {
      name: 'Funding',
      component: (props) =>  <Funding {...props} />,
      moduleId: 2,
      udf: true
    },
    {
      name: 'Budgets',
      component: (props) => <Budget {...props} />,
      moduleId: 3,
      udf: true
    },
    {
      name: 'project mapping',
      component: (props) => <ProjectMapping {...props} />,
      moduleId: 4,
      udf: true
    },
    {
      name: 'Task Mapping',
      component: (props) => <TaskMapping {...props}/>,
      moduleId: 5,
      udf: true
    },
    {
      name: 'expenditure mapping',
      component: (props) => <ExpenditureMapping {...props} />,
      moduleId: 6,
      udf: true
    },
    {
      name: 'Subcontractors',
      component: (props) => <SubcontractSummary {...props} />,
      moduleId: 7,
      udf: false
    },
    {
      name: 'travel details',
      component: () => <div>travel details (instead of trips)</div>,
      moduleId: 8,
      udf: false
    },
    {
      name: 'Reporting Levels',
      component: () => <div>Reporting Levels</div>,
      moduleId: 9,
      udf: false
    },
    {
      name: 'Events',
      component: (props) => <Events {...props} />,
      moduleId: 10,
      udf: false
    },
   
  ]

  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading: allModulesLoading, error: allModulesError } = useIntialSelector('getAllModules')
  const { loading: allFieldTypesLoading, error: allFieldTypesError } = useIntialSelector('getAllFieldTypes')
  const { loading: numericFormatLoading, error: numericFormatError } = useIntialSelector('getUdfNumericFormat')
  const { loading: currencyLoading, error: currencyError } = useIntialSelector('getCurrency')
  const { open: summaryOpen } = useSelector(state => state.fundingBudgetSummaryModal)

  const { moduleId = "1", filters, ...rest } = parse(location.search)
  const tabActive = TabContent.findIndex(d => d.moduleId === parseInt(moduleId))
  const [value, setValue] = React.useState(tabActive !== -1 ? tabActive : 0);

  useEffect(() => {
    dispatch(getAllModulesAction())
    dispatch(getAllFieldTypesAction())
    dispatch(getUdfNumericFormatAction())
    dispatch(getCurrencyAction())
  }, [])

  useEffect(() => {
    const mod = TabContent.findIndex(d => d.moduleId === parseInt(moduleId, 10))
    setValue(mod);
  }, [moduleId])

  const handleChange = (event, newValue) => {
    const params = stringify({
      ...rest,
      moduleId: TabContent[newValue]?.moduleId || 0
    })
    history.push(`/setup?${params}`)
  };

  const loading = !(!allModulesLoading && !allFieldTypesLoading && !numericFormatLoading && !currencyLoading)
  const error = allModulesError || allFieldTypesError || numericFormatError || currencyError

  const renderTabPanel = () => {
    const tabPanel = TabContent[value]
    return (
      <TabPanel key={tabPanel.name} value={value} moduleId={tabPanel.moduleId} udf={tabPanel.udf} index={value} component={tabPanel.component} />
    )
  }

  return (
    <div className={classes.root}>
      <Loader loading={loading} error={error} style={{ height: "calc(100vh - 80px)" }} >
        <Box ml={"20px"}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {TabContent.map((item, i) => <Tab key={item.name} label={item.name} {...a11yProps(i)} />)}
          </Tabs>
        </Box>
        {renderTabPanel()}
        <SubcontractPO/>
        <SubcontractPODetail />
        <ClientProjectGroups />
        <CreateEditClientProjectGroup />
        <UserDefineFields />
        <CreateEditUserDefineField />
        {summaryOpen && <FundingBudgetSummary />}
      </Loader>
    </div>
  );
}
