import { useState } from 'react';

function App() {
  const [phrase, setPhrase] = useState('');
  const [ordArray, setOrdArray] = useState([]);
  const [binaryArray, setBinaryArray] = useState([]);
  const [isTwoColumns, setIsTwoColumns] = useState(false); // State to control column layout

  const handleChange = (event) => {
    const newPhrase = event.target.value;
    setPhrase(newPhrase);
    const ords = convertToOrd(newPhrase);
    setOrdArray(ords);
    setBinaryArray(ords.map((ord) => ord.toString(2).padStart(8, '0')));
  };

  const convertToOrd = (str) => {
    return str.split('').map((char) => char.charCodeAt(0));
  };

  // Toggle the layout
  const toggleLayout = () => {
    setIsTwoColumns(!isTwoColumns);
  };

  return (
    <>
      <div className="app-container">
        <label htmlFor="phrase-input" className="label">Enter your phrase here:</label>
        <input
          type="text"
          id="phrase-input"
          value={phrase}
          onChange={handleChange}
          className="phrase-input"
        />
        
        <div className="output-section">
          <p className="output-text">Your phrase: {phrase}</p>
          <p className="output-text">Ordinal values: {ordArray.join(' ')}</p>
          <p className="output-text">Binary values: {binaryArray.join(' ')}</p>
        </div>

        <button onClick={toggleLayout}>
          {isTwoColumns? 'Toggle Layout: 1 Column' : 'Toggle Layout: 2 Columns'}
        </button>
      </div>

      <div className={`turtle-grid ${isTwoColumns ? 'two-columns' : ''}`}>
        {binaryArray.map((binary, index) => (
          <div key={index} className="turtle-row">
            {binary.split('').map((bit, bitIndex) => (
              <img
                key={bitIndex}
                src={`/images/${bit === '0' ? 'left_turtle.jpg' : 'right_turtle.jpg'}`}
                alt={bit === '0' ? 'Left Turtle' : 'Right Turtle'}
                className="turtle-image"
              />
            ))}
            <div className="blank-square"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
