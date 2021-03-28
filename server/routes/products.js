import express from "express";
import { getProducts, createProduct, deleteProduct } from "../controllers/products.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter });

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);
router.delete("/:id", deleteProduct);

export default router;
