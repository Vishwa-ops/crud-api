const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// =====================
// Health Check
// =====================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "CRUD API is running",
  });
});

// =====================
// Create Product
// =====================
app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating product",
    });
  }
});

// =====================
// Get All Products
// =====================
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching products",
    });
  }
});

// =====================
// Get Product By ID
// =====================
app.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching product",
    });
  }
});

// =====================
// Update Product
// =====================
app.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price: Number(price),
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating product",
    });
  }
});

// =====================
// Delete Product
// =====================
app.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting product",
    });
  }
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
