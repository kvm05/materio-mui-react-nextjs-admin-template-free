import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { Button, CardHeader, Divider, FormControl, IconButton, Modal, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FaqTable from './FaqTable';

const Faq = (props) => {
    const [showModal, setModal] = useState(false)
    const [faq, setFaq] = useState(props.faq)
    let len = faq.length
    let changedFaq = [...faq]
    const [token, setToken] = useState(null)
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
    function changeFaqTitle(faq, index){
        changedFaq[index].title = faq
    }
    function changeFaqContent(faq, index){
        changedFaq[index].content = faq
    }
    async function updateFaq(updatedFaq){
        let filteredFaq = updatedFaq.filter((ele) => {
            if(ele.title!=="" && ele.content!==""){
                return ele
            }
        })
        // console.log(filteredFaq)
        setFaq(filteredFaq)
        const response = await axios.patch(`https://nginx-varun-dhruv.cloud.okteto.net/api/events/v1/${props.id}`,{
            "faq": filteredFaq
        },{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        setModal(false)
    }
    useEffect(() => {
        setToken(localStorage.getItem("oculus_token"))
        setFaq(props.faq)
    },[props.faq])
    return(
        <div>
            <Modal
            open={showModal}
            onClose={() => {
                let filteredFaq = changedFaq.filter((ele) => {
                    if(ele.title!=="" && ele.content!==""){
                        return ele
                    }
                })
                setModal(false)
            }}>
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        Edit FAQ:
                    </Typography>
                    <Box sx={{paddingY: 3}}>
                        <FormControl fullWidth>
                            {faq.map((faq, index) => (
                                <FaqTable faq={faq} index={index} length={len} changeTitle={changeFaqTitle} changeContent={changeFaqContent}></FaqTable>
                            ))}
                            <Divider sx={{display: "flex", alignItems:"center"}}><AddCircleIcon color='primary' fontSize='large' onClick={() => {
                                console.log("New rule")
                                changedFaq.push({"title":"", "content":""})
                                console.log(changedFaq)
                                setFaq(changedFaq)
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
                                    updateFaq(changedFaq)
                                }}>Submit</Button>
                                <Button variant="contained" sx={{
                                backgroundColor: "red",
                                "&:hover": {backgroundColor: "red" }
                                }} onClick={() => {
                                    // setChangeDesc(desc)
                                    let filteredFaq = changedFaq.filter((ele) => {
                                        if(ele.title!=="" && ele.content!==""){
                                            return ele
                                        }
                                    })
                                    setFaq(filteredFaq)
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
                                <Typography variant='h6' sx={{paddingRight: 3}}>FAQ</Typography>
                                <IconButton onClick={() => {
                                    setModal(true)
                                }}>
                                    <EditIcon/>
                                </IconButton>
                            </Box>
                </Box>
                {faq.map(faq => (
                    <Box sx={{paddingX: 5,
                    paddingBottom: 3}}>
                        <Typography sx={{ lineHeight: '2rem !important', letterSpacing: '0.15px !important', fontWeight: 600, fontSize: 20}}>Q: {faq.title}</Typography>
                        <Typography>A: {faq.content}</Typography>
                    </Box>
                ))}
            </Card>
        </div>
    )
}
export default Faq