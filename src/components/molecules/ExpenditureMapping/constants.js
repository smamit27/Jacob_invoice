
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';
import CheckboxEditor from '../../atoms/Editors/CheckboxEditor';
import TextFilter from '../../atoms/Filters/TextFilter';
import CheckboxFormatter from '../../atoms/Formatters/CheckboxFormatter';
import TextEditor from '../../atoms/Editors/TextEditor';
import ExpenditureLevelOneAutocomplete from './ExpenditureLevelOneAutocomplete'
import ExpenditureLevelTwoAutocomplete from './ExpenditureLevelTwoAutocomplete'
import ExpenditureLevelThreeAutocomplete from './ExpenditureLevelThreeAutocomplete'
import ExpenditureLevelFourAutocomplete from './ExpenditureLevelFourAutocomplete'
import ExpenditureAttributeOneAutocomplete from './ExpenditureAttributeOneAutocomplete'
import ExpenditureAttributeTwoAutocomplete from './ExpenditureAttributeTwoAutocomplete'
import ExpenditureAttributeThreeAutocomplete from './ExpenditureAttributeThreeAutocomplete'
import ExpenditureAttributeFourAutocomplete from './ExpenditureAttributeFourAutocomplete'
import ExpenditureGroupAutocomplete from './ExpenditureGroupAutocomplete'
import TiaSelectEditor from './TiaSelectEditor'

