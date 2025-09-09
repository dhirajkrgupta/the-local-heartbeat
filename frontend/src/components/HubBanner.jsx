import { useNavigate } from "react-router-dom";


const SubredditHero = ({hubName, hubIcon, hubDescription,hubbanner}) => {
  const  navigate=useNavigate();
  const handleCreatePostClick = () => {
    console.log("Create Post button clicked!");
    navigate("/createpost", {
      state: {type:"markdown",hubName:hubName}
    });
  }

  console.log("Rendering HubBanner with:", {hubName, hubIcon, hubDescription, hubbanner});
  return (
    <div className="bg-gray-100 font-sans">
       
      <div
        className="h-48 bg-cover bg-center rounded-2xl"
      style={{ backgroundImage: `url(${hubbanner})`}}
      ></div>

      <div className="bg-white  -mt-12  shadow-md rounded-b-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6  ">
          <div className="flex justify-between items-end -mt-10 py-4">
            
              <div className="pb-2 flex items-center gap-3">
                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl text-center">{hubIcon}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900"> h/{hubName}</h1>
                <span className="text-sm text-gray-500">• {hubDescription}</span>
              </div>

            
            <div className="flex items-center space-x-2 pb-2 ">
              <button className="hidden md:block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full"
              onClick={handleCreatePostClick}>
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubredditHero;