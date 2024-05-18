const uri = process.env.MONGODB_URI || "";
import { MongoClient, ServerApiVersion } from "mongodb";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

function getMongoDBClient() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
}

export async function GET(
  request: Request,
  { params }: { params: { userID: string } }
) {
  const { userID } = params;
  let data;

  const client = getMongoDBClient();
  try {
    client.connect();
    const resume = client.db("resume-database").collection("resumes");

    data = await resume.findOne({ name: userID });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  if (!data) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  return Response.json(data);
}
// post
export async function POST(
  request: Request,
  { params }: { params: { userID: string } }
) {
  // get body
  const body = await request.json();
  const { userID } = params;
  const client = getMongoDBClient();
  try {
    client.connect();
    const resume = client.db("resume-database").collection("resumes");
    await resume.updateOne(
      { name: userID, workspace: "1" },
      {
        $set: {
          body: body,
          name: userID,
        },
      },
      { upsert: true }
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return Response.json(body);
}
