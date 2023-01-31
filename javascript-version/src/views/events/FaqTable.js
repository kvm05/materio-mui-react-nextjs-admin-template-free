import { useState } from 'react';
import { Button, CardHeader, Divider, FormControl, IconButton, Modal, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

function FaqTable(props){
    const [faqTitle, setFaqTitle] = useState(props.faq.title)
    const [faqContent, setFaqContent] = useState(props.faq.content)
    // console.log("index: "+props.index)
    // console.log("length: "+props.length)
    return(
        <div>
            <TextField sx={{paddingY: 3, width:"100%"}} value={faqTitle} multiline onChange={(newVal) => {
                setFaqTitle(newVal.target.value)
                props.changeTitle(newVal.target.value,props.index)
            }}></TextField>
            <TextField sx={{paddingY: 3, width:"100%"}}  value={faqContent} multiline onChange={(newVal) => {
                setFaqContent(newVal.target.value)
                props.changeContent(newVal.target.value,props.index)
            }}></TextField>
            {props.index!==(props.length-1)?<Divider></Divider>:<></>}
        </div>
    )
}
export default FaqTable