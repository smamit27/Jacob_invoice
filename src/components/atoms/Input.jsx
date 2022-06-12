import React from 'react';
import styled from 'styled-components/macro';
import { colors } from '../../theme';

export const InputWrapper = styled.input`
  background: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 1;
  padding: 10px 15px;
  width: 95%;
  font-family: Jacobs Chronos;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #222222;
`;

export const Input = ({ bg, color, placeholder, value, name, type,onChange,onFocus }) => {
  return (
    <InputWrapper color={color} bg={bg}  value={value} name={name}  placeholder={placeholder} type={type} 
                onChange={onChange} onFocus={onFocus}
    >
    </InputWrapper>
  );
};

Input.defaultProps = {
  color: colors.primary.n2,
  bg: colors.white,
  placeholder: '',
  type: ''
};
