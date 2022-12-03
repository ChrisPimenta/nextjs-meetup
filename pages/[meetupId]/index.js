import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from 'mongodb';

const MeetupDetailPage = (props) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <MeetupDetail {...props} />
        </>
    )
}

// This is needed because this is a dynamic route - it needs to know what pages to pre-generate
export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://Chrispy:or2vAM5VAWDfxoBx@cluster0.o7e5dp2.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://Chrispy:or2vAM5VAWDfxoBx@cluster0.o7e5dp2.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

    client.close();

    // fetch data 
    return {
        props: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            imageURL: selectedMeetup.imageURL,
            address: selectedMeetup.address,
            description: selectedMeetup.description
        },
        revalidate: 10
    }
}

export default MeetupDetailPage;