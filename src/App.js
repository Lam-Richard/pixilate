import './App.css';
import React, { useEffect, useState } from 'react';

let mouseDown = false;
document.onmousedown = function() { 
    mouseDown = true;
  }
document.onmouseup = function() {
    mouseDown = false;
}

const colors = ['white', 'red', 'green', 'blue', 
                'brown', 'black', 'yellow', 'teal',
                'grey', 'purple', 'pink', 'tan', 'orange',
                'yellowgreen', 'cyan', 'lightskyblue', 'gold', 'silver',
                'violet', 'indigo', 'salmon','HotPink','Moccasin','Khaki',
                'Lavender','DarkSeaGreen','SteelBlue','MediumSlateBlue','Cornsilk',
                'BlanchedAlmond','Chocolate','HoneyDew'
                ];

const Square = ({number, paintbrush}) => {
  const [color, setColor] = useState("white")
  const [borderColor, setBorderColor] = useState("lightskyblue")
  
  function handleClick () {
    setColor(paintbrush);
    if (paintbrush == "white") {
      setBorderColor("lightskyblue")
    } else if (paintbrush == "black") {
      setBorderColor("#393737")
    } else {
      setBorderColor("black")
    }
  }

  useEffect(()=>{
    console.log("Current Paintbrush: ", paintbrush)
  },[paintbrush])

  function handleRoll () {
    if (mouseDown) {
      handleClick();
    }
  }

  return (
    <div id={number} 
    className="cell unselectable" 
    draggable={false}
    style={{backgroundColor: color,
            borderColor: borderColor}}
    onClick={handleClick}
    onMouseOver={handleRoll}
    >
    </div>
  )
}

const Grid = ({paintbrush}) => {
  let temporaryGrid = [...Array(3600).keys()];
  return (temporaryGrid.map(number => {
    return <Square key={number} number={number} paintbrush={paintbrush}></Square>
  }))
}

const Color = ({color, setBrush}) => {
  function changeColor () {
    setBrush(color);
  }
  return <div id={color} 
          className={"Color"} 
          draggable={false} 
          onClick={changeColor}
          style={{backgroundColor: color, borderColor: 'black'}}
          ></div>
}

const Palette = ({colors, setBrush}) => {
  return colors.map(color => {
    return <Color key={color} color={color} setBrush={setBrush}></Color>
  })
}

function App() {
  const [brush, setBrush] = useState("white")

  function handleBrush (color) {
    setBrush(color);
  }

  return (
    <div className="App">
      <div className="Container" draggable="False">
        <div id="SubContainer" onContextMenu={event => event.preventDefault()}>
          <div id="Grid" className="Grid">
            <Grid paintbrush={brush}></Grid>
          </div>
        </div>
        <div id="Palette" className="Palette">
          <Palette colors={colors} setBrush={handleBrush}></Palette>
          <Color color="mintcream" setBrush={handleBrush}></Color>
        </div>
      </div>
      <br></br>
      <div id="Save" className="Save">
        Save Drawing!
      </div>
    </div>
  );
}

export default App;
