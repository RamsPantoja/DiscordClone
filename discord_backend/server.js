import express from 'express';
import cors from 'cors';
import { Channels } from './db.js'
import Pusher from 'pusher'
import mongoose from 'mongoose';
//app config
const app = express();
const port  = process.env.PORT || 8002;

//middlewares
app.use(express.json());
app.use(cors());

//api routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

const pusher = new Pusher({
    appId: "1107073",
    key: "f3df24617a5e9aacdfec",
    secret: "24a474493bfa62b89e3c",
    cluster: "us2",
    useTLS: true
});


mongoose.connection.once('open', () => {
    console.log('DB Connected')

    const changeStream = mongoose.connection.collection('channels').watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('channels', 'newChannel', {
                'change': change
            });
        } else if (change.operationType === 'update') {
            pusher.trigger('messages', 'newMessage', {
                'change': change
            });
        } else {
            console.log('Error triggering Pusher')
        }
    })
})



//add a new channel
app.post('/new/channel', async (req, res) => {
    const channel = req.body;
    await Channels.create( channel, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
});

//query all channels
app.get('/channels', async (req, res) => {
    await Channels.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            let channels = [];
            
            data.map(channelData => {
                const channelInfo = {
                    id: channelData.id,
                    channelName: channelData.channelName
                }

                channels.push(channelInfo);
            })
            res.status(200).send(channels);
        }
    });
})

app.post('/new/message', async (req, res) => {
    await Channels.updateOne({_id: req.query.id}, {$push: { messages: req.body}}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.get(`/channel/messages`, async (req, res) => {
    await Channels.find({_id: req.query.id}, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

//listen
app.listen(port, () =>  console.log(`🚀 Server is running http://localhost:${port}`))