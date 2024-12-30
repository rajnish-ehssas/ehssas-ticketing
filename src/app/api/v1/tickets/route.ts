import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/mongodb';
import { Ticket } from '@/mongodb/schemas/NewTicketSchema';


// export async function POST() {
//     try {
//         await connectToDatabase();
// const headersList = await headers()
// const userAgent = JSON.parse(headersList.get('userData') as string)
// const body = await request.json();
// const clientReferenceID = userAgent.userId; 
// body--->data from frontend: {
//     name: 'mgdfdsaf',
//     email: 'mg@gmail.com',
//     contactNumber: '7678603441',
//     helpTopic: 'Technical Support',
//     product: 'webApp',
//     subject: '222',
//     message: 'fedsfsdfdsfdsfds',
//     status: 'Open'
//   }

// const ticket = await Tickets.create(body);
// return NextResponse.json(ticket, { status: 201 });

// Step 3: Prepare the new ticket object
// const newTicket = {
//     RaisedBy: body.RaisedBy,
//     email: body.email,
//     contactNumber: body.contactNumber,
//     helpTopic: body.helpTopic,
//     product: body.product,
//     subject: body.subject,
//     messages: [
//         {
//             message: body.message || "Ticket created", // Default message
//             sentBy: "CLIENT",
//             createdAt: new Date(),
//         },
//     ],
//     status: "Open",
//     createdAt: new Date(),
//     updatedAt: new Date(),
// };


// Step 4: Update the document: Push to the openTickets array
// const updatedDocument = await Ticket.findOneAndUpdate(
//     { clientReferenceID }, // Find by clientReferenceID
//     {
//         $push: { "Tickets.openTickets": newTicket }, // Push to openTickets array
//         $set: { updatedAt: new Date() }, // Update main document's updatedAt
//     },
//     { new: true, upsert: true } // Return updated document, create if not found
// );


//         return NextResponse.json({ status: 201 });
//     } catch (error) {
//         return NextResponse.json({ "erorr->": error || 'Failed to create ticket' }, { status: 500 });
//     }
// }


// export async function PUT(request: NextRequest) {
//     try {
//         await connectToDatabase();
//         const body = await request.json();
//         const { id, ...update } = body;
//         const updatedTicket = await Tickets.findByIdAndUpdate(id, update, { new: true });
//         if (!updatedTicket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
//         return NextResponse.json(updatedTicket);
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
//     }
// }

// export async function DELETE(request: NextRequest) {
//     try {
//         await connectToDatabase();
//         const { id } = await request.json();
//         const deletedTicket = await Tickets.findByIdAndDelete(id);
//         if (!deletedTicket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
//         return NextResponse.json(deletedTicket);
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
//     }
// }

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const newTicket = {
            RaisedBy: body.RaisedBy,
            email: body.email,
            contactNumber: body.contactNumber,
            helpTopic: body.helpTopic,
            product: body.product,
            subject: body.subject,
            messages: [
                {
                    message: body.message || 'Ticket created',
                    sentBy: 'CLIENT',
                    createdAt: new Date(),
                },
            ],
            status: "Open"
        };
        const ticket = await Ticket.create(newTicket);
        return NextResponse.json(ticket, { status: 201 });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: 'Failed to create ticket' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    await connectToDatabase();
    const query = status ? { status } : {};
    try {
        await connectToDatabase();
        const tickets = await Ticket.find(query);
        return NextResponse.json(tickets);
    } catch (error) {
        console.log('error', error);
        
        return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
    }
}