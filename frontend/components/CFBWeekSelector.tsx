import React from 'react';
import PropTypes from 'prop-types';

const CFBWeekSelector = ({ week, setWeek}) => {
    const weeks = [
    '1','2','3',
    '4','5','6','7',
    '8','9','10','11',
    '12','13','14','15',
    '16','17','18']
  return (
    <form>
      <label htmlFor="weekselector">
        Week{' '}
        <select
          id="weekselector"
          value={week}
          onChange={e => {
            const week = e.target.value;
            setWeek(week);
          }}
        >
          {weeks.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

CFBWeekSelector.propTypes = {
  week: PropTypes.string.isRequired,
  setWeek: PropTypes.func.isRequired,
};

export default CFBWeekSelector;
