import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import { ICategory, categories, ISource, sources } from 'src/constants';
import { getLocalStorageData, setLocalStorageData } from 'src/services/local-storage';
import { useEffect, useState } from 'react';
import { NewsFilters } from 'src/interfaces/newsFilter.interface';
import { DateFilter } from '../atoms/Datepicker';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<NewsFilters>(() => {
    const storedFilters = getLocalStorageData('filters');
    return storedFilters ? JSON.parse(storedFilters) : { category: [], source: [], date: { to: '', from: '' } };
  })

  useEffect(() => {
    setLocalStorageData('userPreferences', JSON.stringify(filters));
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>, fieldName: keyof NewsFilters) => {
    const { target: { value } } = event;

    setFilters(prevState => ({
      ...prevState,
      [fieldName]: typeof value === 'string' ? (value as string).split(',') : value as any[],
    }));
  }

  console.log('filters', filters)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (key: string, value: string) => {
    setFilters(prevState => ({
      ...prevState,
      date: {
        ...prevState.date,
        [key]: value,
      }
    }));
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        <TuneIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select Category
          </DialogContentText>
          <Box className='flex flex-col justify-between gap-12 w-full mx-auto' border={1} borderColor="grey.300" p={2}>
            <Select variant='outlined' value={filters.category} multiple={true} label="Category" onChange={(e) => handleChange(e, 'category')}>
              {categories.map((category: ICategory) => (
                <MenuItem value={category.value}>{category.title}</MenuItem>
              ))}
            </Select>
            <Typography>Select Source</Typography>
            <Select variant='outlined' value={filters.source} multiple={true} label="Category" onChange={(e) => handleChange(e, 'source')}>
              {sources.map((source: ISource) => (
                <MenuItem value={source.value}>{source.title}</MenuItem>
              ))}
            </Select>

            <Box className='flex justify-between gap-4 w-full'>
              <input placeholder="From" className="border border-black p-2 rounded-md" type='date' onChange={(e) => handleDateChange('from', e.target.value)} />
              <input placeholder="To" className="border border-black p-2 rounded-md" type='date' onChange={(e) => handleDateChange('to', e.target.value)} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Apply Filters</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
