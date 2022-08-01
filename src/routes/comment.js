const { Router } = require("express");
const { create } = require("../controllers/comment");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    /* TODO: validate req.body
     {
      contents: required,
      issueId: required
     }
    */
    const issuer = req.session.user.id;
    res.status(200).json(await create({ ...req.body, issuer }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
