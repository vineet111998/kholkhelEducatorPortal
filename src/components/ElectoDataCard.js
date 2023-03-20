import React from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {IP} from '../connection';
const ElectroDataCard = (data) => {
       console.log(data);
    const Item = styled(Paper)(({ theme }) => ({
        margin: "1%",
        padding: "2%",
        textAlign: 'center',
        border: "none",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.4)"
    }));
    return (
        <>
            {
                    <Card>
                            <Typography variant="h6" gutterBottom>
                            </Typography>
                            <CardContent >
                             <img src={IP+"getImage/?imgName="+data.question} style={{width:"10%"}}/>
                             <img src={IP+"getImage/?imgName="+data.answer} style={{width:"10%"}}/>
                            </CardContent>
                        </Card>
            } 
        </>
    )
}
export default ElectroDataCard