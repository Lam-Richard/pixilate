import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import {useReactToPrint} from 'react-to-print';

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
const Square = ({number, paintbrush, clear}) => {
  const [color, setColor] = useState("white")
  const [borderColor, setBorderColor] = useState("lightskyblue")
  useEffect(()=>{
    setColor("white");
    setBorderColor("lightskyblue");
  },[clear])  
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
const Grid = ({paintbrush, clear}) => {
  let temporaryGrid = [...Array(3600).keys()];
  return (temporaryGrid.map(number => {
    return <Square key={number} number={number} paintbrush={paintbrush} clear={clear}></Square>
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

const ClearButton = ({clear, setClear}) => {
  function handleClear() {
    setClear(clear + 1);
  }
  return (
    <div id="ClearButton" className="Save" onClick={handleClear}>Clear</div>
  )
}

function App() {
  const [brush, setBrush] = useState("white")
  const [picture, setPicture] = useState(null);
  const [clear, setClear] = useState(0);
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

  useEffect(()=> {
    console.log(clear);
  },[clear])
  return (
    <div className="App">
      <div className="Container" draggable="False">
        <div id="SubContainer" onContextMenu={event => event.preventDefault()}>
          <div media="print" ref={gridRef} id="Grid" className="Grid">
            <Grid paintbrush={brush} clear={clear}></Grid>
          </div>
        </div>
        <div id="Palette" className="Palette">
          <Palette colors={colors} setBrush={handleBrush}></Palette>
          <Color color="mintcream" setBrush={handleBrush}></Color>
        </div>
      </div>
      <br></br>
      <div id="SideBySide" className="SideBySide">
        <div id="UnderGrid" className="UnderGrid">
          <div id="Save" className="Save" onClick={wrapper}>
            Print Drawing!
          </div>
          <ClearButton clear={clear} setClear={setClear}></ClearButton>
        </div>
        <div id="Save" className="Save" onClick={wrapper}>
            COLOR PICKER
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
