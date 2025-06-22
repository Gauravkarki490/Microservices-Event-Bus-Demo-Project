const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title, content } = data;
    posts[id] = { id, title, content, comments: [] };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    if (posts[postId]) {
      posts[postId].comments.push({ id, content, status });
    }
  } else if (type === "CommentUpdated") {
    const { id, postId, status, content } = data;
    if (posts[postId]) {
      const comment = posts[postId].comments.find((c) => c.id === id);
      if (comment) {
        comment.status = status;
        comment.content = content;
      }
    }
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  console.log("Current posts state:", posts);
  res.status(200).send({ status: "Event received" });
});

app.listen(4002, async () => {
  console.log("Query service listening on port 4002");
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");
    res.data.forEach((event) => {
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
});
