import { CircularProgress, Tooltip } from '@mui/material';
import NumberEditor from '../../atoms/Editors/NumberEditor';
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';
import TextFilter from '../../atoms/Filters/TextFilter';
import useGetProjects from './useGetProjects';
import { useState } from 'react';

const textAlign = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%'
}

export default function GroupTooltip({row, otherFunctions, ...props}) {
  const [open, setOpen] = useState(false);
  const { isLoading, getProjects, data = [] } = useGetProjects({})
  const { collectionId } = otherFunctions

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    getProjects(row.CLIENT_PROJECT_GROUP, collectionId)
    setOpen(true);
  };

  return (
    <span style={textAlign} >
      <span className="bold">{row?.GROUP_NAME || null}</span>
      <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' open={open} onClose={handleClose} onOpen={handleOpen} title={`Project Numbers: ${data.join(', ')}`}>
        {isLoading ? <CircularProgress size={30} /> : <i style={{ fontSize: 22, marginLeft: 5 }} className="las la-info-circle"></i>}
      </Tooltip>
    </span>
  );
}

const GroupLink = ({row, otherFunctions, ...props}) => {
  const { isLoading, getProjects } = useGetProjects({ onFinish })
  const { onLinkClick, collectionId } = otherFunctions
  function onFinish (data) {
    if (onLinkClick) {
      onLinkClick(data)
    }
  }
  const onClick = () => {
    getProjects(row.CLIENT_PROJECT_GROUP, collectionId)
  }
  return (
    <span className='text-link' onClick={onClick} ><NumberFormatter row={row} otherFunctions={otherFunctions} {...props} />{isLoading && <CircularProgress size={30} />}</span>
  )
}

export const CLIENT_COLUMNS = [
  {
    resizable: true,
    key: 'GROUP_NAME',
    name: 'client Project group (Power iNVOICE)',
    summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) },
    // filterEditor: TextFilter,
    formatter: GroupTooltip
  },
  {
    resizable: true,
    key: 'ORACLE_APPROVED_REVENUE_BUDGET',
    name: 'Oracle Approved Revenue Budget',
    type: 'Currency',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'PI_FUNDING_ALLOCATION_AMOUNT',
    name: 'Power Invoice Funding Allocation Amount',
    type: 'Currency',
    formatter: GroupLink,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'REMAINING_TO_ALLOCATE',
    name: 'Remaining to Allocate',
    type: 'Currency',
    formatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_ALLOCATE > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Please allocate remaining funds.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_ALLOCATE > 0 ? { color: '#D72850' } : {}) }} {...props} />
      </span>
    ),
    summaryFormatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_ALLOCATE > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Please allocate remaining funds.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_ALLOCATE > 0 ? { color: '#D72850' } : {}) }} {...props} className='bold' />
      </span>
    )
  },
  {
    resizable: true,
    key: 'PI_BUDGET_AMOUNT',
    name: 'Power Invoice Budget Amount',
    type: 'Currency',
    formatter: GroupLink,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'REMAINING_TO_BUDGET',
    name: 'Remaining to Budget',
    type: 'Currency',
    formatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_BUDGET > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining budget not yet allocated.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_BUDGET > 0 ? { color: '#D72850' } : {}) }} {...props} />
      </span>
    ),
    summaryFormatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_BUDGET > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining budget not yet allocated.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_BUDGET > 0 ? { color: '#D72850' } : {}) }} {...props} className='bold' />
      </span>
    )
  },
  {
    resizable: true,
    key: 'BILLING_TO_DATE',
    name: 'Billing to Date',
    type: 'Currency',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'REMAINING_FUNDS',
    name: 'Remaining funds',
    type: 'Currency',
    formatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_FUNDS < 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining funds exceeded.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_FUNDS < 0 ? { color: '#D72850' } : {}) }} {...props} />
      </span>
    ),
    summaryFormatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_FUNDS < 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining funds exceeded.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_FUNDS < 0 ? { color: '#D72850' } : {}) }} {...props} className='bold' />
      </span>
    )
  },
  {
    resizable: true,
    key: 'PERCENTAGE_BILLED',
    name: '% Billed',
    type: 'Numeric',
    format: 'Percent',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'PERCENTAGE_FUNDS_USED',
    name: '% Funding Limit',
    "cellClass": "rdg-editor-cell",
    editor: NumberEditor,
    type: 'Numeric',
    format: 'Percent',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
]

