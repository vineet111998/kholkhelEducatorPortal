import React, { useEffect, useState,useRef } from "react";
import "./BigSquare.css";
import imgUrl from '../assets/500x500.jpg'
// import { FaRegImage } from "react-icons/fa";
// import { RiEdit2Fill } from "react-icons/ri";
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@mui/material';

function AddWordScramble() {
  const [value,setValue]=useState('');
  const canvas = useRef();
  const image = useRef();
  const textarea = useRef();
  var ctx = null;
//   const changeBackground=()=>{
//     alert("Background");
//   }

  const editText=()=>{
    textarea.current.focus();
  }

  const wrapText=(context, text, x, y, maxWidth, lineHeight) => {
    
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    context.stroke();
  }
useEffect(()=>{
    const canvasEle = canvas.current;
    ctx = canvasEle.getContext("2d");
    ctx.fillStyle = "rgb(149, 165, 166)";
        ctx.fillRect (0, 0, 500, 500);
},[])
  useEffect(() => {
    
    const canvasEle = canvas.current;
    const img = image.current;
    ctx = canvasEle.getContext("2d");
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
      var maxWidth = 400;
      var lineHeight = 55;
      var x = (canvasEle.width - maxWidth) / 2;
      var y = 200;
      ctx.font = '45pt Arial';
      ctx.fillStyle = '#333';
      wrapText(ctx, value, x, y, maxWidth, lineHeight);

    }, [value]);

const downloadImage=()=>{
  const canvasEle = canvas.current;
  var url = canvasEle.toDataURL("image/png");
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = url;
  link.click();
  window.location.reload(true);
}
  return (
    <div className="Container">
      {/* Reflected here*/}
      <h1>Word Scramble</h1>
      <div className="ContainerInner" style={{display: "flex"}}>
      <div className="imageContainer" >
      <canvas ref={canvas} width={500} height={500}/>
      </div>
      <div className="contentContainer" >

      {/*Tools*/}
      {/* <div className="attr">
        <ModeEditIcon style={{color:"black"}}onClick={editText}/>
      </div> */}
      {/*options*/}
    <div className="options">
      {/* <div className="images">

      </div> */}
      <div className="addText">
        <textarea type="text" className="textInput" placeholder="Please type here..." ref={textarea} onChange={(e)=>setValue(e.target.value)} value={value}></textarea>
      </div>
      <Button style={{margin:"40px auto"}} size="small" onClick={downloadImage}>Download</Button>
      
    </div>
      
      </div>
      </div>
    </div>
  );
}

export default AddWordScramble;
