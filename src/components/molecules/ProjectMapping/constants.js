import { IconButton } from "@mui/material"
import CustomRowSelector from "../../atoms/Editors/CustomRowSelector"


export const columns = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell rdg-editor-cell_ckeckbox",
    sortable: false,
    frozen: false,
    headerRenderer: null,
    formatter: CustomRowSelector,
  },
  { resizable: true, key: 'GROUP_NAME', name: 'Client Project Group', formatter: ({ row, otherFunctions }) => {
    const { onClientProjectGroupClick = () => null } = otherFunctions
    return (
      <span >
        <span className="text-link" onClick={() => onClientProjectGroupClick(row)} >{row.GROUP_NAME}</span>
      </span>
    )}
  },
  { resizable: true, key: 'CT_NO_PEOPLESOFT_CT_PO', name: 'Contract Number (PeopleSoft Contract PO)',  },
  { resizable: true, key: 'CT_NO_PS_WORKAUTHO_PO', name: 'Contract Number 1 (PS Work Authorization PO)',  },
  { resizable: true, key: 'CT_NO_LEGACY_CONTRACT', name: 'Contract Number 2 (Legacy Contract No.)',  },
  { resizable: true, key: 'CT_NO_LEGACY_WA', name: 'Contract Number 3 (Legacy WA No.)',  },
  { width: 30, key: 'edit', name: '', formatter: ({ otherFunctions, row }) => {
    const onClick = () => {
      const { onEdit } = otherFunctions
      if (onEdit) {
        onEdit(row)
      }
    }
    return (
      <div className="rdg-table-edit-button" >
        <IconButton size="small" onClick={() => onClick('edit')} ><i className="la la-pen" /></IconButton>
      </div>
    )}
  }
]

export const formColumns = [
  { required: true, field: 'GROUP_NAME', headerName: 'Client Project Group', type: 'text', group: 'project', placeholder: 'Enter group name' },
  { required: true, field: 'CT_NO_PEOPLESOFT_CT_PO', headerName: 'Contract Number (PeopleSoft Contract PO)', type: 'text', group: 'contract', placeholder: 'Enter number' },
  { required: false, field: 'BUDGET_AMOUNT', headerName: 'Budget Amount', type: 'currency', group: 'contract', placeholder: '0.00', format: 'Currency' },
  { required: false, field: 'CT_NO_PS_WORKAUTHO_PO', headerName: 'Contract Number 1 (PS Work Authorization PO)', type: 'text', group: 'contract', placeholder: 'Enter number' },
  { required: false, field: 'PERIOD_START', headerName: 'Start date', type: 'date', group: 'contract', placeholder: 'DD-MMM-YYYY' },
  { required: false, field: 'CT_NO_LEGACY_CONTRACT', headerName: 'Contract Number 2 (Legacy Contract No.)', type: 'text', group: 'contract', placeholder: 'Enter number' },
  { required: false, field: 'PERIOD_END', headerName: 'End date', type: 'date', group: 'contract', placeholder: 'DD-MMM-YYYY' },
  { required: false, field: 'CT_NO_LEGACY_WA', headerName: 'Contract Number 3 (Legacy WA No.)', type: 'text', group: 'contract', placeholder: 'Enter number' },
  { required: true, field: 'CONTRACT_STATUS', headerName: 'Contract Status ', type: 'dropdown', group: 'contract', values: [{ name: 'ACTIVE', value: 'Y' }, { name: 'INACTIVE', value: 'N' }], placeholder: 'Select status' },
  { required: true, field: 'CLIENT_NAME', dependentKey: 'CLIENT_NUMBER', otherDependentKey: 'CLIENT_ID',  headerName: 'Client Name', type: 'autocompletecustom', group: 'client', cell: {
    apiUrl: '/GetClientSearchName', apiMethod: 'get', apiParams: {}, apiSearchKey: 'ClientName', responseIdKey: 'CLIENT_NUMBER', responseDescriptionKey: 'Description', responseOtherKey: 'ID'
  }, placeholder: 'Search name' },
  { required: true, field: 'CLIENT_NUMBER', headerName: 'Client Number', type: 'number', group: 'client', disabled: true, placeholder: 'Enter number' },
  // { required: false, field: 'CLIENT_CODE', headerName: 'Client Code', type: 'number', group: 'client' },
  { required: false, field: 'EMPLOYEE_NAME', dependentKey: 'CONTRACT_ADMINISTRATOR', headerName: 'Contract Administrator', type: 'autocompletecustom', group: 'client', cell: {
    apiUrl: '/GetEmployeeList', apiMethod: 'get', apiParams: {}, apiSearchKey: 'EMPLOYEE_NAME', responseIdKey: 'EMPLOYEE_ID', responseDescriptionKey: 'EMPLOYEE_NAME'
  }, placeholder: 'Search name'},
  // { required: false, field: 'PERCENTAGE_FUNDS_USED', headerName: 'Percentage Funds Used', type: 'percent', group: 'contract', placeholder: 'Enter %' },
]
