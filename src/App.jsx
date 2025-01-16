import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [phrase, setPhrase] = useState('');
  const [ordArray, setOrdArray] = useState([]);
  const [binaryArray, setBinaryArray] = useState([]);
  const [isTwoColumns, setIsTwoColumns] = useState(false); // State to control column layout
  const turtleGridRef = useRef(null); // Ref for turtle grid container

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

  // Capture the turtle grid and generate a JPG image
  const captureTurtles = () => {
    const grid = turtleGridRef.current;

    if (!grid) {
      console.error('Turtle grid not found');
      return;
    }

    html2canvas(grid).then((canvas) => {
      // Convert the canvas to a JPG image
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // quality is set to 1.0 (maximum)
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'turtle_grid.jpg';
      link.click(); // Trigger the download
    }).catch((error) => {
      console.error('Error capturing canvas: ', error);
    });
  };

  // Function to display the phrase with spaces between each character and extra space for spaces

  // const formatPhraseWithSpaces = (phrase) => {
  //   return phrase
  //     .split('')
  //     .map((char, index, arr) => {
  //       // If current character is a space, replace with two spaces
  //       if (char === ' ') {
  //         // If next character is a space, add two spaces
  //         return '  ';
  //       } else {
  //         // Otherwise, add one space after every character
  //         return index !== arr.length - 1 ? char + ' ' : char;
  //       }
  //     })
  //     .join('');
  // };

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
          {/* <p className="output-text">Your phrase: {formatPhraseWithSpaces(phrase)}</p> */}
          <p className="output-text">Your phrase: {phrase}</p> 
          <p className="output-text">Ordinal values: {ordArray.join(' ')}</p>
          <p className="output-text">Binary values: {binaryArray.join(' ')}</p>
        </div>

        <button onClick={toggleLayout}>
          {isTwoColumns ? 'Toggle Layout: 1 Column' : 'Toggle Layout: 2 Columns'}
        </button>

        <button onClick={captureTurtles} className="download-button">
          Download Turtles as JPG
        </button>
      </div>

      <div ref={turtleGridRef} className={`turtle-grid ${isTwoColumns ? 'two-columns' : ''}`}>
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
