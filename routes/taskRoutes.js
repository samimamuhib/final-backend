const express = require("express");
const auth = require("../middleware/authMiddleware");
const { validateTask, handleValidationErrors } = require("../middleware/validationMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.use(auth);
router.post("/", validateTask, handleValidationErrors, createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", validateTask, handleValidationErrors, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
