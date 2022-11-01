import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import learningOutcomeService from '../services/learningOutcomeService'
const ActivityList = (props) => {
    console.log(props);
    const columns = [
        {
            name: "id",
            label: "Sl.No",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "activity_name",
            label: "Activity Name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "activity_desc",
            label: "Activity Description",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];
    const [learningOutcome, setLearningOutcome] = useState([]);
    const [active, setActive] = useState("list");
    useEffect(() => {
        if(learningOutcome==0)
        {activityList({ tile_type_id: props.value });}
    })
    async function activityList(data) {
        const outcomeData = [];
        await learningOutcomeService.getInstance().getActivityList(data).then((res) => {
            var result = JSON.parse(JSON.stringify(res));

            for (let i = 0; i < result.data[0].tile_attr.length; i++) {
                outcomeData.push({ id: i + 1, activity_name: result.data[0].tile_attr[i].activityName, activity_desc: result.data[0].tile_attr[i].activityDesc });
            }
            console.log(result.data[0].tile_attr);
        })
        setLearningOutcome(outcomeData);
    }
    const ChangeHandler = (e) => {
        props.onChange(e);
    }
const options={
    filter:true,
    filterType:"dropdown",
    responsive:"standard",
    fixedHeader:true,
    fixedSelectColumn:false,
    tableBodyHeight:"400px"
}
    return (
        <>
            {
                active === "list" &&
                <MUIDataTable
                    title={props.outcomeName + "'s Activity List"}
                    data={learningOutcome}
                    columns={columns}
                    options={options}
                />
            }
        </>
    )
}

export default ActivityList;