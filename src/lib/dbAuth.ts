import { connectToDatabase } from '@/mongodb';
import { Client } from '@/mongodb/schemas/ClientSchema';
// import { MongoClient, ObjectId } from 'mongodb';
import { headers } from 'next/headers'

// const uri = 'your_mongodb_connection_string';
// const client = new MongoClient(uri);

export interface UserDetails {
    userId: string;
    email: string;
    clientReferenceID: string;
    roles: string;
    // Add other fields as necessary
}

async function getUserAuth(): Promise<UserDetails | null> {
    try {
        await connectToDatabase();
        const userDataHeader = (await headers()).get('userAuth')
        if (!userDataHeader) {
            // console.log('No userAuth header found');
            return null;
        }
        const userData = JSON.parse(userDataHeader);
        // console.log('userDataHeader-------:', userData);
        // console.log('userDataHeader-------:', userDataHeader);
        const user = await Client.findOne({ _id: (userData.userId) });
        // console.log('user-------:', user);

        if (user) {
            return {
                userId: user._id.toString(),
                email: user.email,
                clientReferenceID: user.clientReferenceID,
                roles: user.roles[0],
                // Map other fields as necessary
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
    // finally {
    //     await client.close();
    // }
}

export { getUserAuth };