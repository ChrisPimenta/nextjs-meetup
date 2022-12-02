import MeetupList from '../components/meetups/MeetupList';

const HomePage = () => {
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

    return (
        <MeetupList meetups={DUMMY_MEETUPS} />
    )
}

export default HomePage;