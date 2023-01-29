import PropTypes from 'prop-types';

import Input from 'shared/components/Input/Input.styled';

const PhoneBookFilter = ({ onChange, filter }) => {
  return (
    <label>
      Find contacs by name
      <Input onChange={onChange} name="filter" value={filter} />
    </label>
  );
};

export default PhoneBookFilter;

PhoneBookFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
