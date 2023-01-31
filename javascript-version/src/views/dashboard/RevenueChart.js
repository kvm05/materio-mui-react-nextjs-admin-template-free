import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import ReactApexcharts from 'src/@core/components/react-apexcharts'

const RevenueChart = () => {
    const theme = useTheme()
    const options = {
            series: [44, 55, 13, 18, 19, 30, 55, 10, 19, 33],
            labels: ['OCL', 'Techrace', 'IPL Auction', 'AEJ', 'Carnival', 'Hackathon', 'Sargam', 'VSM', 'E-Sports', 'Unpaid'],
            plotOptions:{
                pie:{
                    donut:{
                        labels:{
                            show: true,
                            total: {
                                show: true,
                                fontSize: "20px",
                                formatter: function (val){
                                    const sum = val.config.series.reduce((partialSum, a) => partialSum + a, 0)
                                    return "₹"+sum
                                }
                            },
                            name:{
                                show: true,
                                fontSize: "10px",
                                fontFamily: theme.typography.fontFamily
                            },
                            value:{
                                show: true,
                                fontSize: "10px",
                                fontFamily: theme.typography.fontFamily,
                                formatter: function (val){
                                    return "₹"+val
                                }
                            }
                        },
                        size: "65"
                    },
                    dataLabels: {
                        enabled: true,
                    }
                }
            },
            legend: {show: false}
        }
        
    return(
        <Card sx={{height:"100%"}}>
            <CardHeader
                title='Revenue'
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

export default RevenueChart