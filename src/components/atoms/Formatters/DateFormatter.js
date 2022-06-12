import React from 'react'
import { format } from 'date-fns';

export default function DateFormatter({
  row,
  column,
  style = {},
  className = '',
}) {
  let date = row[column.key]
  try {
    date = row[column.key] ? format(new Date(row[column.key]), 'dd-MMM-yyyy') : row[column.key]
  } catch (err) {
    console.log(err, date);
    date = row[column.key]
  }
  return (
    <span style={style} className={className} >
      {date || ''}
    </span>
  )
}
