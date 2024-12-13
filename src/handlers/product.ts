import { Request, Response } from "express";
import prisma from "../db";

export function createProduct() {}

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
