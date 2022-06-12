import React from 'react';
import styled from 'styled-components/macro';
// import { Image, Icon } from '../atoms';
import { colors, textSize } from '../../theme';

export const ButtonWrapper = styled.button`
  background-color: ${(props) => props.bg};
  text-decoration:${(props) => props.textDecoration};
  color: ${(props) => props.color};
  border: none;
  padding: ${(props) => props.padding};
  text-transform: capitalize;
  font-size: ${textSize.body2.desktop};
  font-weight:${(props) => props.weight};
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-weight: 700;
  border-radius: 5px;
  margin-right:8px;
  
`;

export const Button = ({ ariaLabel = "Jacobs Button", bg, color, text,textDecoration, action,weight, padding, icon, image, iconcolor, opacity, mobilesrcfile, tabletsrcfile, desktopsrcfile }) => {
  return (
    <ButtonWrapper aria-label={ariaLabel} padding={padding} weight={weight} textDecoration={textDecoration} color={color} bg={bg} onClick={action} arial-lab>
      {text}
      {/* {image && <Image mobilesrcfile={mobilesrcfile} tabletsrcfile={tabletsrcfile} desktopsrcfile={desktopsrcfile} height={'30px'} width={'auto'} />}
      {icon && <Icon name={icon} color={iconcolor} opacity={opacity} />} */}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  color: colors.white,
  bg: colors.primary.orange100,
  text: 'noText',
  mobilesrcfile: "",
  tabletsrcfile: "",
  desktopsrcfile: "",
  action: () => { return },
};
