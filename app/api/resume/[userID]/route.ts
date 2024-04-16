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
  const userID = params.userID;
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

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     // write sample data to the database
//     const resume = client.db("resume-database").collection("resumes");
//     // const result = await resume.insertOne({ name: "Red", age: 21 });
//     // console.log(`New listing created with the following id: ${result.insertedId}`);
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
