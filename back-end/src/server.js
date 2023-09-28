//Entry point backend
import express, { json } from "express";
import { MongoClient } from "mongodb";

async function start() {
  const url = `mongodb+srv://adminVueFSA:608850@cluster0.804umgd.mongodb.net/`;
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db("fsv-db");

  const app = express();
  app.use(express.json()); //parse request body when body undefined

  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  });

  async function populateCartIds(ids) {
    console.log("The ids are: ", ids);
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
  }

  app.get("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;

    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get("/api/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection("products").findOne({ id: productId });
    res.json(product);
  });

  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    if (productId === null) {
      console.error("The provided Id is null");
    }
    // Update User
    await db
      .collection("users")
      .updateOne({ id: userId }, { $addToSet: { cartItems: productId } }); // does not add duplicates

    const updatedUser = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(updatedUser.cartItems);
    res.json(populatedCart);
  });

  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const productId = req.params.productId;
    const userId = req.params.userId;

    await db
      .collection("users")
      .updateOne({ id: userId }, { $pull: { cartItems: productId } });

    const updatedUser = await db.collection("users").findOne({ id: userId });
    const populatedCart = populateCartIds(updatedUser.cartItems);
    console.log("Updated ids: ", updatedUser.cartItems);
    res.json(populatedCart);
  });

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

start();
