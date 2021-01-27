import mongoose from 'mongoose';
const mongoURI = 'mongodb+srv://RamsPantoja:Left4Dead2@devclosterrams.nodjj.mongodb.net/discordDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

const channelSchema = mongoose.Schema({
    channelName: String,
    messages: [
        {
            message: String,
            timestamp: String,
            user: {
                displayName: String,
                email: String,
                photo: String,
                uid: String
            }
        }
    ]
})

export const Channels = mongoose.model('channels', channelSchema);