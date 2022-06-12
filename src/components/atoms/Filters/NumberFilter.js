import React, { useState } from 'react'
import { Chip, TextField, Stack } from '@mui/material'
import NumberFormat from 'react-number-format';
import { generateRandomString } from '../../../helpers'

export default function NumberFilter({
  column,
  filters,
  onChange
}) {
  const tags = filters.filter(d => d.key === column?.key)
  const [input, setInput] = useState('')
  function onKeyDown(event) {
    if (event.key === 'Enter' && input.trim().length) {
      onChange([...filters, { key: column.key, value: input.trim(), id: generateRandomString(), udf: column?.udf ? 'Y' : 'N' }])
      setInput('')
    }
  }
  const onTextChange = (val) => {
    setInput(val?.value)
  }
  const handleDelete = (dat) => {
    onChange(filters.filter(d => d.id !== dat.id))
  }

  const additionalProps = {
    // ...(column.format === 'Decimal' ? { decimalScale: 2, fixedDecimalScale: true } : {}),
    // ...(column.format === 'Percent' ? { suffix: '%' } : {}),
    // ...(column.type === 'Currency' ? { thousandsGroupStyle: 'thousand', decimalScale: 2, fixedDecimalScale: true, thousandSeparator: true } : {})
  }

  return (
    <Stack spacing={2} >
      <NumberFormat autoFocus onKeyDown={onKeyDown} placeholder="Enter keyword and press Enter" size="small" {...additionalProps} value={input} onValueChange={onTextChange} autoFocus customInput={TextField} />
      {!!tags.length && (
        <Stack direction='row' flexWrap="wrap" >
          {tags.map((d, i) => (<Chip sx={{ mr: '5px', mb: '5px' }} key={i} label={d.value} onDelete={() => handleDelete(d)} />))}
        </Stack>
      )}
    </Stack>
  );
}