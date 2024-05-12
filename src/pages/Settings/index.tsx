import React, { useState } from 'react';
import { Box, Select, MenuItem, Typography } from '@material-ui/core';
import { ICategory, categories } from 'src/constants';
import { getLocalStorageData, setLocalStorageData } from 'src/services/local-storage';

const SettingsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { target: { value } } = event;
        setSelectedCategory(typeof value === 'string' ? (value as string).split(',') : value as any[]);
        setLocalStorageData('category', typeof value === 'string' ? (value as string).split(',') : value as any[]);
    }

    return (
        <Box className='flex flex-col justify-between gap-12 w-1/2 mx-auto' border={1} borderColor="grey.300" p={2}>
            <Typography variant='h5'>Please select your desired news category</Typography>
            <Select defaultValue={getLocalStorageData('category') ? getLocalStorageData('category') : []} variant='outlined' value={selectedCategory} multiple={true} label="Category" onChange={handleChange}>
                {categories.map((category: ICategory) => (
                    <MenuItem value={category.value}>{category.title}</MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default SettingsPage;