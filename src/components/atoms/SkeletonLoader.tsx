import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Skeleton from '@mui/material/Skeleton';

const NewsCardSkeleton: React.FC = () => {
    return (
        <div className='flex justify-between p-4 gap-24'>
            <div className='flex flex-col gap-12 justify-between text-left'>
                <Skeleton variant="text" width={120} height={20} />

                <Skeleton variant="text" width={700} height={80} />

                <Skeleton variant="text" width={'90%'} height={20} />
            </div>
            <Box>
                <Skeleton variant="rectangular" width={450} height={250} />
            </Box>
        </div>
    );
};

export default NewsCardSkeleton;
