import { Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';

export const Loader = () => {
    const [loader, setLoader] = useState(false)
    
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: theme => theme.zIndex.drawer + 1
            }}
            open={loader}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};