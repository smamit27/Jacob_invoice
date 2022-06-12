
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';
import CheckboxEditor from '../../atoms/Editors/CheckboxEditor';
import CheckboxFormatter from '../../atoms/Formatters/CheckboxFormatter';
import TextEditor from '../../atoms/Editors/TextEditor';
import SelectEditor from '../../atoms/Editors/SelectEditor';
import DateFormatter from '../../atoms/Formatters/DateFormatter';
export const SUBCONTRACT_COLUMNS = [

    {
        resizable: true,
        width: 220,
        "key": "SUBCONTRACTOR_NAME",
        "name": "SUBCONTRACTOR NAME ",
        frozen: true,
        formatter: ({ otherFunctions, row }) => {
            const onClick = () => {
                const { onPoClick } = otherFunctions
                if (onPoClick) {
                    onPoClick(row)
                }
            }
            return (
                <span style={{ textDecoration: "underline", color: "#231EDC",textTransform: 'capitalize'}} className="hand" onClick={onClick} >{row.SUBCONTRACTOR_NAME.toLowerCase()}</span>
            )

        }
    },
    {  resizable: true, width: 30, key: 'SBE', name: 'SBE', type: 'Checkbox', formatter: ({ row, ...props }) => row.SBE ? <CheckboxFormatter row={row} {...props} /> : null },
    {  resizable: true, width: 30, key: 'MBE', name: 'MBE', type: 'Checkbox', formatter: ({ row, ...props }) => row.MBE ? <CheckboxFormatter row={row} {...props} /> : null },
    {  resizable: true, width: 30, key: 'WBE', name: 'WBE', type: 'Checkbox', formatter: ({ row, ...props }) => row.WBE ? <CheckboxFormatter row={row} {...props} /> : null },
    {  resizable: true, width: 30, key: 'LBE', name: 'LBE', type: 'Checkbox', formatter: ({ row, ...props }) => row.LBE ? <CheckboxFormatter row={row} {...props} /> : null },
    {  resizable: true, width: 120, key: 'TEAMING_SUBCONTRACTOR', name: 'Teaming Subcontractor', type: 'Checkbox', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.TEAMING_SUBCONTRACTOR ? <CheckboxEditor row={row} {...props} /> : null, formatter: ({ row, ...props }) => row.TEAMING_SUBCONTRACTOR ? <CheckboxFormatter row={row} {...props} /> : null },
    {
        resizable: true, width: 140, key: 'STATUS_1', name: 'Status 1', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    },
    {
        resizable: true, width: 140, key: 'STATUS_2', name: 'Status 2', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    },
    {
        resizable: true, width: 140, key: 'STATUS_3', name: 'Status 3', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    },
    {
        resizable: true, width: 140, key: 'STATUS_4', name: 'Status 4', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    }, {
        resizable: true, width: 200, key: 'WORK_DESCRIPTION', name: 'Work Description',
        "editor": TextEditor,
        editable: true, "cellClass": "rdg-editor-cell"
    },
    { width: 100,resizable: true,  key: 'ADDED_BY', name: 'Created By'},
    { width: 100,resizable: true,  key: 'ADDED_DATE', name: 'Created Date'},
    { width: 100,resizable: true,  key: 'UPDATED_BY', name: 'Edited By' },
    { width: 100,resizable: true,  key: 'UPDATED_DATE', name: 'Edited Date'},

]

