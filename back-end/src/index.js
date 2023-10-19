//Entry point backend
import express, { json } from "express";
import { MongoClient } from "mongodb";
import path from "path";

async function start() {
  const app = express();
  app.use(express.json()); //parse request body when body undefined

  const port = process.env.PORT || 8000;

  const uri = process.env.MONGODB_URI;
  alert("My url is", uri);
  const client = new MongoClient(uri);

  await client.connect();
  const db = client.db("fsv-db");

  app.use("/images", express.static(path.join(__dirname, "../assets")));

  //Render FE statically
  app.use(
    express.static(path.resolve(__dirname, "../dist"), {
      maxAge: "1y",
      etag: false,
    })
  );

  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  });

  async function populateCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
  }

  app.get("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;

    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.get("/api/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection("products").findOne({ id: productId });
    res.json(product);
  });

  // Adding item to cart
  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    if (productId === null) {
      console.error("The provided Id is null");
      res.status(400).json({ error: "The provided Id is null" });
      return;
    }

    const existingUser = await db.collection("users").findOne({ id: userId });

    if (!existingUser) {
      await db.collection("users").insertOne({ id: userId, cartItems: [] });
    } else {
      await db
        .collection("users")
        .updateOne({ id: userId }, { $addToSet: { cartItems: productId } });
    }

    const updatedUser = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(updatedUser?.cartItems || []);
    res.json(populatedCart);
  });

  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const productId = req.params.productId;
    const userId = req.params.userId;

    await db
      .collection("users")
      .updateOne({ id: userId }, { $pull: { cartItems: productId } });

    const updatedUser = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(updatedUser?.cartItems || []);
    res.json(populatedCart);
  });

  // Send back index for every endpoint not handled
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });

  app.listen(port, () => {
    console.log("Server is listening on port" + port);
  });
}

start();
