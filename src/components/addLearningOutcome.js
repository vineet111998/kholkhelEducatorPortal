import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import ActivityList from './activitylist';
import AddActivityList from './addActivityList';
import learningOutcomeService from '../services/learningOutcomeService';
const AddLearningOutcome = (props) => {
    const [outcomeName, setOutcomeName] = React.useState("");
    const [outcomeDesc, setOutcomeDesc] = React.useState("");
    const [status, setStatus] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    // const clickHandler = () => {
    //     setStatus(true);
    // }
    React.useEffect(() => {
        if (outcomeName.length > 0 && outcomeDesc.length > 0) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    });
    const ChangeHandler = (e) => {
        props.onChange(e);
    }
    const clickHandler = (e) => {
        let data = { learning_name: outcomeName, learning_desc: outcomeDesc, learning_attr: {} }
        setLearningOutcomeData(data, e)
    }
    async function setLearningOutcomeData(data, event) {
        await learningOutcomeService.getInstance().setLearningOutcome(data).then((res) => {
            let result = JSON.parse(JSON.stringify(res));
            if (result.code === 200) {
                alert(result.message);
                props.onChange(event.target.value);
            }
        })
    }

    return (
        <>
            {
                !status &&
                <><h2 style={{ textAlign: "center" }}>Learning Outcome Attributes</h2><Card>
                    <CardContent>
                        <TextField style={{ padding: ".6%", marginBottom: "2%" }}
                            required
                            id="wordGame"
                            name="wordGame"
                            label="Learning Outcome Name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={(e) => { setOutcomeName(e.target.value); }} />
                        <TextField style={{ padding: ".6%", marginBottom: "2%" }}
                            required
                            id="wordGame"
                            name="wordGame"
                            label="Learning Outcome Description"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={(e) => { setOutcomeDesc(e.target.value); }} />

                    </CardContent>
                    <CardActions>
                        <Button size="small" value="list" disabled={disable} onClick={clickHandler}>Submit</Button>
                    </CardActions>
                </Card></>
            }


            {
                status &&
                <AddActivityList onChange={ChangeHandler} outcomeName={outcomeName} outcomeDesc={outcomeDesc} />
            }

        </>
    );
}
export default AddLearningOutcome;