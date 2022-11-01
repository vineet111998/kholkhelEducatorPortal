import React from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
const WordDataCard = (data) => {
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
                        <p>Word:</p>
                        <p>{data.word_attr}</p>
                        <p>Word Length:</p>
                        <p>{data.word_length}</p>
                    </CardContent>
                </Card>
            }
        </>
    )
}
export default WordDataCard