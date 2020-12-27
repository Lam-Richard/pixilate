import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import ReactToPrint, {useReactToPrint} from 'react-to-print';

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
  const [picture, setPicture] = useState(null);
  function handleBrush (color) {
    setBrush(color);
  }

  const gridRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => gridRef.current,
  });

  function wrapper() {
    setPicture(document.getElementById("Grid"));
    handlePrint();
  }

 

  useEffect(()=> {
    console.log(picture);
  },[picture])

  return (
    <div className="App">
      <div className="Container" draggable="False">
        <div id="SubContainer" onContextMenu={event => event.preventDefault()}>
          <div media="print" ref={gridRef} id="Grid" className="Grid">
            <Grid paintbrush={brush}></Grid>
          </div>
        </div>
        <div id="Palette" className="Palette">
          <Palette colors={colors} setBrush={handleBrush}></Palette>
          <Color color="mintcream" setBrush={handleBrush}></Color>
        </div>
      </div>
      <br></br>
      <div id="SideBySide" className="SideBySide">
        <div id="Save" className="Save" onClick={wrapper}>
          Print Drawing!
        </div>
      </div>
      
    </div>
  );
}

export default App;