export const PO_COLUMNS = [
    {
        resizable: true, width: 150, key: 'PO_NUMBER', name: 'PO NUMBER', frozen: true, formatter: ({ otherFunctions, row }) => {
            const onClick = () => {
                const { onPoDetailClick } = otherFunctions
                if (onPoDetailClick) {
                    onPoDetailClick(row)
                }
            }
            return (
                <span style={{ textDecoration: "underline", color: "#231EDC" }} className="hand" onClick={onClick} >{row.PO_NUMBER}</span>
            )
        },
        summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) }
    },
    { resizable: true, width: 130, key: 'PO_TYPE', name: 'PO Type' },
    { resizable: true, width: 130, key: 'PO_STATUS', name: 'PO Status', formatter: ({ row }) => {
        return (
            <span style={{ backgroundColor: "#B6B6B6", color: "#222222",borderRadius: "4px",padding:"0px 18px" }} className="hand"  >{row.PO_STATUS}</span>
        )
    } },
    {  resizable: true, width: 90, key: 'TEAMING_SUBCONTRACTOR', name: 'Teaming Subcontractor', type: 'Checkbox', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.TEAMING_SUBCONTRACTOR ? <CheckboxEditor row={row} {...props} /> : null, formatter: ({ row, ...props }) => row.TEAMING_SUBCONTRACTOR ? <CheckboxFormatter row={row} {...props} /> : null },
    { resizable: true, width: 130, key: 'PROJECT_NUMBER', name: 'PROJECT NUMBER' },
    { resizable: true, width: 150, key: 'BUYERS_NAME', name: 'BUYERS NAME' },
    { resizable: true, width: 130, key: 'EFFECTIVE_START_DATE_DIS', name: 'EFFECTIVE START DATE', },
    { resizable: true, width: 130, key: 'EFFECTIVE_END_DATE_DIS', name: 'EFFECTIVE END DATE' },
    {
        resizable: true, width: 130, key: 'WORK_DESCRIPTION', name: 'Work Description',
        "editor": TextEditor,
        editable: true, "cellClass": "rdg-editor-cell"
    }, { resizable: true, width: 130, key: 'SOURCE_SYSTEM_CODE', name: 'SOURCE SYSTEM' },
    { resizable: true, width: 130, key: 'TIA_PO', name: 'TIA PO' },
    {
         resizable: true, width: 120, key: 'BUSINESS_STATUS_1', name: 'Business Status 1', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    },
    {
         resizable: true, width: 120, key: 'BUSINESS_STATUS_2', name: 'Business Status 2', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    },
    {
         resizable: true, width: 120, key: 'BUSINESS_STATUS_3', name: 'Business Status 3', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    },
    {
         resizable: true, width: 120, key: 'BUSINESS_STATUS_4', name: 'Business Status 4', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
        formatter: ({ row, column }) => {
            const { valueOptions = [] } = column
            const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
            return description
        }
    }, { resizable: true, width: 110, key: 'AMOUNT', name: 'Amount', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />, },
    { resizable: true, width: 110, key: 'AMOUNT_SPENT', name: 'Amount Spent', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
    { resizable: true, width: 110, key: 'AMOUNT_REMAINING', name: 'REMAINING', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
    { width: 100,resizable: true,  key: 'ADDED_BY', name: 'Created By'},
    { width: 100,resizable: true,  key: 'ADDED_DATE', name: 'Created Date'},
    { width: 100,resizable: true,  key: 'UPDATED_BY', name: 'Edited By' },
    { width: 100,resizable: true,  key: 'UPDATED_DATE', name: 'Edited Date'},
    ]
export const PO_DETAILS_COLUMNS = [
    { resizable: true, width: 100, key: 'REVISION_NUMBER', name: 'Revision Number', frozen: true, 
    summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) }
},
    { resizable: true, width: 100, key: 'PROJECT_NUMBER', name: 'Project Number' },
    { resizable: true, width: 110, key: 'TASK_ID', name: 'TASK NUMBER' },
    { resizable: true, width: 200, key: 'ITEM_DESCRIPTION', name: 'Item Description' },
    { resizable: true, width: 150, key: 'EXPENDITURE_TYPE', name: 'expenditure type' },
    { resizable: true, width: 120, key: 'QUANTITY', name: 'QUANTITY' },
    { resizable: true, width: 100, key: 'UNIT_PRICE', name: 'unit price' },
    { resizable: true, width: 110, key: 'AMOUNT', name: 'Amount', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />, },
    { resizable: true, width: 110, key: 'AMOUNT_SPENT', name: 'Amount Spent', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
    { resizable: true, width: 110, key: 'AMOUNT_REMAINING', name: 'REMAINING', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" /> },
]