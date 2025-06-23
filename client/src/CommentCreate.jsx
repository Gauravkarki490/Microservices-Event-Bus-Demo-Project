import { useState } from 'react'
import React from 'react'
import axios from 'axios'


const CommentCreate = ({id}) => {
    const [comment, setComment] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log("Submitting comment:", comment)
        try {
            let res = await axios.post(`http://posts.com/posts/${id}/comments`, {
                content: comment
            })
            if (res.status === 201) {
                alert("Comment created successfully!")
                setComment("") // Reset the comment input
            } else {
                alert("Failed to create comment.")
            }
        } catch (error) {
            console.error("Error creating comment:", error)
            alert("An error occurred while creating the comment.")
        }
    }

  return (
    <div>
        <div>
                        <input
                            type="text"
                            placeholder="Add a comment"
                            className="mt-2 w-full border border-gray-300 p-2 rounded"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onSubmit}>
                            Submit Comment
                        </button>
    </div>
    </div>
  )
}

export default CommentCreate