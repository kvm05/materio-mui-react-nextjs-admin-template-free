import { useRouter } from "next/router"

import Grid from '@mui/material/Grid'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import { useEffect, useState } from "react"
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Description from "src/views/events/Description";
import Faq from "src/views/events/Faq";
import Rules from "src/views/events/Rules";

const Events = () => {
    const router = useRouter()
    
    // console.log(slug)
    const [event, setEvent] = useState(null)
    async function getEventBySlug(slug){
        const response = await axios.get(`https://nginx-varun-dhruv.cloud.okteto.net/api/events/v1/event/?event_slug=${slug}`)
        setEvent(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        const { slug } = router.query
        console.log(slug)
        if(!slug){
            return ;
        }
        getEventBySlug(slug)
    }, [router.query])
    if(!event){
        return "Loading"
    }
    console.log(event)
    return(
        <Grid container spacing={6}>
            <Grid item xs={12} md={6} sx={{height:"100%"}}>
                <CardStatisticsVerticalComponent
                stats={0}
                color='success'
                // trend='negative'
                // trendNumber='-18%'
                // subtitle='Last Week'
                title='Number of Participants'
                icon={<PersonIcon />}/>
            </Grid>
            <Grid item xs={12} md={6} sx={{height:"100%"}}>
                <CardStatisticsVerticalComponent
                stats={`₹ ${event.totalRevenue}`}
                color='warning'
                // trend='negative'
                // trendNumber='-18%'
                // subtitle='Last Week'
                title='Revenue'
                icon={<CurrencyRupeeIcon />}/>
            </Grid>
            <Grid item xs={12} md={4} sx={{height: "100%"}}>
                <Description desc={event.description} id={event._id}/>
            </Grid>
            <Grid item xs={12} md={4} sx={{height: "100%"}}>
                <Rules rules={event.rules} id={event._id}/>
            </Grid>
            <Grid item xs={12} md={4} sx={{height: "100%"}}>
                <Faq faq={event.faq} id={event._id}/>
            </Grid>
            <Grid item xs={12}>
                Participant List
            </Grid>
        </Grid>
    )
}

export default Events