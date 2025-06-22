import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
const PostList = () => {

    const [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:30395/posts')
            setPosts(response.data)
        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const renderPosts = () => {
        return Object.keys(posts).map((postId) => {
            const post = posts[postId]
            
            return (
                <div key={postId} className="mb-4 p-4 border border-gray-300 rounded shadow-sm">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-700">{post.content}</p>
                    <CommentCreate id={postId} />
                    <CommentList comments={post.comments} />
                </div>
            )
        })
    }

  return (
    <div className='m-auto p-4 border border-gray-300 rounded shadow-lg bg-white'>
        <div className="text-3xl font-bold mb-2">Posts</div>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
{renderPosts()}

        </div>
    </div>
  )
}

export default PostList