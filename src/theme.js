import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const size = {
  mobile: '320px',
  mobileM: '375px',
  mobileL: '480px',
  tablet: '640px',
  tabletM: '800px',
  laptop: '960px',
  laptopM: '1280px',
  laptopL: '1440px',
  laptopXL: '1920px',
};

export const device = {
  mobile: `(min-width: ${size.mobile})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  tabletM: `(min-width: ${size.tabletM})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopM: `(min-width: ${size.laptopM})`,
  laptopL: `(min-width: ${size.laptopL})`,
  laptopXL: `(min-width: ${size.laptopXL})`,
};

export const bp = {
  sm: device.mobile,
  md: device.tablet,
  lg: device.laptop,
  xl: device.laptopM,
};

export const colors = {
  black: '#000',
  white: '#FFF',
  transparent: 'transparent',
  gray:'#E6E6E6',
  darkgray: '#555555',
  blue: '#231EDC',

  primary: {
    navy25: '#C3BFD6',
    navy50: '#8780AE',
    navy75: '#4C4085',
    navy100: '#10005D',

    black75: '#333333',
    black90: '#010101',

    blue25: '#C3CCE5',
    blue50: '#8898CB',
    blue75: '#4C65B1',
    blue100: '#113297',

    orange25: '#FFD2CF',
    orange50: '#FFA5A0',
    orange75: '#FF7870',
    orange100: '#FF4B41',

    red25: '#ECC7C9',
    red50: '#D98E92',
    red75: '#C7565C',
    red100: '#B41E26',

    white70: 'rgba(255, 255, 255, 0.7)',
    white20: 'rgba(255, 255, 255, 0.2)',

    redp1: '#D72850',
    redp2: '#FF465F',
    redp3: '#FF9191',
    red70p3: 'rgba(255, 145, 145, 0.7)',

    n1: '#333333',
    n2: '#A5A5A5',
    n5: '#EEEEEE',

    yellowp1: '#FFA014',
    yellowp2: '#FFB41E',
    yellowp3: '#FFDC78',
    yellowp4: '#C05C27',

    themep1: '#231EDC',//BLUES_P1:#231EDC ,PURPLES_P1:#690A28,REDS_P1://#D72850,YELLOW_P1://#FFA014,GREENS_P1: //#007D55
    themep2:'#0A7DFF',// BLUES_P2:#0A7DFF, PURPLES_P2:#A800A8,REDS_P2://#FF465F,YELLOW_P2://#FFB41E,GREENS_P2: //#0AD287
    themep3: '#5AE6FF',// BLUES_P3:#5AE6FF, PURPLES_P3:#D7A5F5,REDS_P3://#FF9191,YELLOW_P3://#FFDC78,GREENS_P3: //#78FAC8
    themep4: '#001E55'// BLUES_P4:#001E55, PURPLES_P4:#460F32,REDS_P4://#690A28,YELLOW_P4://#C05C27,GREENS_P4: //#003C2D

  },

  accent: {
    gray25: '#EFEFEC',
    gray50: '#DFDFD9',
    gray75: 'D0D0C6',
    gray100: 'C0C0B3',

    sand25: '#F5EEE6',
    sand50: '#EBDCCD',
    sand75: '#E2CBB5',
    sand100: '#D8BA9C',

    green25: '#E6EDE5',
    green50: '#CDDBCA',
    green75: '#B4C9B0',
    green100: '#9BB796',

    teal25: '#E5EBF4',
    teal50: '#CBD7E9',
    teal75: '#B1C3DF',
    teal100: '#97AFD4',

    liliac25: '#EDE8F7',
    liliac50: '#DBD0EF',
    liliac75: '#C9B9E8',
    liliac100: '#B7A2E0',

    pink25: '#FAEAED',
    pink50: '#F4D6DB',
    pink75: '#EFC1CA',
    pink100: '#EAADB8',

    yellow25: '#F8F0DC',
    yellow50: '#F1E2B9',
    yellow75: '#EBD396',
    yellow100: '#E4C573',
  },
};

