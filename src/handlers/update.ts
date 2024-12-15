import { Request, Response } from "express";
import prisma from "../db";

// get all updates
export async function getUpdates(req: Request, res: Response) {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req["user"]["id"],
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce(
    (allUpdates, product) => [allUpdates, ...product.updates],
    []
  );

  res.json({ data: updates });
}

// get single update
export async function getOneUpdate(req: Request, res: Response) {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params["id"],
      product: {
        belongsToId: req["user"]["id"],
      },
    },
  });

  res.json({
    data: update,
  });
}

//create an update
export async function createUpdate(req: Request, res: Response) {
  const productId = req.body["productId"];
  const title = req.body["title"];
  const body = req.body["body"];
  const version = req.body["version"];

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!existingProduct) {
    res.status(400).json({ error: "Product Does not Exist!" });
    return;
  }

  if (!title || !body) {
    res.status(400).json({
      error: "Invalid Data",
    });
    return;
  }

  const createdUpdate = await prisma.update.create({
    data: {
      title,
      body,
      version,
      productId: existingProduct.id,
    },
  });

  res.json({ data: createdUpdate });
}

// update an update
export async function updateUpdate(req: Request, res: Response) {
  const updatedUpdate = await prisma.update.findUnique({
    where: {
      id: req.params["id"],
      product: {
        belongsToId: req["user"]["id"],
      },
    },
  });

  res.json({ data: updatedUpdate });
}

// delete an update
export async function deleteUpdate(req: Request, res: Response) {
  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params["id"],
      product: {
        belongsToId: req["user"]["id"],
      },
    },
  });

  res.json({
    data: deletedUpdate,
  });
}
