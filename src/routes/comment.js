const { Router } = require("express");
const { create } = require("../controllers/comment");
const newCommentSchema = require("../requests/commentSchema");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { error } = newCommentSchema.validate(req.body);
    if (error) throw new ValidationError(error.details[0].message);

    const issuer = req.session.user.id;
    res.status(200).json(await create({ ...req.body, issuer }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
