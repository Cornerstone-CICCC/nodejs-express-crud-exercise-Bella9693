import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let products: {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
}[] = [];

app.get("/products", (req: Request, res: Response) => {
  res.json(products);
});

app.post("/products", (req: Request, res: Response) => {
  const newProduct = {
    id: Date.now(),
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Product deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
