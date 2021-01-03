import './App.css';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {useReactToPrint} from 'react-to-print';
import { SketchPicker } from 'react-color';
import { render } from 'react-dom';


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
    return <div><Color color={color} setBrush={setBrush}></Color></div>
  })
}
const ClearButton = ({clear, setClear}) => {
  function handleClear() {
    setClear(clear + 1);
  }
  return (
    <div id="ClearButton" className="ButtonType" onClick={handleClear}>Clear Canvas</div>
  )
}

const ColorModal = ({togglePick, setTogglePick, setBrush}) => {
  const [visible, setVisible] = useState('hidden')
  const [custom, setCustom] = useState('#194D33');
  const paletteRef = document.getElementById('Palette')
  function handleChange (color) {
    setCustom(color.hex)
  };

  function closeColor () {
    setTogglePick(false);
    setVisible('hidden');
    const placeHolder = document.createElement('div');
    paletteRef.appendChild(placeHolder);
    render(<div><Color color={custom} setBrush={setBrush}></Color></div>, placeHolder);
  }


  useEffect(()=>{
    if (togglePick) {
      setVisible('visible')
    }
  },[togglePick])

  return (
    <div  id="ColorModal" 
          className="ColorModal"
          style={{visibility: visible}}
    >
      {togglePick ? 
      <div className="WhiteModal" id="WhiteModal">
        <div className="ModalContainer" id="ModalContainer">
          <div className="PickInstructions" id="PickInstructions">
            drag the cursor or input values to select a color. 
            When you're finished, select OK.
          </div>
          <br></br>
          <div  className="SubmitColor" 
                id="SubmitColor"
                style={{boxShadow: "10px 10px 8px #888888",
                        borderColor: custom
                      }}
                onClick={closeColor}
                
          >OK</div>
        </div>
        <SketchPicker color={custom} onChange={handleChange}>
        </SketchPicker>
      </div> 
      : null}
    </div>
  )
}

const ColorPicker = ({togglePick, setTogglePick}) => {
  //lmao risky but we'll see
  function openColor () {
    if (togglePick === false) {
      setTogglePick(true);
    } else {
      setTogglePick(false);
    }
  }
  return (
    <div id="PickColor" className="ButtonType" onClick={openColor}>
      Add Custom Color
    </div>
  )
}

function App() {
  const [togglePick, setTogglePick] = useState(false);
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
          <div><Color color="mintcream" setBrush={handleBrush}></Color></div>
        </div>
      </div>
      <br></br>
      <div id="SideBySide" className="SideBySide">
        <div id="UnderGrid" className="UnderGrid">
          <div id="Print" className="ButtonType" onClick={wrapper}>
            Print Drawing!
          </div>
          <ClearButton clear={clear} setClear={setClear}></ClearButton>
        </div>
        <ColorPicker setTogglePick={setTogglePick} togglePick={togglePick}></ColorPicker>
        <ColorModal 
        setBrush={handleBrush}
        setTogglePick={setTogglePick} 
        togglePick={togglePick}></ColorModal>
      </div>
      
    </div>
  );
}
export default App;
