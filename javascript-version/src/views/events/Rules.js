import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { Button, CardHeader, Divider, FormControl, IconButton, Modal, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RuleTable from './RulesTable';


const Rules = (props) => {
    const [showModal, setModal] = useState(false)
    const [token, setToken] = useState(null)
    const [rules, setRules] = useState(props.rules)
    // const [currentRule, changeCurrentRule] = useState('')
    async function updateRules(updatedRules){
        setModal(false)
        let filteredRules = updatedRules.filter(ele => ele)
        setRules(filteredRules)
        const response = await axios.patch(`https://nginx-varun-dhruv.cloud.okteto.net/api/events/v1/${props.id}`,{
            "rules": filteredRules
        },{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(response)
    }
    // const [changedRules, setChangesRules] = useState(props.rules)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40rem',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: "75%",
        overflow: "scroll",
        overflowX: "hidden"
    };
    let changedRules = [...rules]
    // console.log(changedRules)
    function changeRule(rule, index){
        changedRules[index] = rule
    }
    useEffect(() => {
        setToken(localStorage.getItem("oculus_token"))
        setRules(props.rules)
    },[props.rules])
    return(
        <div>
            <Modal
            open={showModal}
            onClose={() => {
                let filteredRules = changedRules.filter(ele => ele)
                setRules(filteredRules)
                setModal(false)
            }}>
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Rules:
                    </Typography>
                    <Box sx={{maxHeight: "50%"}}>
                        <FormControl fullWidth>
                            {rules.map((rule, index) => (
                                <RuleTable rules={rule} change={changeRule} index={index}></RuleTable>
                            ))}
                            <Divider sx={{display: "flex", alignItems:"center"}}><AddCircleIcon color='primary' fontSize='large' onClick={() => {
                                console.log("New rule")
                                changedRules.push("")
                                setRules(changedRules)
                            }}/></Divider>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingX: 40
                            }}>
                                <Button variant="contained" sx={{
                                backgroundColor: "green",
                                "&:hover": {backgroundColor: "green" }
                                }} onClick={() => {
                                    updateRules(changedRules)
                                }}>Submit</Button>
                                <Button variant="contained" sx={{
                                backgroundColor: "red",
                                "&:hover": {backgroundColor: "red" }
                                }} onClick={() => {
                                    // setChangeDesc(desc)
                                    let filteredRules = changedRules.filter(ele => ele)
                                    setRules(filteredRules)
                                    setModal(false)
                                }}>Cancel</Button>
                            </Box>
                        </FormControl>
                    </Box>
                </Card>
            </Modal>
            <Card>
                <Box sx={{display: "flex",
                        justifyContent: "space-between",
                        padding: 5}}>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Typography variant='h6' sx={{paddingRight: 3}}>Rules</Typography>
                                <IconButton onClick={() => {
                                    setModal(true)
                                }}>
                                    <EditIcon/>
                                </IconButton>
                            </Box>
                </Box>
                {rules.map(rule => (
                    <Typography sx={{paddingX: 5,
                    paddingBottom: 3}}>{rule}</Typography>
                ))}
            </Card>
        </div>
    )
}
export default Rules