import React, { useState, useEffect } from 'react';
import './App.css';

const initialState = [
  { name: 'Alabama', isChecked: false },
  { name: 'Alaska', isChecked: false },
  { name: 'Arizona', isChecked: false },
  { name: 'Arkansas', isChecked: false },
  { name: 'California', isChecked: false },
  { name: 'Colorado', isChecked: false },
  { name: 'Connecticut', isChecked: false },
  { name: 'Delaware', isChecked: false },
  { name: 'Florida', isChecked: false },
  { name: 'Georgia', isChecked: false },
  { name: 'Hawaii', isChecked: false },
  { name: 'Idaho', isChecked: false },
  { name: 'Illinois', isChecked: false },
  { name: 'Indiana', isChecked: false },
  { name: 'Iowa', isChecked: false },
  { name: 'Kansas', isChecked: false },
  { name: 'Kentucky', isChecked: false },
  { name: 'Louisiana', isChecked: false },
  { name: 'Maine', isChecked: false },
  { name: 'Maryland', isChecked: false },
  { name: 'Massachusetts', isChecked: false },
  { name: 'Michigan', isChecked: false },
  { name: 'Minnesota', isChecked: false },
  { name: 'Mississippi', isChecked: false },
  { name: 'Missouri', isChecked: false },
  { name: 'Montana', isChecked: false },
  { name: 'Nebraska', isChecked: false },
  { name: 'Nevada', isChecked: false },
  { name: 'New Hampshire', isChecked: false },
  { name: 'New Jersey', isChecked: false },
  { name: 'New Mexico', isChecked: false },
  { name: 'New York', isChecked: false },
  { name: 'North Carolina', isChecked: false },
  { name: 'North Dakota', isChecked: false },
  { name: 'Ohio', isChecked: false },
  { name: 'Oklahoma', isChecked: false },
  { name: 'Oregon', isChecked: false },
  { name: 'Pennsylvania', isChecked: false },
  { name: 'Rhode Island', isChecked: false },
  { name: 'South Carolina', isChecked: false },
  { name: 'South Dakota', isChecked: false },
  { name: 'Tennessee', isChecked: false },
  { name: 'Texas', isChecked: false },
  { name: 'Utah', isChecked: false },
  { name: 'Vermont', isChecked: false },
  { name: 'Virginia', isChecked: false },
  { name: 'Washington', isChecked: false },
  { name: 'West Virginia', isChecked: false },
  { name: 'Wisconsin', isChecked: false },
  { name: 'Wyoming', isChecked: false },
];

const App = () => {
  const [stateChecker, setStateCheck] = useState(initialState);
  const [displayList, setDisplayList] = useState(stateChecker);
  const [isOpened, setIsOpened] = useState(false);

  const countChecked = (array) => {
    let count = 0;

    for (let state of array) {
      if (state.isChecked) {
        count++;
      }
    }

    return count;
  };

  const findState = (list, e) => {
    const text = e.target.value;
    if (text === '' || text.length === 0) {
      setDisplayList(stateChecker);
    }
    console.log(text);
    const result = list.filter((state) => {
      return state.name.toLowerCase().includes(text.toLowerCase());
    });
    setDisplayList(result);
  };

  const toggleList = () => {
    setIsOpened(!isOpened);
  };

  const checkState = (e) => {
    setStateCheck((prevState) => {
      const newState = [...prevState];
      const currentObj = newState.find((item) => item.name === e.target.name);

      currentObj.isChecked = e.target.checked;
      return newState;
    });
  };

  return (
    <div className="app">
      <div>
        <button onClick={toggleList}>
          {countChecked(stateChecker)} states were checked
        </button>
      </div>
      <div>
        {isOpened && (
          <div className="list-container">
            <div>
              <input
                type="text"
                onChange={findState.bind(null, stateChecker)}
              />
            </div>
            <div className="state-container">
              {displayList.map((state) => {
                return (
                  <div className="state-item" key={Math.random() * 50}>
                    <input
                      type="checkbox"
                      name={state.name}
                      checked={state.isChecked}
                      onChange={checkState}
                    />

                    <div className={state.isChecked ? 'checked-state' : ''}>
                      {state.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;