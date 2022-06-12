import { createTheme } from '@mui/system';
import { makeStyles } from '@mui/styles';

const defaultTheme = createTheme();

export const useStylesTable = makeStyles(
  (theme) => {
    return {
      root: {
        '.MuiDataGrid-root': {
          border: 0
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
          textTransform: 'uppercase'
        },
        '& .MuiDataGrid-row:nth-child(even)': {
          backgroundColor:  '#F8F8FE'
        },
        '& .MuiDataGrid-row:nth-child(odd)': {
          backgroundColor: '#EDEDFC'
        },
        '& .MuiDataGrid-cell--editable': {
          backgroundColor: '#FFF'
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none'
        }
      },
    };
  },
  { defaultTheme },
);