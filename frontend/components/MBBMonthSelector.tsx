import React from 'react';
import PropTypes from 'prop-types';

const MBBMonthSelector = ({ month, setMonth}) => {
    const months = [
    '01','02','03',
    '04','05','06','07',
    '08','09','10','11',
    '12']
  return (
    <form>
      <label htmlFor="monthselector">
        Month{' '}
        <select
          id="monthselector"
          value={month}
          onChange={e => {
            const month = e.target.value;
            setMonth(month);
          }}
        >
          {months.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

MBBMonthSelector.propTypes = {
  month: PropTypes.string.isRequired,
  setMonth: PropTypes.func.isRequired,
};

export default MBBMonthSelector;
