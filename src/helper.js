import { bp } from './theme';
export const respCss = (rule, values) => {
  let styles = '';

  if (!values) {
    return;
  }

  Object.keys(values).forEach((key) => {
    styles += `
      @media ${bp[key]} {
         ${rule}: ${values[key]}; 
       }
     `;
  });

  return styles;
};