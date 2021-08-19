import React from 'react';
import PropTypes from 'prop-types';

const SeasonTypeSelector = ({ seasonType, setSeasonType}) => {
    const stypes = [
    'Regular',
    'Post']
  return (
    <form>
      <label htmlFor="stypeselector">
        Season Type{' '}
        <select
          id="stypeselector"
          value={seasonType}
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

SeasonTypeSelector.propTypes = {
  seasonType: PropTypes.string.isRequired,
  setSeasonType: PropTypes.func.isRequired,
};

export default SeasonTypeSelector;
