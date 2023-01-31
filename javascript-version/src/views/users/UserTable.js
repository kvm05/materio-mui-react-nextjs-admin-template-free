import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { CardHeader, FormControl, MenuItem, Select } from '@mui/material'
import { BorderBottom } from 'mdi-material-ui'
import { useContext, useState } from 'react'
import { eventListContext } from 'src/@core/context/eventsContext'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import Magnify from 'mdi-material-ui/Magnify'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios'
import { useEffect } from 'react'
import { borderTop } from '@mui/system'
const UserTable = (props) => {
    const [pageNo, setPageNo] = useState(1)
    const [userList, setUserList] = useState([])
    const [modalDelete, setModalDelete] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [rowUser, setRowUser] = useState({})
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [token, setToken] = useState('')
    async function getUser(pageNo){
        console.log(pageNo)
        const response = await axios.get(`https://nginx-varun-dhruv.cloud.okteto.net/api/user/v1/?limit=${limit}&pageNo=${pageNo}`)
        setUserList(response.data.data);
    }
    async function updateUser(pageNo){
        const response = await axios.patch(`https://nginx-varun-dhruv.cloud.okteto.net/api/user/v1/${rowUser._id}`,{
            "name": userName,
            "role": userRole
        },{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(response)
        setModalEdit(false)
        getUser(pageNo)
    }
    const limit = 5
    let noOfPages = Math.ceil(props.noUsers/limit)
    // console.log("Total Pages: "+noOfPages)
    useEffect(async () => {
        getUser(pageNo)
        setToken(localStorage.getItem('oculus_token'))
    },[pageNo])
    const handleChange = (event, value) => {
        setPageNo(value)
        // console.log("Current Page = "+pageNo);
        // getUser(pageNo)
        // console.log(userList)
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: "45%"
    };
    // const currentUser = JSON.parse(localStorage.getItem('oculus_user'))
    return(
        <div>
            {/* delete modal */}
            <Modal
                open={modalDelete}
                onClose={() => {
                setModalDelete(false)
                }}>
                <Card sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                    textAlign: "center"
                }}>
                    Are you sure you want to delete user "{rowUser?.name}"?
                </Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 5,
                }}>
                    <Button variant="contained" sx={{
                        backgroundColor: "green",
                        "&:hover": {backgroundColor: "green" }
                        }} onClick={async () => {
                        console.log(`${rowUser.name} deleted`)
                        const response = await axios.delete(`https://nginx-varun-dhruv.cloud.okteto.net/api/user/v1/${rowUser._id}`, {
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        }, { })
                        console.log(response)
                        setModalDelete(false)
                        getUser(pageNo)
                    }}>Accept</Button>
                    <Button variant="contained" sx={{
                        backgroundColor: "red",
                        "&:hover": {backgroundColor: "red" }
                    }} onClick={() => {setModalDelete(false)}}>Reject</Button>
                </Box>
                </Card>
            </Modal>
            {/* edit modal */}
            <Modal
            open={modalEdit}
            onClose={() => {
                setModalEdit(false)
            }}>
                <Card sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit {rowUser.name}
                    </Typography>
                    <Box sx={{paddingTop: 5}}>
                        <FormControl fullWidth>
                            <Box sx={{display:"flex", paddingBottom: 3}}>
                                <Typography sx={{display:"flex",
                                alignItems:"center",
                                paddingRight: 3}}>Name:</Typography>
                                <TextField value={userName}  onChange={(e) => {
                                    setUserName(e.target.value)
                                }}></TextField>
                            </Box>
                            {/* <Box sx={{display:"flex"}}>
                                <Typography sx={{display:"flex",
                                alignItems:"center",
                                paddingRight: 3}}>Phone Number:</Typography>
                                <TextField value={userName}  onChange={(e) => {
                                    setUserName(e.target.value)
                                }}></TextField>
                            </Box> */}
                            <Box sx={{display:"flex", paddingBottom: 3}}>
                                <Typography sx={{display:"flex",
                                alignItems:"center",
                                paddingRight: 6}}>Role:</Typography>
                                <Select
                                value={userRole}
                                onChange={(e) =>{setUserRole(e.target.value)}}>
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"genericUser"}>User</MenuItem>
                                    <MenuItem value={"eventHead"}>Event Head</MenuItem>
                                </Select>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingX: 40,
                                paddingTop: 2
                            }}>
                                <Button variant="contained" sx={{
                                backgroundColor: "green",
                                "&:hover": {backgroundColor: "green" }
                                }} onClick={() => {
                                    updateUser(pageNo)
                                }}>Submit</Button>
                                <Button variant="contained" sx={{
                                backgroundColor: "red",
                                "&:hover": {backgroundColor: "red" }
                                }} onClick={() => {
                                    // setChangeDesc(desc)
                                    setModalEdit(false)
                                }}>Cancel</Button>
                            </Box>
                        </FormControl>
                    </Box>
                </Card>
            </Modal>
            <Card>
                {/* <CardHeader
                        title='Users'
                        titleTypographyProps={{
                            sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important'}
                        }}
                >
                </CardHeader> */}
                <Box sx={{display: "flex",
                justifyContent: "space-between",
                padding: 5}}>
                    <Box sx={{display: "flex",
                alignItems: "center"}}>
                        <Typography variant='h6' sx={{paddingRight: 3}}>Users</Typography>
                        <AddCircleIcon/>
                    </Box>
                    <TextField
                        size='small'
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position='start'>
                                <Magnify fontSize='small' />
                            </InputAdornment>
                            )
                        }}
                    />
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell sx={{textAlign: "center"}}>Events Registered</TableCell>
                                <TableCell sx={{textAlign: "center"}}>Events Organized</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {userList.map(row => (
                            <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                                {/* <Typography variant='caption'>{row.slug}</Typography> */}
                                </Box>
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell sx={{textAlign: "center"}}>{row.registeredEvents.length}</TableCell>
                            <TableCell sx={{textAlign: "center"}}>{row.eventsOrganized.length}</TableCell>
                            <TableCell onClick={() => {
                                setModalEdit(true)
                                console.log(row.name)
                                setUserName(row.name)
                                setUserRole(row.role)
                                setRowUser(row)
                            }}><EditIcon/></TableCell>
                            <TableCell onClick={() => {
                                setModalDelete(true)
                                setRowUser(row)
                            }}><DeleteIcon/></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Footer */}
                <Stack spacing={2} sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingY: 5,
                    borderTop: 1
                }}>
                    <Pagination count={noOfPages} page={pageNo} onChange={handleChange}/>
                </Stack>
            </Card>
        </div>
    )
}

export default UserTable