import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import gameRepoList from "../services/gameRepoList";
import AddEventGameModal from "./EventAddGameModal ";
import { Button } from "@mui/material";
const AddEventLangModal = (data) => {
    // console.log(data);
    const [selectedlangID,setLangID]=useState([]);
    const [id,setid]=useState(-1);
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
      name: "lang_id",
      label: "lang_id",
      options: {
        filter: true,
        sort: true,
        // display:false,
        // viewColumns:false
      }
    },
    {
      name: "lang_name",
      label: "Language",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "lang_desc",
      label: "Language Code",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "Add",
      label: "Add",
      options: {
        customBodyRenderLite(dataI, rowI) {
          return (
            selectedlangID.length>0 ?
            <Button disabled={selectedlangID[rowI]} variant="contained" onClick={(e) => { e.preventDefault(); buttonHandler(dataI) }}>
            ADD
           </Button>
          :
          <Button variant="contained" onClick={(e) => { e.preventDefault(); buttonHandler(dataI) }}>
            ADD
          </Button> 
            )
        }
      }
    }
  ];
  const buttonHandler = (dataI) => {
    setid(LangData[dataI].lang_id)
    setPrimaryLang(LangData[dataI]);
    setActive(false);
    selectedlangID[dataI]="true";
    // console.log(selectedlangID)
  }
  
  const [LangData, setLangData] = useState([]);
  const [primaryLang, setPrimaryLang] = useState({});
  const [active,setActive]=useState(true);
  useEffect(() => {
    // console.log(selectedlangID);
    if (LangData.length === 0) { getLangData(); }
  });

function getLangData(){
        const repoData = [];
        let id=1;
        for (let i = 0; i < data.selLang.length; i++) {
          if(data.selLang[i].selected==true)
          // console.log(data.selLang[i])
          {
                repoData.push({ id:id,lang_id: data.selLang[i].lang_id, lang_name: data.selLang[i].lang_desc, lang_desc: data.selLang[i].lang_name,lang_color:data.selLang[i].lang_color, lang_status: data.selLang[i].lang_status})
                id++;
          }
          
              }
              // console.log(repoData);
        setLangData(repoData);
}

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    fixedHeader: true,
    fixedSelectColumn: false,
    tableBodyHeight: "400px"
  }

  const ChildHandler = (childData) => {
    const arr=[];
      arr.push(primaryLang);
      arr.push(childData);
      setActive(true);
      data.value(arr,id);
  }
  return (
    <>
    {
        active &&
      <MUIDataTable
        title={"Select Language "}
        data={LangData}
        columns={columns}
        options={options}
      />
    }
    {
        !active &&
        <AddEventGameModal value={ChildHandler}/>
    }
      
    </>
  )
}

export default AddEventLangModal;