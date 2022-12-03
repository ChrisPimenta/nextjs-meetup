import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

// Next renders exactly the page you gave it, but then when you use react hooks etc, you then hydrate the page on runtime.
// SSG: Page is pre-rendered once it is built. Static pages.
// SSR: Built on demand
const HomePage = (props) => {
    return (
        <MeetupList meetups={props.meetups} />
    )
}

// Have to name it this to do SSG
// All code in here never ends up in the client side, just during the build process.
// Can cache on CDN - use this most of the time
export const getStaticProps = async () => {
    const client = await MongoClient.connect('mongodb+srv://Chrispy:or2vAM5VAWDfxoBx@cluster0.o7e5dp2.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}).toArray();

    client.close();

    // This fetch happens before the page even shows which is great for SEO
    return {
        props: {
            meetups: meetups.map(meetup => {
                return {
                    id: meetup._id.toString(),
                    title: meetup.title,
                    imageURL: meetup.imageURL,
                    address: meetup.address,
                    description: meetup.description
                }
            })
        },
        // Incremental static generation
        // If within 10 seconds a new request is made, it will redo this getStaticProps, otherwise it will give the same props as before
        // Your data will never be older than 10 seconds.
        // Not including this will only change probs on build and deploy
        revalidate: 10
    };
}

// // If you want to re-generate the data on every single request and not just within a time limit, then you need to use SSR as below.
// // This code is ALWAYS run only on server. 
// // Some kind of credentials and auth can happen here. It is hidden from the client always.
// // Page needs to wait every request, so only use this for data that can change multiple times per second.
// export const getServerSideProps = async (context) => {
//     // Usefull auth and cookies, header, etc.
//     const { req, res } = context;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;