import * as React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import ActivityDataCard from './ActivityDataCard'
import learningOutcomeService from '../services/learningOutcomeService';

const AddActivityList = (props) => {
    const [activity_name, setActivityName] = React.useState("");
    const [activity_desc, setActivityDesc] = React.useState("");
    const [status, setStatus] = React.useState(true);
    const [ResultData, setResultData] = React.useState([]);
    const clickHandler = (event) => {
        let JosnObj = {
            activityName: "",
            activityDesc: ""
        }
        JosnObj.activityName = activity_name;
        JosnObj.activityDesc = activity_desc;
        ResultData.push(JosnObj);
        console.log(ResultData);
        // setStatus(true)
        setActivityName("");
        setActivityDesc("");
    }
    const submitHandler = (e) => {
        let data = { learning_name: props.outcomeName, learning_desc: props.outcomeDesc, learning_attr: ResultData }
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
                ResultData.length > 0 &&
                ResultData.map((e, index) =>
                    <div key={index} style={{ marginTop: "5%" }}>
                        <ActivityDataCard activity_name={e.activityName} activity_desc={e.activityDesc} />
                    </div>
                )
            }
            {
                status &&
                <><h2 style={{ textAlign: "center" }}>Activity Information</h2><Card>
                    <CardContent>
                        <TextField style={{ padding: ".6%", marginBottom: "2%" }}
                            required
                            id="activityDesc"
                            name="activityName"
                            label="Activity Name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            value={activity_name}
                            onChange={(e) => { setActivityName(e.target.value); }} />
                        <TextField style={{ padding: ".6%", marginBottom: "2%" }}
                            required
                            id="activityDesc"
                            name="activityName"
                            label="Activity Description"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            value={activity_desc}
                            onChange={(e) => { setActivityDesc(e.target.value); }} />

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={clickHandler}>Add Activity</Button>
                    </CardActions>
                </Card></>
            }
            {
                ResultData.length >1 &&
                <Button size="small" value="list" onClick={submitHandler}>Submit</Button>
            }


        </>
    );
}
export default AddActivityList;