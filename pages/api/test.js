import { connectToDatabase } from "@/utils/connectDB";
export default async function headers(req, res) {
  const { method, body } = req;
  const client = await connectToDatabase();
  const db = await client.db("kong_face");
  let v = [
    {
      title: "English",
      tag: "languages",
    },
    {
      title: "Chinese",
      tag: "languages",
    },
    {
      title: "French",
      tag: "languages",
    },
    {
      title: "German",
      tag: "languages",
    },
    {
      title: "Spanish",
      tag: "languages",
    },
    {
      title: "Japanese",
      tag: "languages",
    },
    {
      title: "Korean",
      tag: "languages",
    },
    {
      title: "Russian",
      tag: "languages",
    },
    {
      title: "Italian",
      tag: "languages",
    },
    {
      title: "Portuguese",
      tag: "languages",
    },
    {
      title: "Arabic",
      tag: "languages",
    },
    {
      title: "Dutch",
      tag: "languages",
    },
    {
      title: "Turkish",
      tag: "languages",
    },
    {
      title: "Hindi",
      tag: "languages",
    },
    {
      title: "Swedish",
      tag: "languages",
    },
    {
      title: "Polish",
      tag: "languages",
    },
    {
      title: "Indonesian",
      tag: "languages",
    },
    {
      title: "Vietnamese",
      tag: "languages",
    },
    {
      title: "multilingual",
      tag: "languages",
    },
    {
      title: "Finnish",
      tag: "languages",
    },
    {
      title: "Enawené-Nawé",
      tag: "languages",
    },
    {
      title: "Romanian",
      tag: "languages",
    },
    {
      title: "Thai",
      tag: "languages",
    },
    {
      title: "Ukrainian",
      tag: "languages",
    },
    {
      title: "Persian",
      tag: "languages",
    },
    {
      title: "Bengali",
      tag: "languages",
    },
    {
      title: "Catalan",
      tag: "languages",
    },
    {
      title: "Danish",
      tag: "languages",
    },
    {
      title: "Czech",
      tag: "languages",
    },
    {
      title: "Tamil",
      tag: "languages",
    },
    {
      title: "Hungarian",
      tag: "languages",
    },
    {
      title: "Norwegian",
      tag: "languages",
    },
    {
      title: "Urdu",
      tag: "languages",
    },
  ];

  // try {

  //   const insertion = await db.collection("categories").insertMany(v,{ordered:true});
  // // const deletion =await db.collection("categories").deleteMany({tag:"datasets"});

  //   res.status(200).json(insertion);

  // //   res.status(200).json(deletion);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
}
