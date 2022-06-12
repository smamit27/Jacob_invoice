
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';

export const PO_COLUMNS = [
  { width: 150, key: 'PO_NUMBER', name: 'PO NUMBER', frozen: true, formatter: ({ otherFunctions, row }) => {
    const onClick = () => {
      const { onPoDetailClick } = otherFunctions
      if (onPoDetailClick) {
        onPoDetailClick(row)
      }
    }
    return (
      <span style={{ textDecoration: "underline",color: "#231EDC" }} className="hand" onClick={onClick} >{row.PO_NUMBER}</span>
    )} , summaryFormatter() { return (<div className="bold text-center">Total</div>) }},
  { width: 150, key: 'PO_TYPE', name: 'PO Type' },
  { width: 150, key: 'PO_STATUS', name: 'PO Status'},
  { width: 150, key: 'TEAMING_SUBCONTRACTOR', name: 'Teaming Subcontractor', type: "Checkbox" },
  { width: 150, key: 'PROJECT_NUMBER', name: 'PROJECT NUMBER' },
  { width: 150, key: 'BUYERS_NAME', name: 'BUYERS NAME' },
  { width: 150, key: 'EFFECTIVE_START_DATE_DIS', name: 'EFFECTIVE START DATE', },
  { width: 150, key: 'EFFECTIVE_END_DATE_DIS', name: 'EFFECTIVE END DATE' },
  { width: 150, key: 'WORK_DESCRIPTION', name: 'WORK DESCRIPTION' },
  { width: 150, key: 'SOURCE_SYSTEM_CODE', name: 'SOURCE SYSTEM' },
  { width: 150, key: 'BUSINESS_STATUS_1', name: 'BUSINESS Status 1' },
  { width: 150, key: 'BUSINESS_STATUS_2', name: 'BUSINESS Status 2' },
  { width: 150, key: 'BUSINESS_STATUS_3', name: 'BUSINESS Status 3' },
  { width: 150, key: 'BUSINESS_STATUS_4', name: 'BUSINESS Status 4' },
  { width: 150, key: 'AMOUNT', name: 'Amount', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,},
  { width: 150, key: 'AMOUNT_SPENT', name: 'Amount Spent', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
  { width: 150, key: 'REMAINING', name: 'REMAINING', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
  { width: 150, key: 'ADDED_DATE', name: 'Created date', formatter: DateFormatter,},    
  { width: 150, key: 'ADDED_BY', name: 'User ID (EDITED BY?)' }
]

export const PO_DETAILS_COLUMNS = [
  { width: 150, key: 'REVISION_NUMBER', name: 'Revision Number',frozen: true, summaryFormatter() { return (<div className="bold text-center">Total</div>) }  },
  { width: 220, key: 'PROJECT_NAME', name: 'Project' },
  { width: 150, key: 'TASK_ID', name: 'TASK NUMBER' },
  { width: 230, key: 'EXPENDITURE_TYPE', name: 'expenditure type' },
  { width: 120, key: 'QUANTITY', name: 'QUANTITY' },
  { width: 150, key: 'UNIT_PRICE', name: 'unit price' },
  { width: 150, key: 'AMOUNT', name: 'Amount', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,},
  { width: 150, key: 'AMOUNT_SPENT', name: 'Amount Spent', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
  { width: 150, key: 'REMAINING', name: 'REMAINING', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
  { width: 150, key: 'CREATED_DATE', name: 'Created date', formatter: DateFormatter, }
  ]