export const EXPENDITURE_TABLE = [
      { resizable: true, width: 200, key: 'EXPENDITURE_TYPE', name: 'Expenditure Type (Oracle)', filterEditor: TextFilter, frozen: true },
      { resizable: true, width: 200, key: 'EXPENDITURE_CATEGORY', name: 'Expenditure Category (Oracle)', frozen: true, filterEditor: TextFilter },
      { resizable: true, width: 200, key: 'EXPENDITURE_SOURCE', name: 'Expenditure Source (Oracle)', filterEditor: TextFilter },
      { resizable: true, width: 150, key: 'EXPENDITURE_MARKUP', name: 'Expense Markup', filterEditor: TextFilter },
      {
            resizable: true, width: 220, key: 'EXPENDITURE_GROUP', name: 'Expense Group ', "cellClass": "rdg-editor-cell",
            "valueOptions": [],
            "editor": ExpenditureGroupAutocomplete,
            "editor": ({ row, ...others }) => <ExpenditureGroupAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      {
            resizable: true, width: 200, key: 'CLIENT_EXPENDITURE_LEVEL_1', name: 'Client Expenditure Level 1',
            "cellClass": "rdg-editor-cell",
            "valueOptions": [],
            "editor": ExpenditureLevelOneAutocomplete,
            "editor": ({ row, ...others }) => <ExpenditureLevelOneAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      {
            resizable: true, width: 200, key: 'CLIENT_EXPENDITURE_LEVEL_2', name: 'Client Expenditure Level 2', "cellClass": "rdg-editor-cell",
            "valueOptions": [],
            "editor": ExpenditureLevelTwoAutocomplete,
            "editor": ({ row, url, key, ...others }) => <ExpenditureLevelTwoAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      {
            resizable: true, width: 200, key: 'CLIENT_EXPENDITURE_LEVEL_3', name: 'Client Expenditure Level 3',
            "valueOptions": [],
            "editor": ExpenditureLevelThreeAutocomplete,
            "editor": ({ row, url, key, ...others }) => <ExpenditureLevelThreeAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      {
            resizable: true, width: 200, key: 'CLIENT_EXPENDITURE_LEVEL_4', name: 'Client Expenditure Level 4',
            "valueOptions": [],
            "editor": ExpenditureLevelFourAutocomplete,
            "editor": ({ row, ...others }) => <ExpenditureLevelFourAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      { resizable: true, width: 200, key: 'ADDITIONAL_BILLING_MARKUP', name: 'Additional Billing Markup', editor: TextEditor, "cellClass": "rdg-editor-cell", editable: true },
      {
            resizable: true, width: 70, key: 'TIA_DISPLAY', name: 'Tia ?',
            "editor": ({ row, ...others }) => <TiaSelectEditor {...others} row={row} />,
            "cellClass": "rdg-editor-cell",
            "valueOptions": [{ id: 'Y', description: 'Yes' }, { id: 'N', description: 'No' }]
      },
      { resizable: true, width: 200, key: 'TEAM_EXPENDITURE', name: 'Team Expenditure', editor: TextEditor, "cellClass": "rdg-editor-cell", editable: true },
      { resizable: true, width: 200, key: 'ADDITIONAL_MARKUP', name: 'Additional Markup', editor: TextEditor, "cellClass": "rdg-editor-cell", editable: true },
      {
            resizable: true, width: 200, key: 'EXPENDITURE_ATTRIBUTE_1', name: 'Expenditure Attribute 1', "cellClass": "rdg-editor-cell",
            "valueOptions": [],
            "editor": ExpenditureAttributeOneAutocomplete,
            "editor": ({ row, url, key, ...others }) => <ExpenditureAttributeOneAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      {
            resizable: true, width: 200, key: 'EXPENDITURE_ATTRIBUTE_2', name: 'Expenditure Attribute 2', "cellClass": "rdg-editor-cell",
            "valueOptions": [],
            "editor": ExpenditureAttributeTwoAutocomplete,
            "editor": ({ row, url, key, ...others }) => <ExpenditureAttributeTwoAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      {
            resizable: true, width: 200, key: 'EXPENDITURE_ATTRIBUTE_3', name: 'Expenditure Attribute 3', "cellClass": "rdg-editor-cell",
            "valueOptions": [],
            "editor": ExpenditureAttributeThreeAutocomplete,
            "editor": ({ row, url, key, ...others }) => <ExpenditureAttributeThreeAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      {
            resizable: true, width: 200, key: 'EXPENDITURE_ATTRIBUTE_4', name: 'Expenditure Attribute 4', "cellClass": "rdg-editor-cell",
            "valueOptions": [],
            "editor": ExpenditureAttributeFourAutocomplete,
            "editor": ({ row, url, key, ...others }) => <ExpenditureAttributeFourAutocomplete {...others} row={row} />,
            "cellClass": "rdg-editor-cell", editable: true
      },
      { width: 100, resizable: true, key: 'ADDED_BY', name: 'Created By' },
      { width: 100, resizable: true, key: 'ADDED_DATE', name: 'Created Date' },
      { width: 100, resizable: true, key: 'UPDATED_BY', name: 'Edited By' },
      { width: 100, resizable: true, key: 'UPDATED_DATE', name: 'Edited Date' },]


export const formSaveData = (data, udfcolumns, moduleId) => {
      const saveData = data.map(d => {
            const {
                  SR_NO, EXPENDITURE_ID, EXPENDITURE_ATTRIBUTE_1, EXPENDITURE_ATTRIBUTE_2, EXPENDITURE_ATTRIBUTE_3, EXPENDITURE_ATTRIBUTE_4, EXPENDITURE_ATTRIBUTE_1_ID, EXPENDITURE_ATTRIBUTE_2_ID, EXPENDITURE_ATTRIBUTE_3_ID, EXPENDITURE_ATTRIBUTE_4_ID, EXPENDITURE_GROUP,
                  EXPENDITURE_TYPE_ID, EXPENDITURE_SOURCE, EXPENDITURE_MARKUP, CLIENT_EXPENDITURE_LEVEL_1, CLIENT_EXPENDITURE_LEVEL_2,
                  EXPENDITURE_GROUP_ID, CLIENT_EXPENDITURE_LEVEL_3, CLIENT_EXPENDITURE_LEVEL_4, CLIENT_EXPENDITURE_LEVEL_1_ID, CLIENT_EXPENDITURE_LEVEL_2_ID, CLIENT_EXPENDITURE_LEVEL_3_ID, CLIENT_EXPENDITURE_LEVEL_4_ID, TIA, TEAM_EXPENDITURE, ADDITIONAL_MARKUP, ADDITIONAL_BILLING_MARKUP, ROW_NUM, SAVE_MODE, ...others
            } = d
            const udfData = udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
                  UDF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
                  SAVE_MODE: 'I',
                  SR_NO: SR_NO,
                  UDF_ID: UDF_ID
            }))
            const groupDetails = [{
                  SR_NO: SR_NO,
                  EXPENDITURE_ID: EXPENDITURE_ID || 0,
                  EXPENDITURE_GROUP_ID: EXPENDITURE_GROUP_ID || ""
            }]
            return ({
                  EXPENDITURE_ID: EXPENDITURE_ID || "",
                  CLIENT_EXPENDITURE_LEVEL_1_ID: CLIENT_EXPENDITURE_LEVEL_1_ID || 0,
                  CLIENT_EXPENDITURE_LEVEL_2_ID: CLIENT_EXPENDITURE_LEVEL_2_ID || 0,
                  CLIENT_EXPENDITURE_LEVEL_3_ID: CLIENT_EXPENDITURE_LEVEL_3_ID || 0,
                  CLIENT_EXPENDITURE_LEVEL_4_ID: CLIENT_EXPENDITURE_LEVEL_4_ID || 0,
                  CLIENT_EXPENDITURE_LEVEL_1: CLIENT_EXPENDITURE_LEVEL_1 || "",
                  CLIENT_EXPENDITURE_LEVEL_2: CLIENT_EXPENDITURE_LEVEL_2 || "",
                  CLIENT_EXPENDITURE_LEVEL_3: CLIENT_EXPENDITURE_LEVEL_3 || "",
                  CLIENT_EXPENDITURE_LEVEL_4: CLIENT_EXPENDITURE_LEVEL_4 || "",
                  TIA: (TIA === null || TIA === "N") ? "N" : "Y",
                  TEAM_EXPENDITURE: TEAM_EXPENDITURE || "",
                  ADDITIONAL_MARKUP: ADDITIONAL_MARKUP || 0,
                  ADDITIONAL_BILLING_MARKUP: ADDITIONAL_BILLING_MARKUP || 0,
                  EXPENDITURE_ATTRIBUTE_1_ID: EXPENDITURE_ATTRIBUTE_1_ID || 0,
                  EXPENDITURE_ATTRIBUTE_2_ID: EXPENDITURE_ATTRIBUTE_2_ID || 0,
                  EXPENDITURE_ATTRIBUTE_3_ID: EXPENDITURE_ATTRIBUTE_3_ID || 0,
                  EXPENDITURE_ATTRIBUTE_4_ID: EXPENDITURE_ATTRIBUTE_4_ID || 0,
                  EXPENDITURE_ATTRIBUTE_1: EXPENDITURE_ATTRIBUTE_1 || "",
                  EXPENDITURE_ATTRIBUTE_2: EXPENDITURE_ATTRIBUTE_2 || "",
                  EXPENDITURE_ATTRIBUTE_3: EXPENDITURE_ATTRIBUTE_3 || "",
                  EXPENDITURE_ATTRIBUTE_4: EXPENDITURE_ATTRIBUTE_4 || "",
                  SR_NO: SR_NO,
                  SAVE_MODE: SAVE_MODE,
                  UDFDETAILS: udfData,
                  GROUP_DETAILS: groupDetails
            })
      })
      return saveData
}

