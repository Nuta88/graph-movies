import { MenuItem, TextField } from '@mui/material';

const Select = ({ label, value, options, name, onSelect, ...rest }) => {
  return (
    <TextField
      id={name}
      name={name}
      select
      value={value}
      label={label}
      onChange={onSelect}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
