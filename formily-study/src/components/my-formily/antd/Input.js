import React from 'react'

const Input = (props) => {
  return <input {...props} value={props.value ?? ''} style={{...props.style, border: '1px solid green'}} />
}

export default Input
