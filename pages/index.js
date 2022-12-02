import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: '1 meetup',
        image: 'https://picsum.photos/id/237/1920/480',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a 1 meetup!'
    },
    {
        id: 'm2',
        title: '2 meetup',
        image: 'https://picsum.photos/id/238/1920/480',
        address: 'Some address 7, 12345 Some City',
        description: 'This is a 2 meetup!'
    },
    {
        id: 'm3',
        title: '3 meetup',
        image: 'https://picsum.photos/id/239/1920/480',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a 3 meetup!'
    }
];

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
    // Over here you can do some API fetch - this fetch happens before the page even shows which is great for SEO
    return {
        props: {
            meetups: DUMMY_MEETUPS
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