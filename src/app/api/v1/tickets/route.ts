import { NextResponse, NextRequest } from 'next/server';
import { getUserAuth } from '@/lib/dbAuth';
import { Ticket } from '@/mongodb/schemas/Tickets';
import { ticketClosedMail, ticketGenerateMail } from '@/lib/sendEmail';

export async function POST(request: NextRequest) {
    try {
        const userAuth = await getUserAuth();
        if (!userAuth) {
            return NextResponse.json({ error: 'User authentication failed' }, { status: 401 });
        }
        const { clientReferenceID, roles } = userAuth;
        const body = await request.json();
        // console.log('POST body:', body);
        // console.log('POST userAuth:', userAuth);
        const newTicket = await Ticket.create({
            clientReferenceID,
            name: body.name,
            contactEmail: body.contactEmail,
            contactNumber: body.contactNumber,
            helpTopic: body.helpTopic,
            chooseYourProduct: body.chooseYourProduct,
            domain: body.domain,
            saasProductName: body.saasProductName,
            subject: body.subject,
            messages: [{ message: body.messages, sentBy: roles }],
            status: body.status,
        });
        // console.log("New ticket created successfully:", newTicket);
        ticketGenerateMail(body?.contactEmail, newTicket?._id as string);
        return NextResponse.json(newTicket, { status: 201 });

    } catch (error: unknown) {
        console.error("Error creating ticket:", error);
        return NextResponse.json(
            { error: error || "Failed to create ticket" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const userAuth = await getUserAuth();
    if (!userAuth) {
        return NextResponse.json({ error: 'User authentication failed' }, { status: 401 });
    }
    const { clientReferenceID, roles } = userAuth;
    // console.log('User ID:', userId);
    // console.log('Email:', email);
    // console.log('Client Reference ID:', clientReferenceID);
    // console.log('Roles:', roles);
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    // Add clientReferenceID to the query parameters
    // console.log("queryParams:", queryParams);

    const query = { ...queryParams, clientReferenceID };
    // console.log('query------:', query);
    try {
        if (roles === 'ADMIN') {
            const tickets = await Ticket.find(queryParams);
            return NextResponse.json(tickets);
        } else {
            // await connectToDatabase();
            const tickets = await Ticket.find(query);
            return NextResponse.json(tickets);
        }
    } catch (error) {
        // console.log('error', error);
        return NextResponse.json({ error: error || 'Failed to fetch tickets' }, { status: 500 });
    }
}



export async function PUT(request: NextRequest) {
    const userAuth = await getUserAuth();
    if (!userAuth) {
        return NextResponse.json({ error: 'User authentication failed' }, { status: 401 });
    }

    const { roles } = userAuth;
    try {
        const { ticketId, message, status } = await request.json();
        if (!ticketId) {
            return NextResponse.json({ error: 'id required fields' }, { status: 400 });
        }
        // Find and update the ticket
        const updatedTicket = await Ticket.findOneAndUpdate(
            { _id: ticketId },
            {
                $push: { messages: { sentBy: roles, message: message || "Closed" } },
                status: status,
            },
            { new: true }
        );

        if (!updatedTicket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }
        if(status==="Closed"){
            ticketClosedMail(updatedTicket?.contactEmail, ticketId);
        }
        return NextResponse.json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
    }
}
