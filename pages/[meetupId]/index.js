import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetailPage = ({ meetupData }) => {
    return (
        <MeetupDetail {...meetupData} />
    )
}

export const getStaticProps = async (context) => {
    const { meetupId } = context.params;

    // fetch data 
    return {
        props: {
            meetupData: {
                id: meetupId,
                imageURL: "https://picsum.photos/id/237/1920/480",
                address: "Some address",
                description: "The meetup page"
            }
        },
        revalidate: 10
    }
}

// This is needed because this is a dynamic route - it needs to know what pages to pre-generate
export const getStaticPaths = async (context) => {
    return {
        // false = any wrong page route and we give 404. true = we know about these ones, but there could be more that can be generates.
        // This allows us to pre-define our most frequently visited pages for example.
        fallback: false,
        paths: [
            // 1 path for every dynamic route we have
            {
                params: {
                    meetupId: 'm1'
                }
            },
            {
                params: {
                    meetupId: 'm2'
                }
            },
            {
                params: {
                    meetupId: 'm3'
                }

            }
        ]
    }
}

export default MeetupDetailPage;