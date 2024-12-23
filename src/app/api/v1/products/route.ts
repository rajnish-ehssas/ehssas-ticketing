import { NextResponse } from "next/server";
import { connectToDatabase } from "@/mongodb";
import { Client } from "@/mongodb/schemas/ClientSchema";
import { headers } from "next/headers";

export async function GET() {
  try {
    await connectToDatabase();
    const headersList = await headers()
    const userAgent = JSON.parse(headersList.get('userData') as string)
    if(!userAgent){
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const clientdata = await Client.findOne({ _id: userAgent.userId })
    const response = { 
      products: clientdata.serviceType, 
      domain:clientdata.domain,
      saasProductName:clientdata.saasProductName
    
    }
    // Connect to the database
    return NextResponse.json({response}, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
