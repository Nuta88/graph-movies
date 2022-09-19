import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@mui/material';

const Select = ({
  label,
  value,
  options,
  name,
  onSelect,
  ...rest
}) => (
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
      <MenuItem
        key={option.id}
        value={option.id}
      >
        {option.name}
      </MenuItem>
    ))}
  </TextField>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Select;
