import React from 'react'
import { Checkbox } from '@mui/material'

export const editorClassname = `rdg-text-editor`;

export default function CustomRowSelector({
  row,
  otherFunctions,
}) {
  const { onSelectedRowsChange, selectedRows,disabled=[], selectorKey = 'tableRowId'} = otherFunctions
  const onChange = (e) => {
    if (onSelectedRowsChange) {
      onSelectedRowsChange(e.target.checked, row[selectorKey], row.parentRowId, row)
    }
  }
  return (
    <div className={`disp-flex full-width center ${editorClassname}`} >
      <Checkbox disabled={disabled?.includes(row[selectorKey])} checked={selectedRows?.includes(row[selectorKey])} onChange={onChange} />
    </div>
  );
}
