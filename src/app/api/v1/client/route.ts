import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/mongodb";
import { Client } from "@/mongodb/schemas/ClientSchema";
import { clientRegistrationMail } from "@/lib/sendEmail";
import { CLIENT_PASSWORD } from "@/env";
import { getUserAuth } from "@/lib/dbAuth";

export async function POST(request: NextRequest) {
  try {
    const userAuth = await getUserAuth();
    if (!userAuth) {
      return NextResponse.json({ error: 'User authentication failed' }, { status: 401 });
    }
    // const { userId, email, clientReferenceID, roles } = userAuth;
    // Connect to the database
    // await connectToDatabase();
    // Parse the request body
    const body = await request.json();
    const { email, companyName, serviceType, domain, saasProductName } = body;

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
      clientReferenceID: email.split(".")[0] + Date.now(),
      password: CLIENT_PASSWORD,
    });

    if (newClient.email) {
      clientRegistrationMail({
        email: newClient.email,
        password: CLIENT_PASSWORD,
      })
    }
    return NextResponse.json(
      {
        message: "Client created Successfully",
        // client: newClient,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving client :", error);
    return NextResponse.json({ error: error || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // await connectToDatabase();
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







