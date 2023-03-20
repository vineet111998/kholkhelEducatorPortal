import * as React from 'react';
import MultiLingunalService from '../services/multiLingunalService';
import Card from '@mui/material/Card';
import AddEventGameModal from "./EventAddGameModal ";

const MultiLingunal = (props) => {
    const [langArr, setLangArr] = React.useState([]);
    const [selLang, setSelLang] = React.useState();
    const [active,setActive]= React.useState("true");

    React.useEffect(() => {
        if (langArr.length === 0) getlanguageData();
      });
    async function getlanguageData() {
        var data={lang_status:0};
        await MultiLingunalService.getInstance().getAllLanguage(data).then((res) => {
          var result = JSON.parse(JSON.stringify(res));
          for(var i= 0; i<result.data.length;i++)
          {
            result.data[i]["selected"]=false;
          }
          setLangArr(result.data);
        });
      }
      const tileHandler = (e) => {
        console.log(e.target.id)
        setSelLang(e.target.id)
        setActive("false")
    }
    const ChildHandler=(childData)=>{
      props.onChange(selLang , childData);
      // console.log(childData)
    }
    return (
    <>
    {
         active == "true" &&
      <div style={{    textAlign: "center",justifyContent: "center"}}>
      <h1>Select Languages:</h1>
      <div style={{ width: "50%", margin: "2% auto", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        
           {
             props.gameData.map((data,i) =>
               <div style={{ flex: "0 0 33.3333333%", margin: "2% auto" }} key={data[0].lang_id}>
                {Object.keys(data[1]).length ==0 ?
                 <Card  id={i} style={{ width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data[0].lang_color, cursor: "pointer" }} onClick={tileHandler}>{data[0].lang_desc}</Card>
                 :
                 <Card  id={i} style={{ width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: 'white', cursor: "default" }}>{data[0].lang_desc}</Card>
                }
               </div>
             )
           }
                    
         </div>
         {/* <Button onClick={()=>setActive("false")} style={{width: "8%",padding: "1% 0",border: "2px solid rgb(25 118 210)",borderRadius: "10px",margin: "2% 0 0 0"}}>Next</Button>     */}
         </div>
    }
    {
      active=="false" &&
      <AddEventGameModal value={ChildHandler}/>
    }
        </>
    )
}
export default MultiLingunal;