export const textSize = {
  text1: {
    laptop: '6.4rem',
    tablet: '4rem',
    mobile: '2.5rem',
  },

  text2: {
    laptop: '3.2rem',
    tablet: '3.5rem',
    mobile: '2.3rem',
  },

  text3: {
    laptop: '2.4rem',
    tablet: '2.5rem',
    mobile: '1.8rem',
  },
  text4: {
    laptop: '1.875rem',
    tablet: '1.875rem',
    mobile: '1.875rem',
  },
  text5: {
    laptop: '16px',
    tablet: '16px',
    mobile: '16px'
  },
  text6: {},

  body: {
    laptop: '1.8rem',
    tablet: '1.9rem',
    mobile: '1.7rem',
  },

  body2: {
    laptop: '1.6rem',
    mobile: '1.4rem'
  },
};

export const lineHeight = {
  text1: {
    laptop: '7.6rem',
    tablet: '',
    mobile: '',
  },

  text2: {
    laptop: '4.2rem',
    tablet: '',
    mobile: '',
  },

  text3: {
    laptop: '3.2rem',
    tablet: '',
    mobile: '',
  },

  text4: {
    laptop: '2.393rem',
    tablet: '',
    mobile: '',
  },

  text5: {
    laptop: '1.276rem',
    tablet: '',
    mobile: '',
  },

  body: {
    laptop: '2.8rem',
    tablet: '',
    mobile: '',
  },

  body2: {
    laptop: '1.6rem',
    tablet: '',
    mobile: '',
  },
};

export const spacers = {
  spacer1: '4px',
  spacer2: '8px',
  spacer3: '12px',
  spacer4: '16px',
  spacer5: '32px',
  spacer6: '48px',
  spacer7: '72px',
};


// material ui theme

