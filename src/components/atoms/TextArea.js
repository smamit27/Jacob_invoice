import React from 'react';
import styled from 'styled-components/macro';
import { colors } from '../../theme';

export const InputWrapper = styled.textarea`
  background: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 1;
  padding: 15px 10px;
  width: 58%;
  font-family: Jacobs Chronos;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 30%;
  display: flex;
  align-items: center;
  outline: none;
  resize: none;
  color: #222222;
  opacity: 0.75;
`;

export const TextArea = ({ bg, color, placeholder, value, name, type,onChange }) => {
  return (
    <InputWrapper color={color} bg={bg}  value={value} name={name}  placeholder={placeholder} type={type} 
                onChange={onChange}
    >
    </InputWrapper>
  );
};

TextArea.defaultProps = {
  color: colors.primary.n2,
  bg: colors.white,
  placeholder: '',
  type: ''
};
