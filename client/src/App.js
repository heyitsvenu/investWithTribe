import React, { useState, useEffect } from 'react';
// import data from './data';
import { compareAsc, parseISO } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import './App.css';
import axios from 'axios';

const App = () => {
  const getData = async () => {
    const res = await axios.get('https://www.gov.uk/bank-holidays.json');
    const resData = Object.entries(res.data)
      .map((item) => {
        return { [item[0]]: item[1] };
      })
      .map((x) => {
        for (const prop in x) {
          return x[prop];
        }
        return null;
      });
    return resData;
  };

  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [goToApp, setGoToApp] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setUpdatedData(res);
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (ranges) => {
    setDate([ranges.selection]);
    const { startDate, endDate } = ranges.selection;
    const newData = data.map((x) => {
      return {
        division: x.division,
        events: x.events.filter((x) => {
          if (
            (compareAsc(parseISO(x.date), startDate) === 1 &&
              compareAsc(parseISO(x.date), endDate) === -1) ||
            (compareAsc(parseISO(x.date), startDate) === 0 &&
              compareAsc(parseISO(x.date), endDate) === 0)
          ) {
            console.log('yes');
            return true;
          }
          return false;
        }),
      };
    });
    setUpdatedData(newData);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/users', {
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      })
      .then((res) => {
        setIsSignedUp(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isSignedUp ? (
        <>
          {!goToApp ? (
            <div>
              <p>Please Check your mail</p>
              <button
                onClick={() => setGoToApp(true)}
                style={{ cursor: 'pointer' }}>
                Go To App
              </button>
            </div>
          ) : (
            <div>
              <DateRangePicker
                onChange={handleChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={date}
                direction='horizontal'
              />
              <br />
              <br />
              <div id='data2'>
                {updatedData.map((x, index) => {
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
          )}
        </>
      ) : (
        <div id='form-body-container'>
          <div id='heading'>
            <h2>Please Sign Up</h2>
          </div>
          <form id='form-body' onSubmit={handleUserSubmit}>
            <div className='form-body-item'>
              <label htmlFor='username'>Username: </label>
              <input type='text' id='username' />
            </div>
            <div className='form-body-item'>
              <label htmlFor='password'>Password: </label>
              <input type='password' id='password' />
            </div>
            <div className='form-body-item'>
              <input type='submit' id='submit' value='Submit' />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default App;
