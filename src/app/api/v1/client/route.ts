import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/mongodb";
import { Client } from "@/mongodb/schemas/ClientSchema";
import { Ticket } from "@/mongodb/schemas/NewTicketSchema";
import { clientRegistrationMail } from "@/lib/sendEmail";

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    // Parse the request body
    const body = await request.json();
    const { email, companyName, serviceType, domain, saasProductName } = body;
    // console.log("Received data:", { email, companyName, serviceType, domain, saasProductName });

    // Validate mandatory fields
    if (!email || !companyName || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields: email, companyName, or serviceType" },
        { status: 400 }
      );
    }

    // Validate field relevance based on serviceType
    if (serviceType === "webApp" && saasProductName) {
      return NextResponse.json(
        { error: "Invalid data: 'saasProductName' must be empty for 'webApp'" },
        { status: 400 }
      );
    }
    if (serviceType === "saasProduct" && domain) {
      return NextResponse.json(
        { error: "Invalid data: 'domain' must be empty for 'saasProduct'" },
        { status: 400 }
      );
    }

    // Create a new client document
    const newClient = await Client.create({
      email,
      companyName,
      serviceType,
      domain,
      saasProductName,
      password: "Test@123",
    });

    if (newClient.email) {
      clientRegistrationMail({
        email: newClient.email,
        password: "Test@123",
      })
    }

    const newTicket = await Ticket.create({
      clientReferenceID: newClient._id, // Reference to the created client
      email: newClient.email,
      companyName: newClient.companyName,
      serviceType: newClient.serviceType,
      domain: newClient.domain,
      saasProductName: newClient.saasProductName,
    });

    return NextResponse.json(
      {
        message: "Client created and ticket initialized successfully",
        client: newClient,
        ticket: newTicket,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving client and initializing ticket:", error);
    return NextResponse.json({ error: error || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const sortType = url.searchParams.get('sort') || 'name';
    const order = url.searchParams.get('order') || 'asc';
    const sortOptions: Record<string, 1 | -1> = {
      [sortType]: order === 'asc' ? 1 : -1,
    };
    const clients = await Client.find().sort(sortOptions);
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error('Error retrieving clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}







