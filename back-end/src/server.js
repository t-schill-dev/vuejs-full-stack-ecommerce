//Entry point backend
import express, { json } from "express";
import { cartItems as cartItemRaw, products as productsRaw } from "./temp-data";

let cartItems = cartItemRaw;
let products = productsRaw;

const app = express();
app.use(express.json()); //parse request body when body undefined

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/cart", (req, res) => {
  res.json(cartItems);
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((product) => product.id === productId);
  res.json(product);
});

app.post("/cart", (req, res) => {
  const productId = req.body.id;
  const product = products.find((product) => product.id === productId);
  res.json(cartItems);
});

app.delete("/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter((product) => product.id !== productId);
  res.json(cartItems);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