export const PROJECT_COLUMNS = [
  {
    resizable: true,
    key: 'PROJECT_NUMBER',
    name: 'Project (Oracle PA)',
    summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) },
    // filterEditor: TextFilter
  },
  {
    resizable: true,
    key: 'ORACLE_APPROVED_REVENUE_BUDGET',
    name: 'Oracle Approved Revenue Budget',
    type: 'Currency',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'PI_FUNDING_ALLOCATION_AMOUNT',
    name: 'Power Invoice Funding Allocation Amount',
    type: 'Currency',
    formatter: ({row, otherFunctions, ...props}) => {
      const onClick = () => {
        const { onLinkClick } = otherFunctions
        if (onLinkClick) {
          onLinkClick([row.PROJECT_NUMBER])
        }
      }
      return (
        <span className='text-link' onClick={onClick} ><NumberFormatter row={row} otherFunctions={otherFunctions} {...props} /></span>
      )
    },
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'REMAINING_TO_ALLOCATE',
    name: 'Remaining to Allocate',
    type: 'Currency',
    formatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_ALLOCATE > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Please allocate remaining funds.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_ALLOCATE > 0 ? { color: '#D72850' } : {}) }} {...props} />
      </span>
    ),
    summaryFormatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_ALLOCATE > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Please allocate remaining funds.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_ALLOCATE > 0 ? { color: '#D72850' } : {}) }} {...props} className='bold' />
      </span>
    )
  },
  {
    resizable: true,
    key: 'PI_BUDGET_AMOUNT',
    name: 'Power Invoice Budget Amount',
    type: 'Currency',
    formatter: ({row, otherFunctions, ...props}) => {
      const onClick = () => {
        const { onLinkClick } = otherFunctions
        if (onLinkClick) {
          onLinkClick([row.PROJECT_NUMBER])
        }
      }
      return (
        <span className='text-link' onClick={onClick} ><NumberFormatter row={row} otherFunctions={otherFunctions} {...props} /></span>
      )
    },
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'REMAINING_TO_BUDGET',
    name: 'Remaining to Budget',
    type: 'Currency',
    formatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_BUDGET > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining budget not yet allocated.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_BUDGET > 0 ? { color: '#D72850' } : {}) }} {...props} />
      </span>
    ),
    summaryFormatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_TO_BUDGET > 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining budget not yet allocated.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_TO_BUDGET > 0 ? { color: '#D72850' } : {}) }} {...props} className='bold' />
      </span>
    )
  },
  {
    resizable: true,
    key: 'BILLING_TO_DATE',
    name: 'Billing to Date',
    type: 'Currency',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'REMAINING_FUNDS',
    name: 'Remaining funds',
    type: 'Currency',
    formatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_FUNDS < 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining funds exceeded.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_FUNDS < 0 ? { color: '#D72850' } : {}) }} {...props} />
      </span>
    ),
    summaryFormatter: ({ row, ...props }) => (
      <span style={textAlign} >
        {row?.REMAINING_FUNDS < 0 && <Tooltip componentsProps={{ tooltip: { style: { fontSize: 14 } } }} placement='right' title='Remaining funds exceeded.' arrow><i style={{ fontSize: 22, marginRight: 5 }} className="las la-info-circle"></i></Tooltip>}
        <NumberFormatter row={row} style={{ ...(row?.REMAINING_FUNDS < 0 ? { color: '#D72850' } : {}) }} {...props} className='bold' />
      </span>
    )
  },
  {
    resizable: true,
    key: 'PERCENTAGE_BILLED',
    name: '% Billed',
    type: 'Numeric',
    format: 'Percent',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    key: 'PERCENTAGE_FUNDS_USED',
    name: '% Funding Limit',
    "cellClass": "rdg-editor-cell",
    editor: NumberEditor,
    type: 'Numeric',
    format: 'Percent',
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
]