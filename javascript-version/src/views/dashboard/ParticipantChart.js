import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import ReactApexcharts from 'src/@core/components/react-apexcharts'

const ParticipantChart = () => {
    const theme = useTheme()
    const options = {
            series: [44, 55, 13, 18, 19, 30, 55, 10, 19],
            labels: ['OCL', 'Techrace', 'IPL Auction', 'AEJ', 'Carnival', 'Hackathon', 'Sargam', 'VSM', 'E-Sports'],
            plotOptions:{
                pie:{
                    donut:{
                        labels:{
                            show: true,
                            name:{
                                show: true,
                            }
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '20px',
                        },    
                    }
                }
            },
            dataLabels:{
                formatter: function (val, opts) {
                    return opts.w.config.series[opts.seriesIndex]
                },
            },
            legend: {show: false}
        }
    console.log(options)
    return(
        <Card sx={{height:"100%"}}>
            <CardHeader
                title='Participant'
                titleTypographyProps={{
                    sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
                }}
            />
            <CardContent>
                <ReactApexcharts type='donut' options={options} series={options.series} height='275'/>
            </CardContent>
        </Card>
    )
}

export default ParticipantChart