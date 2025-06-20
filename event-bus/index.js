const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const events = [];

app.get('/events', (req, res) => {
    res.send(events);
}
);

app.post('/events', (req, res) => {
    console.log('Event received:', req.body);

    const event = req.body;
    events.push(event);

    //? Forward the event to other services
    axios.post('http://posts-clusterip-srv:3000/events', event).catch((err) => {
        console.error('Error sending event to posts service:', err);
    })
    // axios.post('http://localhost:4001/events', event).catch((err) => {
    //     console.error('Error sending event to posts service:', err);
    // })
    // axios.post('http://localhost:4002/events', event).catch((err) => {
    //     console.error('Error sending event to posts service:', err);
    // })
    // axios.post('http://localhost:4003/events', event).catch((err) => {
    //     console.error('Error sending event to posts service:', err);
    // })
    // Here you would typically handle the event, e.g., by broadcasting it to other services
    // For this example, we will just log it and respond with a success message
    res.status(200).send({ status: 'Event bus received event' });
});

app.listen(4005, () => {
    console.log('Event bus listening on port 4005');
});
