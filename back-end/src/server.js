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

function populateCartIds(ids) {
  return ids.map((id) => products.find((product) => product.id === id));
}

app.get("/cart", (req, res) => {
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((product) => product.id === productId);
  res.json(product);
});

app.post("/cart", (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.delete("/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter((id) => id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
