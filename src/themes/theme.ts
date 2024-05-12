import { blue } from '@material-ui/core/colors';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
    typography: {
        fontFamily: [
            'nyt-cheltenham',
            'georgia',
            'times new roman',
            'times',
            'serif',
        ].join(','),
        h5: {
            textDecoration: 'underline',
            color: 'black',
            fontWeight: 'bold',
        },
        h6: {
            textDecoration: 'underline',
            color: 'black',
            fontWeight: 'bold',
        }
    },
    palette: {
        primary: {
            main: grey[800],
        },
        text: {
            primary: grey[700],
        },
        background: {
            default: grey[200],
        },
    },
});