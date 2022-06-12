import { styled } from '@mui/system'
import React from 'react'

const LabelComponent = styled('label')({
  fontSize: '13.5px',
  lineHeight: '24px',
  // color: '#777777',
  marginBottom: '7px',
  display: 'block'
})

function Label(props) {
  return (
    <LabelComponent {...props}>
      {props.children}
    </LabelComponent>
  )
}

export default Label
