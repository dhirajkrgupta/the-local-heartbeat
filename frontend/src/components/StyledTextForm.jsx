import { useRef,useState } from "react";
import TinyMCEEditor from "./RTE";

const StyledTextForm = ({onSubmit}) => {

    const [title, setTitle] = useState("");
    const editorRef = useRef(null);

    const handleEditorInit = (evt, editor) => {
        editorRef.current = editor;
    };

  

    const handlePost = () => {
        if (onSubmit) {
            let content= editorRef.current ? editorRef.current.getContent() : "";
            content="<h1><strong>"+title+"</strong></h1>"+content;
            onSubmit(content);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-white rounded-xl shadow">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            <TinyMCEEditor apiKey={import.meta.env.VITE_TINYMCE_API_KEY} onInit={handleEditorInit} />
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handlePost}
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default StyledTextForm ;
;
