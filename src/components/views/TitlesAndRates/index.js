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
import { getAllFieldTypesAction, getAllModulesAction, getUdfModuleColumnsAction, getUdfModuleColumnsResetAction, getUdfNumericFormatAction } from "../Setup/logic";
import { Loader } from '../../atoms'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import BillingTitlesAndRates from "../../molecules/BillingTitlesAndRates";
import EmployeeOverride from "../../molecules/EmployeeOverride";
import UserDefineFields from "../../molecules/UserDefineFields";
import BillingScheduleOverview from '../../molecules/BillingScheduleOverview'
import BillingIndirectorRates from  '../../molecules/BillingIndirectorRates'
import CreateEditUserDefineField from "../../molecules/UserDefineFields/CreateEditUserDefineField";
import { getCurrencyAction } from '../../../redux/common/logic'
import TextEditor from '../../atoms/Editors/TextEditor'
import NumberEditor from '../../atoms/Editors/NumberEditor'
import SelectEditor from '../../atoms/Editors/SelectEditor'
import DateEditor from '../../atoms/Editors/DateEditor'
import BillingPeriods from "../../molecules/BillingPeriods";
import PuMapping from "../../molecules/PuMapping";
import { TryOutlined } from "@mui/icons-material";

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
    width: "100%",
  },
}));

export default function TitlesAndRates() {

  const TabContent = [
    {
      name: 'Billing Titles and Rates',
      component: (props) => <BillingTitlesAndRates {...props} />,
      moduleId: 10,
      udf: true
    },
    {
      name: 'Employee Overrides',
      component: (props) => <EmployeeOverride {...props} />,
      moduleId: 11,
      udf: true
    },    	
	 {
    name: 'Indirect Rates',
    component: (props) => <BillingIndirectorRates {...props} />,
    moduleId: 12,
    udf: false
  },
    {
      name: 'Billing Periods',
      component: (props) => <BillingPeriods {...props} />,
      moduleId: 13,
      udf: true
    },
    {
      name: 'Billing Schedule Overview',
      component: (props) => <BillingScheduleOverview {...props} />,      
      moduleId: 14,
    },    
      {
        name: 'PU Mapping',
        component: (props) => <PuMapping {...props} />,
        moduleId: 15,
        udf: false
      }
    
  ]

  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading: allModulesLoading, error: allModulesError } = useIntialSelector('getAllModules')
  const { loading: allFieldTypesLoading, error: allFieldTypesError } = useIntialSelector('getAllFieldTypes')
  const { loading: numericFormatLoading, error: numericFormatError } = useIntialSelector('getUdfNumericFormat')
  const { loading: currencyLoading, error: currencyError } = useIntialSelector('getCurrency')

  const { moduleId = "10", filters, ...rest } = parse(location.search)
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
    history.push(`/titlesrates?${params}`)
  };

  const loading = allModulesLoading || allFieldTypesLoading || numericFormatLoading || currencyLoading
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
        <UserDefineFields />
        <CreateEditUserDefineField />
      </Loader>
    </div>
  );
}
