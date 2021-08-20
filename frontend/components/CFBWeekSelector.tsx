import React from 'react';
import PropTypes from 'prop-types';

const CFBWeekSelector = ({ seasonType, week, setWeek}) => {
    let weeks;
    weeks = [
    '1','2','3',
    '4','5','6','7',
    '8','9','10','11',
    '12','13','14','15','16',
    'Bowls']
    const wk = seasonType==='Post'? '1':week;
  return (
    <form>
      <label htmlFor="weekselector">
        Week{' '}
        <select
          id="weekselector"
          value={wk}
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
  seasonType: PropTypes.string.isRequired,
  week: PropTypes.string.isRequired,
  setWeek: PropTypes.func.isRequired,
};

export default CFBWeekSelector;
