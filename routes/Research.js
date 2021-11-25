const express = require("express");
const Research = require("../database/models/research");
const User = require("../database/models/user");
const {
  user_research,
} = require("../database/models/association/user_research");
const router = express.Router();
const { authentication } = require("../middlewares/authentication");
router.use(authentication);
const Branch = require("../database/models/branch");
const { Op } = require("sequelize");

router.get("/", async (request, response) => {
  try {
    const { keyword, startYear, endYear, useYear, branchList, researchResult } =
      request.query;
    console.log(
      keyword,
      startYear,
      endYear,
      useYear,
      branchList,
      researchResult
    );
    const research = await Research.findAll({
      include: [
        {
          model: User,
          include: [
            {
              model: Branch,
              where:
                branchList?.length > 0
                  ? {
                      id: branchList || [],
                    }
                  : null,
            },
          ],
        },
      ],
      where: {
        [Op.and]: {
          [Op.or]: {
            researchNameTH: {
              [Op.like]: `%${keyword}%`,
            },
          },
          researchResult: {
            [Op.like]: researchResult === "" ? "%%" : `%${researchResult}%`,
          },
        },
      },
    });
    return response.json({
      status: 200,
      data: research,
    });
  } catch (e) {
    console.log(e);
    return response.status(500).json({
      error: "network error!",
    });
  }
});
router.post("/", (request, response) => {
  try {
    const research = request.body;
    console.log(request.user);
    let result = Research.create({
      ...research,
      researcherId: request.user.id,
    });
    return response.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    return response.status(500).json({
      error: "network error!",
    });
  }
});

router.get("/getResearchById/:id", async (request, response) => {
  try {
    const id = request.params.id;
    if (id) {
      const research = await Research.findAll({
        where: {
          researcherId: id,
        },
        // order:
      });
      return response.status(200).json({
        data: research,
      });
    }
    return response.status(200).json(null);
  } catch (e) {
    console.log(e);
    return response.status(500).json({
      error: "network error!",
    });
  }
});
module.exports = router;
