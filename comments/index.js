const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const  axios = require('axios');
const cors = require('cors');
const { stat } = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req,res)=>{
res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments',async  (req, res) => {
  try{

    const {content} = req.body;
    const id = randomBytes(4).toString('hex');
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id, content,status: 'pending'});
    
    commentsByPostId[req.params.id] = comments;
    
    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id,
        content,
        postId: req.params.id,
        status: 'pending'
      }
    })
    // Here you would typically save the comment to a database
    // For this example, we will just return the comment with the new ID
    res.status(201).send(comments);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

app.post('/events',async (req,res)=>{
  console.log('Event received:', req.body.type);
  const {type,data} = req.body;
  if(type === 'CommentModerated') {
    const {id, postId, status,content} = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(c => c.id === id);
    if (comment) {
      comment.status = status;

      await axios.post('http://localhost:4005/events', {
        type: 'CommentUpdated',
        data: {
          id,
          postId,
          status,
          content
        }
      });
    }

  }
  // Here you would typically handle the event, e.g., by updating the state of the service
  // For this example, we will just log it and respond with a success message
  res.status(200).send({ status: 'Event received' });
})
app.listen(4001, () => {
  console.log('Comments service listening on port 4001');
});
