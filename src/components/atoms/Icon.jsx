import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { respCss } from '../../helper';
import {
  Arrow,Close,Info,Edit,Logo,Cross,ExpandArrow
} from '../../assets/custom-icons';

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : 0)};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : 0)};
 
  ${css`
    ${(props) => respCss('height', props.height)}
  `}

  ${css`
    ${(props) => respCss('width', props.width)}
  `}

  svg {
    display: inline-block;
  }
`;

export const Icon = (props) => {
  const components = {
    arrow: Arrow,
    close: Close,
    info: Info,
    edit: Edit,
    logo: Logo,
    cross:Cross,
    expandArrow:ExpandArrow
  };

  const Icons = components[props.name];

  return (
    <IconWrapper
      mt={props.mt}
      mr={props.mr}
      ml={props.ml}
      width={props.width}
      height={props.height}
    >
      <Icons {...props} />
    </IconWrapper>
  );
};

Icon.defaultProps = {
  height: '22px',
  width: '22px',
};
