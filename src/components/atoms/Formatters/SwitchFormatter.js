import React from 'react'
import { Switch } from '@mui/material'

export const editorClassname = `rdg-text-editor rdg-switch`;

export default function SwitchFormatter({
  row,
  column,
}) {
  return (
    <div className={`disp-flex full-width center ${editorClassname}`} ><Switch disabled checked={row[column.key] === 'Y'} /></div>
  );
}