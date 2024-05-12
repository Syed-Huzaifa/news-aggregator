import React, { ChangeEvent } from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, makeStyles, Theme } from '@material-ui/core';

interface SelectProps<T> {
    label: string;
    options: T[];
    onChange: (value: T) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    select: {
        borderRadius: theme.shape.borderRadius,
    },
}));

function Select<T>({ label, options, onChange }: SelectProps<T>) {
    const classes = useStyles();

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as T;
        onChange(selectedValue);
    };

    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                className={classes.select}
                onChange={handleChange}
            >
                {/* {options.map((option, index) => (
                    <MenuItem key={index} value={option.toString()}>{option.toString()}</MenuItem>
                ))} */}
            </MuiSelect>
        </FormControl>
    );
}

export default Select;