export const THEME = createTheme({
  palette: {
    primary: {
      main: '#231EDC'
    }
  },
  typography: {
    body2: {
      fontFamily: "Jacobs Chronos"
    },
   "fontFamily": ["Jacobs Chronos"].join(","),
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  },
  components: {
    MuiButtonGroup: {
      textTransform: 'none'
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'text' },
          style: {
            color: '#444444',
            fontSize: '14px',
            lineHeight: '24px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              opacity: '0.8',
              boxShadow: 'none',
            },
            '&:disabled': {
              opacity: '0.5',
              boxShadow: 'none',
              color: '#444444',
              cursor: 'not-allowed',
              pointerEvents: 'auto',
            }
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            background: '#231EDC',
            color: '#FFFFFF',
            fontFamily: 'Jacobs Chronos',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '24px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: '0px 1px 2px rgba(35, 30, 220, 0.2), 0px 2px 4px rgba(35, 30, 220, 0.2)',
            borderRadius: '4px',
            '&:hover': {
              background: '#1C18AF',
              opacity: '0.8',
              borderRadius: '4px',
              boxShadow: '0px 1px 2px rgba(0, 30, 85, 0.2), 0px 2px 4px rgba(0, 30, 85, 0.2);',
            },
            '&:disabled': {
              background: '#E6E6E6',
              opacity: '0.5',
              boxShadow: 'none',
              color: '#999999',
              cursor: 'not-allowed',
              pointerEvents: 'auto',
            },
            '&:focus': {
              background: '#231EDC',
              opacity: '0.5',
              // border: '2px solid #FFFFFF',
              borderRadius: '4px',
              boxShadow: '0px 1px 2px rgba(35, 30, 220, 0.2), 0px 2px 4px rgba(35, 30, 220, 0.2)'
            },
            '&:click': {
              background: '#1C18AF',
              opacity: '0.8',
              borderRadius: '4px'
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            background: '#E6E6E6',
            fontFamily: 'Jacobs Chronos',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#222222',
            fontSize: '14px',
            lineHeight: '24px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: '4px',
            '&:hover': {
              background: '#C8C8C8',
              opacity: '0.8',
              boxShadow: 'none',
              borderRadius: '4px',
            },
            '&:disabled': {
              background: '#E6E6E6',
              opacity: '0.5',
              boxShadow: 'none',
              color: '#999999',
              cursor: 'not-allowed',
              pointerEvents: 'auto',
            },
            '&:focus': {
              background: '#E6E6E6',
              opacity: '0.5',
              // border: '2px solid #444444',
              borderRadius: '4px',
            },
            '&:click': {
              background: '#C8C8C8',
              opacity: '0.8',
              boxShadow: 'none',
              borderRadius: '4px',
            }
          },
        },
        {
          props: { variant: 'contained', color: 'success' },
          style: {
            background: '#FFFFFF',
            fontFamily: 'Jacobs Chronos',
            fontStyle: 'normal',
            fontWeight: 'normal',
            border: '1px solid #C8C8C8',
            color: '#222222',
            fontSize: '14px',
            lineHeight: '24px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: '4px',
            '&:hover': {
              background: '#E6E6E6',
              opacity: '0.8',
              boxShadow: 'none',
              borderRadius: '4px',
              border: '1px solid #888888',
            },
            '&:disabled': {
              background: '#FFFFFF',
              border: '1px solid #D7D7D7',
              opacity: '0.5',
              boxShadow: 'none',
              color: '#999999',
              cursor: 'not-allowed',
              pointerEvents: 'auto',
            },
            '&:focus': {
              background: '#E6E6E6',
              opacity: '0.5',
              border: '2px solid #444444',
              borderRadius: '4px',
            },
            '&:click': {
              background: '#E6E6E6',
              opacity: '0.8',
              boxShadow: 'none',
              borderRadius: '4px',
              border: '1px solid #888888',
            }
          },
        },
        {
          props: { variant: 'text', color: 'info' },
          style: {
            background: '#FFFFFF',
            fontFamily: 'Jacobs Chronos',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#222222',
            fontSize: '14px',
            lineHeight: '24px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: '4px',
            '&:hover': {
              background: '#E6E6E6',
              opacity: '0.8',
              boxShadow: 'none',
              borderRadius: '4px',
            },
            '&:disabled': {
              background: '#FFFFFF',
              opacity: '0.5',
              boxShadow: 'none',
              color: '#999999',
              cursor: 'not-allowed',
              pointerEvents: 'auto',
            },
            '&:focus': {
              background: '#E5E5E5',
              opacity: '0.5',
              border: '2px solid #444444',
              borderRadius: '4px',
            },
            '&:click': {
              background: '#E6E6E6',
              opacity: '0.8',
              boxShadow: 'none',
              borderRadius: '4px',
            }
          },
        },
      ],
    },

    MuiCheckbox: {
     
      variants: [
        {
          props: { color: 'info' },
          style: {
            background: '#F0F0F0',
            border: '1px solid #D7D7D7',
            color: '#F0F0F0',
            borderRadius: '4px',
            padding: '0px',
            height: '20px',
            width: '20px',
            '&:hover': {
              background: '#F0F0F0',             
              border: '2px solid #444444',
              padding: '0px',
              borderRadius: '4px',
              height: '20px',
              width: '20px',
            },
            '&.Mui-disabled': {
              background: '#FDFDFD',
              border: '1px solid #E1E1E1',
              color: '#FDFDFD',
              cursor: 'not-allowed',
              pointerEvents: 'auto',
              padding: '0px',
              height: '20px',
              width: '20px',
            },
            '&.Mui-checked': {
              color: '#231EDC',
              background: 'none',
              border: 'none',
              '&.Mui-disabled': {
              color: '#E1E1E1',
              background: 'none',
              border: 'none',
              height: '20px',
              width: '20px',
              },
            },
          },
        },
        {
          props: { color: 'success' },
          style: {
            background: '#FDFDFD',
            border: '1px solid #D7D7D7',
            color: '#FDFDFD',
            borderRadius: '4px',
            padding: '0px',
            height: '20px',
            width: '20px',
            '&:hover': {
              background: '#FDFDFD',             
              border: '2px solid #444444',
              padding: '0px',
              borderRadius: '4px',
              height: '20px',
              width: '20px',
            },
            '&.Mui-disabled': {
              background: '#FDFDFD',
              border: '1px solid #E1E1E1',
              color: '#FDFDFD',
              cursor: 'not-allowed',
              pointerEvents: 'auto',
              padding: '0px',
              height: '20px',
              width: '20px',
            },
            '&.Mui-checked': {
              color: '#231EDC',
              background: 'none',
              border: 'none',
              height: '20px',
              width: '20px',
              '&.Mui-disabled': {
              color: '#231EDC',
              background: 'none',
              border: 'none',
              opacity:'0.5',
              height: '20px',
              width: '20px',
              },
            },
          },
        },
      ],
    },

    MuiTextField  : {

      variants: [
        {
          props: { color: 'primary'},
          style: {
            // '& label.Mui-focused': {
            //   color: 'green',
            // },
            // '& .MuiInput-underline:after': {
            //   borderBottomColor: 'green',
            // },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#EBEBEB',
              },
              '&:hover fieldset': {
                borderColor: '#EBEBEB',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#222222',
              },
              '&.Mui-disabled fieldset': {
                borderColor: '#EBEBEB',
              },
            },
              

            }
    
          }
      ]
    },

  }
});