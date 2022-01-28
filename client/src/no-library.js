import React, { useState, useEffect } from 'react';
import data from './data';
import {
  format,
  add,
  previousMonday,
  previousSunday,
  subMonths,
  startOfMonth,
  endOfMonth,
  compareAsc,
  parseISO,
} from 'date-fns';
import './App.css';

const App = () => {
  const mock_data = Object.entries(data)
    .map((item) => {
      return { [item[0]]: item[1] };
    })
    .map((x) => {
      for (const prop in x) {
        return x[prop];
      }
    });
  console.log(mock_data);

  const [DATA, setDATA] = useState(mock_data);

  useEffect(() => {
    console.log(DATA);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.id === 'all') {
      setDATA(mock_data);
    } else if (e.target.id === 'yesterday') {
      console.log(e.target.id);
      const updatedData = mock_data.map((x) => {
        return {
          division: x.division,
          events: x.events.filter((i) => {
            if (compareAsc(parseISO(i.date), parseISO(e.target.value)) === 0) {
              console.log('yes');
              return true;
            }
          }),
        };
      });
      console.log(updatedData);
      setDATA(updatedData);
    } else if (e.target.id === 'last-week') {
      console.log(e.target.id);
      const [initialDate, lastDate] = e.target.value.split('>');
      const updatedData = mock_data.map((x) => {
        return {
          division: x.division,
          events: x.events.filter((x) => {
            if (
              compareAsc(parseISO(x.date), parseISO(initialDate)) === 1 &&
              compareAsc(parseISO(x.date), parseISO(lastDate)) === -1
            ) {
              console.log('yes');
              return true;
            }
          }),
        };
      });
      console.log(updatedData);
      setDATA(updatedData);
    } else if (e.target.id === 'last-month') {
      console.log(e.target.id);
      const [initialDate, lastDate] = e.target.value.split('>');
      const updatedData = mock_data.map((x) => {
        return {
          division: x.division,
          events: x.events.filter((x) => {
            if (
              compareAsc(parseISO(x.date), parseISO(initialDate)) === 1 &&
              compareAsc(parseISO(x.date), parseISO(lastDate)) === -1
            ) {
              console.log('yes');
              return true;
            }
          }),
        };
      });
      console.log(updatedData);
      setDATA(updatedData);
    }
  };

  return (
    <div>
      <div onChange={handleChange}>
        <input type='radio' name='gender' id='all' defaultChecked={true} />{' '}
        <label htmlFor='all'> all</label>
        <input
          type='radio'
          value={format(add(new Date(), { days: -1 }), 'yyyy-MM-dd')}
          name='gender'
          id='yesterday'
        />{' '}
        <label htmlFor='yesterday'> Yesterday</label>
        <input
          type='radio'
          value={
            format(previousMonday(new Date(), 1), 'yyyy-MM-dd') +
            '>' +
            format(previousSunday(new Date(), 1), 'yyyy-MM-dd')
          }
          name='gender'
          id='last-week'
        />{' '}
        <label htmlFor='last-week'> Last Week</label>
        <input
          type='radio'
          value={
            format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd') +
            '>' +
            format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
          }
          name='gender'
          id='last-month'
        />{' '}
        <label htmlFor='last-month'> Last Month</label>
      </div>

      <br />
      <br />
      <div id='data2'>
        {DATA.map((x, index) => {
          return (
            <div key={index}>
              <h2>{x.division}</h2>
              <div className='events'>
                {x.events.map((i, index) => {
                  return (
                    <div className='event-item' key={index}>
                      <p>Event Name: {i.title}</p>
                      <p>Date: {i.date}</p>
                      <p>Notes: {i.notes}</p>
                      <p>Bunting: {`${i.bunting}`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <br />
    </div>
  );
};

export default App;
