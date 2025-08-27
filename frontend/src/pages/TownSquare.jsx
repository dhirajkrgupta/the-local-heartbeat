import { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import PostCard from "../components/PostCard";
import { createPost, getPosts } from "../api/posts";
import { createSession } from "../api/auth";

export default function TownSquare() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    createSession().then(() => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const data = await getPosts("TownSquare", latitude, longitude);
            setPosts(data);
            console.log("Fetched posts:", data);
          } catch (err) {
            console.error("Error fetching posts:", err);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    });
  }, []);

  const handleSubmit = async () => {
    if (!content) return;
    const newPost = await createPost(content, "TownSquare");
    setPosts([newPost, ...posts]);
    setContent("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <InputBox value={content} onChange={setContent} onSubmit={handleSubmit} />
      <div className="space-y-3">
        {!posts&&posts.map((p) => (
          <PostCard key={p._id} content={p.content} handle={p.displayHandle} createdAt={p.createdAt} />
        ))}
      </div>
    </div>
  );
}
