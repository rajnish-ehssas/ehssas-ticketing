import {  NextResponse } from 'next/server';
import { connectToDatabase } from '@/mongodb';
import { Ticket } from '@/mongodb/schemas/NewTicketSchema';

export async function GET() {

    try {
        // Connect to the database
        await connectToDatabase();

        // Retrieve client details and only the openTickets array
        const clientData = await Ticket.find(
            
            {}, // No filter: get all documents
            {
                email: 1,
                companyName: 1,
                serviceType: 1,
                domain: 1,
                saasProductName: 1,
                "Tickets.openTickets": 1,
                _id: 0, // Exclude _id field if not needed
            }
        
        );
      

        // Log the fetched data
        // Return the client data as JSON
        return NextResponse.json({ data: clientData, status: 200 });
    } catch (error) {
        console.error('Error fetching client details and open tickets:', error);
        return NextResponse.json(
            { error: 'Failed to fetch client details and open tickets' },
            { status: 500 }
        );
    }
}
