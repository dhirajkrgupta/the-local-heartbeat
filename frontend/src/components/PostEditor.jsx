import { useRef } from "react";
import TinyMCEEditor from "./RTE";

const PostEditor = ({
    titleValue,
    onSaveDraft,
    onPost,
    editorApiKey = "vghpsrqotvxwkdqhg68wqby11vfoxdddmebpuq8mczkl003l",
}) => {
    const editorRef = useRef(null);

    const handleEditorInit = (evt, editor) => {
        editorRef.current = editor;
    };

    const handleSaveDraft = () => {
        if (editorRef.current) {
            console.log("Editor content:", editorRef.current.getContent());
        }
        if (onSaveDraft) {
            onSaveDraft({
                title: titleValue,
                content: editorRef.current ? editorRef.current.getContent() : "",
            });
        }
    };

    const handlePost = () => {
        if (onPost) {
            onPost({
                title: titleValue,
                content: editorRef.current ? editorRef.current.getContent() : "",
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-white rounded-xl shadow">
            <input
                type="text"
                placeholder="Title"
                className="w-full p-2 mb-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            <TinyMCEEditor apiKey={editorApiKey} onInit={handleEditorInit} />
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={handleSaveDraft}
                >
                    Draft
                </button>
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

export default PostEditor;
