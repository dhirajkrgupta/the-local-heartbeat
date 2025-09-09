import { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import PostCard from "../components/PostCard";
import HubLayout from "../components/HubLayout";
import { createPost, deletePost, getPosts, updatePost, votePost } from "../api/posts";
import createSession  from "../api/auth";

export default function HelpDesk() {
  const [content, setContent] = useState("");
  
  const [posts, setPosts] = useState([]);
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

        const data = await getPosts("HelpDesk", loc.lat, loc.lng);
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
      const newPost = await createPost(content, "HelpDesk",location);
      setPosts((prev) => [newPost, ...prev]);
      console.log("created post:", newPost);
    } catch (error) {
      console.error("Error creating posts:", error);
    }
    setContent("");
  };
const saveEdit = async (postId,editingContent) => {
    await updatePost(postId, editingContent);
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, content: editingContent } : post
    ));
  };
  const handleDeletePost =async (postId) => {
    await deletePost(postId);
    setPosts(prev => prev.filter(post => post.id !== postId));
  };
  const handleVote = async(postId, vote) => {
    await votePost(postId, vote);
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
          return { ...post, votes: post.votes + vote};
      }
      return post;
    }));
  };
  return (
        <HubLayout 
      hubName="Help Desk" 
      hubIcon="🆘" 
      hubDescription="Report and find lost items in your community"
    >
      <InputBox 
        onSubmit={handleSubmit}
        placeholder="Describe your issue or question..."
      />
      
      <div className="space-y-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={saveEdit}
            onDelete={handleDeletePost}
            onVote={handleVote}
          />
        ))}
      </div>
    </HubLayout>

  );
}
