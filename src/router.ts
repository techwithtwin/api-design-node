import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { UPDATE_STATUS } from "@prisma/client";

const router = Router();

/**
 * Product
 */

router.get("/product", (req, res) => {
  res.json({ message: "Hello" });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  [body("name").isString(), handleInputErrors],
  (req, res) => {}
);
router.post("/product", [body("name").isString(), handleInputErrors], () => {});
router.delete("/product/:id", () => {});

/**
 * Update
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
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
  (req, res) => {
    res.json({
      message: "Great to see yah!",
    });
  }
);
router.post(
  "/update",
  [body("title").exists().isString(), body("body").exists().isString()],
  () => {}
);
router.delete("/update/:id", () => {});

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

export default router;
