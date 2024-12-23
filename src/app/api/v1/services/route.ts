import { NextResponse } from 'next/server';

export async function POST() {
    // const body = await request.json();
    // console.log("Request received inside services post controller:", body);
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Parse the request body
//     const body = await request.json();
//     console.log("Request received:", body);

//     // Validate required fields (optional but recommended)
//     const { email, companyName, services } = body;
//     if (!email || !companyName || !services) {
//       return NextResponse.json(
//         { error: "Missing required fields: email, companyName, services" },
//         { status: 400 }
//       );
//     }

//     // Create a new client document in the database
//     const newClient = await services.create(body);

//     // Return the created document
//     return NextResponse.json(newClient, { status: 201 });
//   } catch (error) {
//     console.error("Error saving client to database:", error);
//   }
}


export async function GET() {
  try {
    const htmlContent = `
    <html>
      <head>
        <title>Hello Useraa</title>
      </head>
      <body>
        <h1>Hello User</h1>
        <h1>Hello User</h1>
        <h1>Hello User</h1>
        <button>this</button>
      </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
   
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
