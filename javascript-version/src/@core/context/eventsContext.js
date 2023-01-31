import React, { useEffect, useState } from 'react';
import axios from "axios";

export const eventListContext = React.createContext()

function EventsContext({children}){
    const [eventList, updateEventList] = useState([])
    const getEvents = async () => {
        let response = await axios.get("https://nginx-varun-dhruv.cloud.okteto.net/api/events/v1")
        console.log(response.data); 
        updateEventList(response.data)
    }
    useEffect(() => {
       
        getEvents()
    }, [])

    return(
        <eventListContext.Provider value = {{eventList, updateEventList, getEvents}}>
            {children}
        </eventListContext.Provider>
    )
}

export {EventsContext}