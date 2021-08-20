import React from 'react';
import PropTypes from 'prop-types';

const DaySelector = ({year, month, day, setDay}) => {
    let days;
    const dateObj = new Date()
    let mnth;
    if(!month){
      mnth = dateObj.getMonth().toString()
    }else{
      mnth = month
    }
    switch(mnth) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        days = ['','01','02','03',
                '04','05','06','07',
                '08','09','10','11',
                '12','13','14','15',
                '16','17','18','19',
                '20','21','22','23',
                '24','25','26','27',
                '28','29','30','31']
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        days = ['','01','02','03',
                '04','05','06','07',
                '08','09','10','11',
                '12','13','14','15',
                '16','17','18','19',
                '20','21','22','23',
                '24','25','26','27',
                '28','29','30']
        break;
      case '02':
        if (((year % 4 == 0) && !(year % 100 == 0))|| (year % 400 == 0))
            days = ['','01','02','03',
                    '04','05','06','07',
                    '08','09','10','11',
                    '12','13','14','15',
                    '16','17','18','19',
                    '20','21','22','23',
                    '24','25','26','27',
                    '28','29']
        else
            days = ['','01','02','03','04',
                    '05','06','07','08',
                    '09','10','11','12',
                    '13','14','15','16',
                    '17','18','19','20',
                    '21','22','23','24',
                    '25','26','27','28']
        break;
      default:
        days = ['','01','02','03',
        '04','05','06','07',
        '08','09','10','11',
        '12','13','14','15',
        '16','17','18','19',
        '20','21','22','23',
        '24','25','26','27',
        '28','29','30','31']
        break;
    }
  return (
    <form>
      <label htmlFor="dayselector">
        Day{' '}
        <select
          id="dayselector"
          value={day}
          onChange={e => {
            const day = e.target.value;
            setDay(day);
          }}
        >
          {days.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

DaySelector.propTypes = {
  day: PropTypes.string.isRequired,
  setDay: PropTypes.func.isRequired,
};

export default DaySelector;