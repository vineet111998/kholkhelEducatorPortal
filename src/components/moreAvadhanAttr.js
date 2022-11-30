import React, { useEffect, useState,useRef } from "react";
// import Card from './Card';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Card1 from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {IP} from '../connection';
const AvadhanAttr=(props) =>{
    const[rows,setRows]=useState(props.gameData.game_attr[0].rows);
    const[column,setColumn]=useState(props.gameData.game_attr[0].column);
    const[center,setCenter]=useState([]);
    const[locArr,setLocArr]=useState([]);
    const boardRef = useRef(null);
    useEffect(() => {
        boardRef.current.style.backgroundImage="url(IP+'getImage/?imgName="+props.gameData.game_attr[0].image_loc+"')";
    });
    const getCursorPosition=(canvas, event,ctx)=> {
        var location={};
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        location={x:x,y:y};
            ctx.beginPath();
            ctx.arc(location.x,location.y,4,0,2*Math.PI);
            ctx.stroke();    
        return location;
    }
    
    const clickHandler=()=>{
        var tempArr=[];
        if(locArr.length !=1)
        {
        const canvas = document.querySelector('canvas');
        document.getElementById('myCanvas').style.cursor="pointer";
        var ctx = document.getElementById('myCanvas').getContext("2d");
            // canvas.addEventListener("click", getLocation(e) 
            // {
                // var loc= getCursorPosition(canvas, e,ctx);
                // tempArr.push(loc);
                // if(tempArr.length ==4)
                // {
                //     let midpoint={};
                //     let x= (tempArr[0].x+tempArr[2].x)/2;
                //     let y=(tempArr[0].y+tempArr[2].y)/2;
                //     midpoint={x:x,y:y};
                //     locArr.push(tempArr);
                //     center.push(midpoint)
                //     locArr.center=center;
                //     tempArr=[];
                //     console.log(locArr);
                //     console.log(locArr.length);
                // }
            // }
            // );
        }
    }

    
        // for(var i=0;i<rows;i++){
        //     for(var j=0;j<column;j++){
        //     cells.push( <Card key={i+","+j}/>)
        //     }
        //     cells.push(<br></br>)
        // }
        return( 
            <div>
        <div style={{textAlign:"center"}}>
                    {/* {cells} */}
        <canvas id="myCanvas" width="600" height="600" ref={boardRef} style={{backgroundSize:"cover"}}></canvas>
         </div>
         <div>
         <Card1>
         <Typography variant="h6" gutterBottom style={{textAlign:"center"}}>
            Edit Box
        </Typography>
         <CardContent >
                    <Button onClick={clickHandler}>Set Location</Button>
         </CardContent>
         <CardActions>
                </CardActions>
        </Card1>
         </div>
         </div>
        );
    }

    export default AvadhanAttr