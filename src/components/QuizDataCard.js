import React from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
const QuizDataCard = (data) => {
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
                             <p>Question:</p>
                             <p>{data.question}</p>
                             <p>Options:</p>
                             <p>{data.optionsForAnswer[0]} {data.optionsForAnswer[1]} {data.optionsForAnswer[2]} {data.optionsForAnswer[3]}</p>
                             <p>Answer:</p>
                             <p>{data.answer}</p>
                            </CardContent>
                        </Card>
            } 
        </>
    )
}
export default QuizDataCard