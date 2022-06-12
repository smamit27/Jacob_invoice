import React from 'react'
import NumberFormat from 'react-number-format'

export default function NumberFormatterEmpty({
  row,
  column,
  style = {},
  className = '',
  value,
  type,
  format,
}) {
  const additionalProps = {
    decimalScale: 2,
    fixedDecimalScale: true,
    ...((column?.format === 'Percent' || format === 'Percent') ? { suffix: '%',  } : {}),
    ...((column?.type === 'Currency' || type === 'Currency') ? { thousandsGroupStyle: 'thousand', thousandSeparator: true } : {})
  }
  return (
    <span style={style} className={column?.type === 'Currency' || type === 'Currency' ? `currencyData ${className}` : className} >
      <NumberFormat {...additionalProps} value={(value !== undefined ? value : row[column.key]) || ''} displayType="text" />
    </span>
  )
}
