import React, { useState } from 'react'
import { Chip, OutlinedInput, Stack } from '@mui/material'
import { generateRandomString } from '../../../helpers'

export default function TextFilter({
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
  const onTextChange = (event) => {
    setInput(event.target.value)
  }
  const handleDelete = (dat) => {
    onChange(filters.filter(d => d.id !== dat.id))
  }

  return (
    <Stack spacing={2} >
      <OutlinedInput
        autoFocus
        value={input}
        onChange={onTextChange}
        size='small'
        placeholder='Enter keyword and press Enter'
        onKeyDown={onKeyDown}
      />
      {!!tags.length && (
        <Stack direction='row' flexWrap="wrap" >
          {tags.map((d, i) => (<Chip sx={{ mr: '5px', mb: '5px' }} size='small' key={i} label={d.value} onDelete={() => handleDelete(d)} />))}
        </Stack>
      )}
    </Stack>
  );
}