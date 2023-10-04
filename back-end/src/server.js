//Entry point backend
import express, { json } from "express";
import { MongoClient } from "mongodb";
import path from "path";

async function start() {
  const url = process.env.MONGODB_URL;
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

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log("Server is listening on port" + port);
  });
}

start();
