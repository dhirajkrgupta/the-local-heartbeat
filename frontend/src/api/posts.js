const API_BASE = "http://localhost:8080/api"; //backend URL

export async function createPost(content, hub) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    },
    body: JSON.stringify({
      content,
      hub,
      location: { type: "Point", coordinates: [77.59, 12.97] }, // dummy location for now
      expiresInHours: 2
    })
  });
  return res.json();
}

export async function getPosts(hub, lat, lng, radiusMeters = 2000) {
  const res = await fetch(
    `${API_BASE}/posts/nearby?hub=${encodeURIComponent(hub)}&lat=${lat}&lng=${lng}&radiusMeters=${radiusMeters}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }

  return res.json();
}

