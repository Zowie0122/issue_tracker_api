const { Router } = require("express");
const {
  BadRequestGenericError,
  UnauthorizedError,
} = require("../utils/errors");
const { list, getById, updateSelf } = require("../controllers/user");
const { getCompanyIdByUserId } = require("../controllers/company");

const router = Router();

// get all the users within the same company
router.get("/", async (req, res, next) => {
  try {
    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(await list(companyId));
  } catch (e) {
    next(e);
  }
});

// get an user by user id
router.get("/:id", async (req, res, next) => {
  try {
    const targetUser = await getById(req.params.id);

    // if an user retrives the info of him/her self
    if (req.session.user.id === req.params.id) {
      res.status(200).json(targetUser);
    }

    const currentUserCompanyId = await getCompanyIdByUserId(
      req.session.user.id
    );

    // if an user retrives another company's user
    if (targetUser.company_id !== currentUserCompanyId) {
      throw UnauthorizedError();
    }

    res.status(200).json(targetUser);
  } catch (e) {
    next(e);
  }
});

// an user update him/her self
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) throw BadRequestGenericError();
    /* TODO: validate req body and params
    {
      firstName, lastName, password
    }
    */

    if (req.params.id !== req.session.user.id) {
      throw new UnauthorizedError();
    }

    res
      .status(200)
      .json(await updateSelf({ ...req.body, id: req.session.user.id }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
