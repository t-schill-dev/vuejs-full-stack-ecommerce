//Entry point backend
import express, { json } from "express";
import { MongoClient } from "mongodb";
import path from "path";

async function start() {
  const url = `mongodb+srv://adminVueFSA:608850@cluster0.804umgd.mongodb.net/`;
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db("fsv-db");

  const app = express();
  app.use(express.json()); //parse request body when body undefined

  app.use("/images", express.static(path.join(__dirname, "../assets")));

  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  });

  async function populateCartIds(ids) {
    Promise.all(ids.map((id) => db.collection("products").findOne({ id })));
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
    }
    // Find existing user and add if not existing
    const existingUser = await db.collection("users").findOne({ id: userId });

    if (!existingUser) {
      await db
        .collection("users")
        .insertOne({ id: userId }, { $addToSet: { cartItems: productId } });
    }

    // Update user if found
    await db
      .collection("users")
      .updateOne({ id: userId }, { $addToSet: { cartItems: productId } }); // does not add duplicates

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

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

start();
