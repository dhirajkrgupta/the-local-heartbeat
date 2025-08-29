import { useState, useEffect } from "react";

import HubLayout from "../components/HubLayout";
import {createEvent,getEvents,updateEvent,deleteEvent,eventRSVP} from "../api/events";
import createSession  from "../api/auth";
import EventInputBox from "../components/EventInputBox";
import EventCard from "../components/EventCard";

export default function Events() {
  
  
  const [events, setEvents] = useState([]);
  const [location,setLocation]=useState({});


  const getUserLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (err) => reject(err)
    );
  });

  useEffect(() => {
    const fetchData=async () => {
      try {
        await createSession();
        const loc = await getUserLocation();
        setLocation(loc);

        const data = await getEvents( loc.lat, loc.lng);
        setEvents(data);
        console.log("Fetched events:", data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchData();
  },[]);

  const handleSubmit = async (eventData) => {
    if (!eventData) return;
        try {
          console.log("Creating event with data:", eventData, "at location:", location);
          const newEvent= await createEvent(eventData,location);
          setEvents((prev) => [newEvent, ...prev]);
          console.log("created post:", newEvent); 
        } catch (error) {
          console.error("Error creating posts:", error);
        }
  };

const saveEdit = async (id,editingContent) => {
    await updateEvent(id, editingContent);
    setEvents(prev => prev.map(event =>
      event.id === event ? { ...event, content: editingContent } : event
    ));
  };
  const handleDeleteEvent =async (id) => {
    await deleteEvent(id);
    setEvents(prev => prev.filter(event => event.id !== id));
  };
  const handleRSVP = async(id,vote) => {
    await eventRSVP(id,vote);
    setEvents(prev => prev.map(event => {
      if (event.id === id) {
          return { ...event, interested: event.interested + vote};
      }
      return event;
    }));
  };
  return (
        <HubLayout 
      hubName="Events" 
      hubIcon="🔍" 
      hubDescription="Discover and share local events and activities"
    >
      <EventInputBox 
        onSubmit={handleSubmit}
      />
      
      <div className="space-y-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={saveEdit}
            onDelete={handleDeleteEvent}
            onVote={handleRSVP}
          />
        ))}
      </div>
    </HubLayout>

  );
}
