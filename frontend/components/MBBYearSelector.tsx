import React from 'react';
import PropTypes from 'prop-types';

const MBBYearSelector = ({ year, setYear}) => {
    const years = [
    '2021','2020','2019',
    '2018','2017','2016','2015',
    '2014','2013','2012','2011',
    '2010','2009','2008','2007',
    '2006','2005','2004','2003']
  return (
    <form>
      <label htmlFor="yearselector">
        Year{' '}
        <select
          id="yearselector"
          value={year}
          onChange={e => {
            const year = e.target.value;
            setYear(year);
          }}
        >
          {years.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

MBBYearSelector.propTypes = {
  year: PropTypes.string.isRequired,
  setYear: PropTypes.func.isRequired,
};

export default MBBYearSelector;
