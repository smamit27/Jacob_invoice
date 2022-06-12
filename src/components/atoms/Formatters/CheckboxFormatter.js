import React from 'react'
import { Checkbox } from '@mui/material'

export const editorClassname = `rdg-text-editor rdg-checkbox`;

export default function CheckboxFormatter({
  row,
  column,
}) {
  return (
    <div className={`disp-flex full-width center ${editorClassname}`} ><Checkbox disabled checked={row[column.key] === 'Y'} /></div>
  );
}
