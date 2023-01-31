import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { Button, CardHeader, FormControl, IconButton, Modal, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const Description = (props) => {
    const [showModal, setModal] = useState(false)
    const [desc, setDesc] = useState(props.desc)
    // console.log("Description1: "+props.desc)
    const [changeDesc, setChangeDesc] = useState(props.desc)
    const [token, setToken] = useState(null)
    async function updateDescription(){
        setDesc(changeDesc)
        const response = await axios.patch(`https://nginx-varun-dhruv.cloud.okteto.net/api/events/v1/${props.id}`,{
            "description":changeDesc
        },{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(response)
        setModal(false)
    }
    useEffect(() => {
        setToken(localStorage.getItem("oculus_token"))
        setDesc(props.desc)
        setChangeDesc(props.desc)
        // console.log("re-render")
    },[props.desc])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40rem',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return(
        <div>
            <Modal
            open={showModal}
            onClose={() => {
                setModal(false)
            }}>
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Description:
                    </Typography>
                    <Box sx={{maxHeight: "75%"}}>
                        <FormControl fullWidth>
                            <TextField sx={{paddingY:3}} value={changeDesc} multiline onChange={(newVal) => {
                                setChangeDesc(newVal.target.value)
                            }}></TextField>
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
                                    updateDescription()
                                }}>Submit</Button>
                                <Button variant="contained" sx={{
                                backgroundColor: "red",
                                "&:hover": {backgroundColor: "red" }
                                }} onClick={() => {
                                    setChangeDesc(desc)
                                    setModal(false)
                                }}>Cancel</Button>
                            </Box>
                        </FormControl>
                    </Box>
                </Card>
            </Modal>
            <Card>
                {/* <CardHeader
                    title='Description'
                    titleTypographyProps={{
                        sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important'}
                    }}
                /> */}
                <Box sx={{display: "flex",
                    justifyContent: "space-between",
                    padding: 5}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant='h6' sx={{paddingRight: 3}}>Description</Typography>
                            <IconButton onClick={() => {
                                setModal(true)
                            }}>
                                <EditIcon/>
                            </IconButton>
                        </Box>
                </Box>
                <Typography sx={{paddingX: 5, paddingBottom: 5}}>{desc}</Typography>
            </Card>
        </div>
    )
}
export default Description