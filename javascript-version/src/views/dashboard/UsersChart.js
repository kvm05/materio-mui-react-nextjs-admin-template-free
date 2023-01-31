import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import ReactApexcharts from 'src/@core/components/react-apexcharts'
import axios from 'axios'
import { useEffect, useState } from 'react'

const UsersChart = (props) => {
    const theme = useTheme()
    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])
    useEffect(async () => {
        const response = await axios.get('https://nginx-varun-dhruv.cloud.okteto.net/api/user/v1/count')
        const res = response.data.data
        setOptions({
            chart:{
                type: 'bar'
            },
            xaxis: {
                categories: ["Users", "Event Heads", "Admin"]
            },
            yaxis: {
                show: true,
                tickAmount: 2
            },
            plotOptions:{
                bar: {
                    borderRadius: 9,
                    distributed: true,
                    columnWidth: '40%',
                    startingShape: 'rounded',
                }
            },
            legend: {show: false}
        })
        setSeries([{
                name: "Users",
                data: [res.genericUser, res.eventHead, res.admin]
            }],
        )
    }, [])
    return(
        <Card>
            <CardHeader
                title='Users'
                titleTypographyProps={{
                    sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
                }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={props.height?props.height:"250"}/>
            </CardContent>
        </Card>
    )
}

export default UsersChart