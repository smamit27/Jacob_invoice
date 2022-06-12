import React, { useRef, useEffect } from 'react'


export const textEditorClassname = `rdg-text-editor rdg-editor-input`;

function autoFocusAndSelect(input) {
  input?.focus();
  input?.select();
}

export default function TextEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions,
  ...props
}) {
  const prev = useRef(row[column.key] || '')
  const { onCellBlur, getChange, onEditStart } = otherFunctions

  useEffect(() => {
    if (onEditStart) {
      onEditStart(row, column.key)
    }
  }, [])

  const onChange = (event) => {
    onRowChange({ ...row, [column.key]: event.target.value })
    if (getChange) {
      getChange({ ...row, [column.key]: event.target.value }, column.key, prev.current)
    }
  }
  function onKeyDown(event) {
    if (event.key === 'Enter') {
      if (onCellBlur) {
        onCellBlur(row, column.key, prev.current)
      }
    }
  }
  const onBlur = () => {
    if (onCellBlur) {
      onCellBlur(row, column.key, prev.current)
    }
    onClose(true)
  }
  return (
    <input
      onKeyDown={onKeyDown}
      className={textEditorClassname}
      ref={autoFocusAndSelect}
      value={row[column.key] || ''}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}