import React from 'react';
import PropTypes from 'prop-types';
const CFBSeasonSelector = ({ season, setSeason}) => {
    const seasons = [
    '2021','2020','2019',
    '2018','2017','2016','2015',
    '2014','2013','2012','2011',
    '2010','2009','2008','2007',
    '2006','2005','2004','2003']
  return (
    <form>
      <label htmlFor="seasonselector">
        Season{' '}
        <select
          id="seasonselector"
          value={season}
          onChange={e => {
            const season = e.target.value;
            setSeason(season);
          }}
        >
          {seasons.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

CFBSeasonSelector.propTypes = {
  season: PropTypes.string.isRequired,
  setSeason: PropTypes.func.isRequired,
};

export default CFBSeasonSelector;
