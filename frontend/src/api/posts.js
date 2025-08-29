const API_BASE = "http://localhost:8080/api"; //backend URL

export async function createPost(content, hub,{lng, lat}) {
  
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      hub,
      location: { type: "Point", coordinates: [lng, lat,] },
      expiresInHours: 2
    })
  });
  if (!res.ok) throw new Error('Failed to create post');
  const data = await res.json();
  return data.feed;
}

export async function getPosts(hub, lat, lng, radiusMeters = 2000) {
  console.log(lat,lng)
 
  const res = await fetch(
    `${API_BASE}/posts/nearby?hub=${encodeURIComponent(hub)}&lat=${lat}&lng=${lng}&radiusMeters=${radiusMeters}`,
    {
      credentials:"include"
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }

  return res.json();
}

export async function updatePost(postId, content) {
    const res = await fetch(`${API_BASE}/posts/${postId}`, {
        method: "PUT",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    });
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
}

export async function deletePost(postId) {
    const res = await fetch(`${API_BASE}/posts/${postId}`, {
        method: "DELETE",
        credentials:"include"
    });

    if (!res.ok) throw new Error('Failed to delete post');
    return await res.json();
}

export async function votePost(postId,vote) {
    const res = await fetch(`${API_BASE}/posts/${postId}/vote`, {
        method: "POST",
        credentials:"include",
        body: JSON.stringify({vote}),
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error('Failed to like post');
    return await res.json();
}
