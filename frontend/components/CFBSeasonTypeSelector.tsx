import React from 'react';
import PropTypes from 'prop-types';

const CFBSeasonTypeSelector = ({ week, seasonType, setSeasonType}) => {
    const stypes = [
    'Regular',
    'Post']
    const stype = week==='Bowls'? 'Post':seasonType;
  return (
    <form>
      <label htmlFor="stypeselector">
        Season Type{' '}
        <select
          id="stypeselector"
          value={stype}
          onChange={e => {
            const seasonType = e.target.value;
            setSeasonType(seasonType);
          }}
        >
          {stypes.map((d,idx) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

CFBSeasonTypeSelector.propTypes = {
    
  week: PropTypes.string.isRequired,
  seasonType: PropTypes.string.isRequired,
  setSeasonType: PropTypes.func.isRequired,
};

export default CFBSeasonTypeSelector;
