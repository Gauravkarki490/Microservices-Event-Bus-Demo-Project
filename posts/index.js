const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.json(posts);
});
app.post("/posts/create", async (req, res) => {
  try {
    const postId = randomBytes(4).toString("hex"); // Generate a random ID for the post
    const { title, content } = req.body;
    posts[postId] = { title, content };

    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        id: postId,
        title,
        content,
      },
    });
    res.status(201).json(posts[postId]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.post("/events", (req, res) => {
  console.log("Event received:", req.body.type);
  const event = req.body;

  // Here you would typically handle the event, e.g., by updating the state of the service
  // For this example, we will just log it and respond with a success message
  res.status(200).send({ status: "Event received" });
});

app.listen(3000, () => {
  console.log("v23");
  console.log("Server is running on port 3000");
});
