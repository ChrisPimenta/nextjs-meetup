import { MongoClient } from 'mongodb';

// This is now Node JS
// Everything in API folder will always run only on the server
// api/new-meetup
const handler = async (req, res) => {
    if (req.method === 'POST') {
        // const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://Chrispy:or2vAM5VAWDfxoBx@cluster0.o7e5dp2.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(req.body);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;