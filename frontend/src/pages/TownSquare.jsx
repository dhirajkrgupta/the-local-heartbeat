import { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import PostCard from "../components/PostCard";
import { createPost, deletePost, getPosts, updatePost } from "../api/posts";
import createSession  from "../api/auth";

export default function TownSquare() {
  const [content, setContent] = useState("");
  const [editingContent,setEditingContent]=useState('');
  const [posts, setPosts] = useState([]);
  const [location,setLocation]=useState({});
  const [editingId, setEditingId] = useState(null);

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

        const data = await getPosts("TownSquare", loc.lat, loc.lng);
        setPosts(data);
        console.log("Fetched posts:", data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchData();
  },[]);

  const handleSubmit = async () => {
    if (!content) return;
    try {
      const newPost = await createPost(content, "TownSquare",location);
      setPosts((prev) => [newPost, ...prev]); 
      console.log("created post:", newPost);
    } catch (error) {
      console.error("Error creating posts:", error);
    }
    setContent("");
  };
const saveEdit=async(postid)=>{
  await updatePost(postid,editingContent);
  const data = await getPosts("TownSquare", location.lat, location.lng);
  setPosts(data);
  setEditingId(null)
}
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      <h1 className="text-3xl mb-6 text-center">RetroBoard</h1>

      {/* Create post */}
      <div className="mb-8 flex gap-2">
        <input
          className="flex-1 bg-black border border-green-400 p-2 focus:outline-none"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="border border-green-400 px-4 hover:bg-green-700 hover:text-black"
        >
          Post
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-green-400 p-4 bg-black shadow-lg"
          >
            {editingId===post.id? (
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-black border border-green-400 p-2 focus:outline-none"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <button
                  onClick={() => saveEdit(post.id)}
                  className="border border-green-400 px-3 hover:bg-green-700 hover:text-black"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="border border-red-400 px-3 text-red-400 hover:bg-red-700 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{post.content}</span>
                {post.isOwner && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(post.id);
                        setEditingContent(post.content);
                      }}
                      className="border border-yellow-400 px-2 text-yellow-400 hover:bg-yellow-700 hover:text-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="border border-red-400 px-2 text-red-400 hover:bg-red-700 hover:text-black"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
