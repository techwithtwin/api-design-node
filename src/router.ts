import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { UPDATE_STATUS } from "@prisma/client";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Product
 */

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  [body("name").isString(), handleInputErrors],
  updateProduct
);
router.post(
  "/product",
  [body("name").isString(), handleInputErrors],
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body("status")
      .optional()
      .isIn([
        UPDATE_STATUS.DEPRECATED,
        UPDATE_STATUS.IN_PROGRESS,
        UPDATE_STATUS.SHIPPED,
      ]),
    body("version").optional(),
    handleInputErrors,
  ],
  updateUpdate
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
  ],
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update point
 */

router.get("/update-point", () => {});
router.get("/update-point/:id", () => {});
router.put(
  "/update-point/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
  ],
  () => {}
);
router.post(
  "/update-point",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
  ],
  () => {}
);
router.delete("/update-point/:id", () => {});

router.use((err, req, res, next) => {
  res.status(500).json({ message: "Hello world" });
});

export default router;
