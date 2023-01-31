import Grid from '@mui/material/Grid'
import { HelpCircleOutline } from 'mdi-material-ui'
import PersonIcon from '@mui/icons-material/Person';
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import Trophy from 'src/views/dashboard/Trophy'
import UsersChart from 'src/views/dashboard/UsersChart'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import UserTable from 'src/views/users/UserTable';
const Users = () => {
    const [userList, setUserList] = useState({})
    const [totalUsers, setUsers] = useState(0)
    const [pageNo, setPageNo] = useState(1)
    useEffect(async () => {
        const response = await axios.get('https://nginx-varun-dhruv.cloud.okteto.net/api/user/v1/count')
        setUserList(response.data.data)
        console.log(userList)
        setUsers(response.data.data.genericUser + response.data.data.eventHead + response.data.data.admin)
    },[])
    // console.log("Total Users: "+totalUsers)
    return(
        <Grid container spacing={6}>
            <Grid item xs={12} md={6} sx={{height:"100%"}}>
                <CardStatisticsVerticalComponent
                stats={totalUsers}
                color='success'
                trend='negative'
                // trendNumber='-18%'
                // subtitle='Last Week'
                title='Total Users'
                icon={<PersonIcon />}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{height:"100%"}}>
                <UsersChart height={"150"} />
            </Grid>
            <Grid item xs={12}>
                <UserTable noUsers={totalUsers} pageNo={pageNo} setPageNo={setPageNo}/>
            </Grid>
        </Grid>
    )
}
export default Users