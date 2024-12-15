import { NextFunction, Request, Response } from "express";
import prisma from "../db";

//get all products
export async function getProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req["user"]["id"],
    },
  });

  res.json({ data: products });
}

//get one product
export async function getOneProduct(req: Request, res: Response) {
  const id = req.params["id"];

  const product = await prisma.product.findUnique({
    where: {
      id,
      belongsToId: req["user"]["id"],
    },
  });

  res.json({ data: product });
}

//create a product
export async function createProduct(req: Request, res: Response, next) {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body["name"],
        belongsToId: req["user"]["id"],
      },
    });

    res.json({ data: product });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//update a product
export async function updateProduct(req: Request, res: Response) {
  const updated = await prisma.product.update({
    where: {
      id: req.params["id"],
      belongsToId: req["user"]["id"],
    },
    data: {
      name: req.body["name"],
    },
  });

  res.json({ data: updated });
}

//delete a product
export async function deleteProduct(req: Request, res: Response) {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params["id"],
      belongsToId: req["user"]["id"],
    },
  });

  res.json({ data: deleted });
}
