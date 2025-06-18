import React, {useState} from "react";
import axios
 from "axios";
const PostCreate = () => {
    const [post,setPost] = useState({
        title: "",
        content: ""
    });

    const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting post:", post);
    let res = await axios.post("http://localhost:3000/posts", {
        title: post.title,
        content: post.content
    })
    if (res.status === 201) {
      alert("Post created successfully!");
      setPost({title: "", content: ""}); // Reset the form
    } else {
      alert("Failed to create post.");
    }

    }
  return (
    <div className="m-auto  p-4 border border-gray-300 rounded shadow-lg bg-white  ">
      <div className="text-3xl  font-bold mb-2">Create a Post</div>
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <label htmlFor="title" className="mb-2 block text-gray-700 text-l select-none">
            Title
          </label>
          <input
            type="text"
            className="h-10 w-full border-1  p-2"
            id="title"
            placeholder="Enter title"
            onChange={(e) => setPost({...post, title: e.target.value})}
            value={post.title}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="mb-2 block text-gray-700 text-lg select-none">
            Content
          </label>
          <textarea
            className="w-full h-24 border border-gray-300 p-2 rounded"
            id="content"
            placeholder="Enter content"
            rows={4}
            onChange={(e) => setPost({...post, content: e.target.value})}
            value={post.content}
          />
        </div>
        <button className="border rounded border-gray-300 py-2 px-4 hover:bg-indigo-400 hover:text-white cursor-pointer" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
