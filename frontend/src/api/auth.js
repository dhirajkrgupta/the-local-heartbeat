const API_BASE = "http://localhost:8080/api"; 



const createSession = async () => {
  try {
    // Check if session already exists
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: "include",
    });
    const data = await res.json();

    // If no session, create one
    if (!data.authenticated) {
      await fetch(`${API_BASE}/auth/session`, {
        method: "POST",
        credentials: "include",
      });
    }
  } catch (error) {
    console.error("Failed to create or check session:", error);
  }
};



export default createSession;