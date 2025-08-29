const API_BASE = "http://localhost:8080/api"; //backend URL

export async function createEvent(eventData,{lng, lat}) {

  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...eventData,
      location: { type: "Point", coordinates: [lng, lat,] },
    })
  });
  if (!res.ok) throw new Error('Failed to create events');
  const data = await res.json();
  return data.feed;
}

export async function getEvents( lat, lng, radiusMeters = 2000) {
  console.log(lat,lng)  
    const res = await fetch(
    `${API_BASE}/events/?lat=${lat}&lng=${lng}&radiusMeters=${radiusMeters}`,
    {
      credentials:"include"
    }
  );
    if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.statusText}`);
    }
    return res.json();
}

export async function updateEvent(eventId, updatedData) {
  const res = await fetch(`${API_BASE}/events/${eventId}`, {
    method: "PUT",  
    credentials:"include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Failed to update event');
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "DELETE",
    credentials:"include",
  });
  if (!res.ok) throw new Error('Failed to delete event');
  return res.json();
}

export async function eventRSVP(id,vote) {
    const res = await fetch(`${API_BASE}/events/${id}/rsvp`, {
    method: "POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({vote}),
    });
    if (!res.ok) throw new Error('Failed to RSVP');
    return res.json();
}

