import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {IP} from '../connection';
const Artifact = (props) => {
  return (
    <div style={{backgroundColor:'white',borderRadius:'10px',textAlign: "center",margin: '0 auto',height: 'auto',padding: '20px',maxWidth: '70%',maxHeight: '80vh'}}>
     <CloseIcon onClick={()=>props.onclick("list")} style={{float: "right"}}/>
        <h1>{props.artifactAttr}</h1>
            <div style={{width:'70%',margin:'0 auto',maxHeight:'1000px',textAlign: "center",padding:'10px',border:'1px solid rgba(0,0,0,0.5)',borderRadius:'10px'}}>
                <img src={IP+"getImage/?imgName=" +props.imageAttr} style={{width:'100%',borderRadius:'10px'}} alt="artifact" />
            </div>
    </div>
  )
}

export default Artifact