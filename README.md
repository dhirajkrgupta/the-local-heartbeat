# The Local Heartbeat

**The Local Heartbeat** is a hyper-local, anonymous community platform that connects people in the same geographic area through real-time posts. The app focuses on *what’s happening* instead of *who is posting*, enabling candid conversations, humor, and practical help without personal profiles.

---

## ✨ Features

### 🔐 Anonymous Authentication
- No profiles or usernames.
- Session-based authentication using JWT.
- Each session generates a unique ID; deleting a session wipes the digital footprint.

### 🗣️ The Town Square
- Text-only, short-lived posts (e.g., 2 hours).
- Temporary anonymous handles for each session.
- Focused on live local news, observations, and casual chatter.

### 💬 The Bulletin Board
- Free-form hub for memes, thoughts, and humor.
- Posts disappear after a day or two.
- Anonymous emoji reactions.

### 🤝 Lost & Found
- Practical hub for posting lost or found items.
- Strict posting format: “Lost” or “Found”.
- Temporary private chat auto-deletes after the conversation.

### 🛠️ The Help Desk
- Peer-to-peer space for requesting or offering help.
- Posts tagged as “Request” or “Offer”.
- Anonymous, short-lived private chat for coordination.

### 🗓️ Local Events Hub
- Crowdsourced calendar for small, local events.
- Posts contain: Title, Date, Time, and Location.
- No comments; events expire after the scheduled time.

### 📍 Geolocation Filtering
- Posts are visible only to users within a defined radius.
- MongoDB geospatial queries ensure hyper-local relevance.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (with geospatial indexing)  
- **Auth:** JWT-based anonymous session management  

---

