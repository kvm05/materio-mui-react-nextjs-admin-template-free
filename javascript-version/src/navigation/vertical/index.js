// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { eventListContext } from 'src/@core/context/eventsContext'
import { useContext } from 'react'

const navigation = () => {
  const {eventList, updateEventList} = useContext(eventListContext)
  console.log(eventList)
  let eventLinks = []
  eventList.forEach((obj) => {
    let linkObj = {}
    linkObj.title = obj.name
    linkObj.icon = AccountCogOutline
    linkObj.path = '/events/'+obj.slug
    eventLinks.push(linkObj)
  })
  let sidebar = [{
      title: 'Overview',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Users',
      icon: AccountCogOutline,
      path: '/users'
    },
    {
      sectionTitle: 'Events'
    }] 
  sidebar.push(...eventLinks)
  return sidebar
}

export default navigation
