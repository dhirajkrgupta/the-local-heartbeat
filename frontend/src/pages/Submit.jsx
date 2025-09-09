import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextForm from "../components/TextForm";
import StyledTextForm from "../components/StyledTextForm";
import EventForm from "../components/EventForm";


import { createPost } from "../api/posts";

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

const Submit = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const { hubName } = location.state || {};
    let type = "text";
    if(hubName === "BulletinBoard"){
        type = "markdown";
    }
    else if(hubName === "Events"){
        type = "event";
    }

  const handleSubmit = async (content) => {
      if (!content) return;
      try {
        const loc = await getUserLocation();
        const newPost = await createPost(content, hubName, loc);
        console.log("created post:", newPost);
        navigate(-1);
      } catch (error) {
        console.error("Error creating posts:", error);
      }
    };

  let FormComponent;
  switch (type) {
    case "text":
      FormComponent = TextForm;
      break;
    case "markdown":
      FormComponent = StyledTextForm;
      break;
    case "event":
      FormComponent = EventForm;
      break;
    default:
      return <p>Unknown post type</p>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
        <FormComponent
          onSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default Submit;
