const express = require('express');
const postController = require("./../controller/post.controller.js");
const auth = require('../middleware/auth.middleware.js');

const router = express.Router();
router.get("/getall",auth, postController.getAll);
router.get("/getone/:id",auth, postController.getOne);
router.post("/create",auth, postController.Create);
router.put("/update/:id",auth, postController.Update);
router.delete("/delete/:id",auth, postController.Delete);
router.post("/:id/emotion",auth , postController.Addemotion);
router.delete("/:id/emotion",auth , postController.DeleteEmotion);

module.exports = router;