// ** MUI Imports
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
import { CardHeader } from '@mui/material'
import { BorderBottom } from 'mdi-material-ui'
import { useContext, useState } from 'react'
import { eventListContext } from 'src/@core/context/eventsContext'
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios'

// const rows = [
//   {
//     age: 27,
//     status: 'current',
//     date: '09/27/2018',
//     name: 'Sally Quinn',
//     salary: '$19586.23',
//     email: 'eebsworth2m@sbwire.com',
//     designation: 'Human Resources Assistant'
//   },
//   {
//     age: 61,
//     date: '09/23/2016',
//     salary: '$23896.35',
//     status: 'professional',
//     name: 'Margaret Bowers',
//     email: 'kocrevy0@thetimes.co.uk',
//     designation: 'Nuclear Power Engineer'
//   },
//   {
//     age: 59,
//     date: '10/15/2017',
//     name: 'Minnie Roy',
//     status: 'rejected',
//     salary: '$18991.67',
//     email: 'ediehn6@163.com',
//     designation: 'Environmental Specialist'
//   },
//   {
//     age: 30,
//     date: '06/12/2018',
//     status: 'resigned',
//     salary: '$19252.12',
//     name: 'Ralph Leonard',
//     email: 'dfalloona@ifeng.com',
//     designation: 'Sales Representative'
//   },
//   {
//     age: 66,
//     status: 'applied',
//     date: '03/24/2018',
//     salary: '$13076.28',
//     name: 'Annie Martin',
//     designation: 'Operator',
//     email: 'sganderton2@tuttocitta.it'
//   },
//   {
//     age: 33,
//     date: '08/25/2017',
//     salary: '$10909.52',
//     name: 'Adeline Day',
//     status: 'professional',
//     email: 'hnisius4@gnu.org',
//     designation: 'Senior Cost Accountant'
//   },
//   {
//     age: 61,
//     status: 'current',
//     date: '06/01/2017',
//     salary: '$17803.80',
//     name: 'Lora Jackson',
//     designation: 'Geologist',
//     email: 'ghoneywood5@narod.ru'
//   },
//   {
//     age: 22,
//     date: '12/03/2017',
//     salary: '$12336.17',
//     name: 'Rodney Sharp',
//     status: 'professional',
//     designation: 'Cost Accountant',
//     email: 'dcrossman3@google.co.jp'
//   }
// ]

// const statusObj = {
//   applied: { color: 'info' },
//   rejected: { color: 'error' },
//   current: { color: 'primary' },
//   resigned: { color: 'warning' },
//   professional: { color: 'success' }
// }

const DashboardTable = () => {
  const {eventList, updateEventList, getEvents} = useContext(eventListContext)
  const [showModal, setModal] = useState(false)
  const [event, setEvent] = useState({})
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  console.log(eventList)
  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => {
          setModal(false)
        }}>
        <Card sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete event "{event?.name}"?
          </Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 5
          }}>
            <Button variant="contained" sx={{
              backgroundColor: "green",
              "&:hover": {backgroundColor: "green" }
            }} onClick={async () => {
              console.log(`${event.name} deleted`)
              const response = await axios.delete(`https://nginx-varun-dhruv.cloud.okteto.net/api/events/v1/${event._id}`)
              console.log(response)
              setModal(false)
              getEvents()
            }}>Accept</Button>
            <Button variant="contained" sx={{
              backgroundColor: "red",
              "&:hover": {backgroundColor: "red" }
            }} onClick={() => {setModal(false)}}>Reject</Button>
          </Box>
        </Card>
      </Modal>
      <Card>
        <CardHeader
                  title='Events'
                  titleTypographyProps={{
                      sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important'}
                  }}
              />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Revenue</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventList.map(row => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                      <Typography variant='caption'>{row.slug}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.date_text_short}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.participation}</TableCell>
                  <TableCell>{row.totalRevenue}</TableCell>
                  <TableCell onClick={() => {
                    setModal(true)
                    setEvent(row)
                  }}><DeleteIcon/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default DashboardTable
