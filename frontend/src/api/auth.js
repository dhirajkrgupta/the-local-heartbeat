const API_BASE = "http://localhost:8080/api"; //backend URL

export async function createSession() {
  const res = await fetch(`${API_BASE}/auth/session`, {method: "POST"});
  const {token} = await res.json();
  localStorage.setItem("authToken", token);
}
