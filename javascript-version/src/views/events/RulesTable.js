import { useState } from 'react';
import { Button, CardHeader, Divider, FormControl, IconButton, Modal, TextField } from '@mui/material'

function RuleTable(props){
    const [rule, changeRule] = useState(props.rules)
    return(
        <div>
            <TextField sx={{paddingY: 3, width:"100%"}}  value={rule} multiline onChange={(newVal) => {
                changeRule(newVal.target.value)
                props.change(newVal.target.value,props.index)
            }}></TextField>
            {/* <Divider/> */}
        </div>
    )
}

export default RuleTable