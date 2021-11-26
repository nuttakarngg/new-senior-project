const express = require("express");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../database/models/branch");
const Branch = require("../database/models/branch");
const Research = require("../database/models/research");
const Role = require("../database/models/role");
const User = require("../database/models/user");
const router = express.Router();
const { authentication } = require("../middlewares/authentication");
router.use(authentication);

router.get("/getPricePerYear", async (request, response) => {
  try {
    const { branchList, useYear, year, startYear, endYear } = request.query;
    let clause = "r.researchBudgetYear";
    if (useYear == "true") {
      clause += ` BETWEEN ${startYear} and ${endYear} `;
    } else {
      clause += ` = ${year}`;
    }
    clause += " AND ";
    if (branchList.length > 0) {
      clause += `u.branchId IN (${branchList.join(",")})`;
    } else {
      clause += `1=1`;
    }
    const research = await sequelize.query(
      `select sum(r.researchBudget) as total,b.color,b.name_th from research r join users u on u.id = r.researcherId join branches b on u.branchId = b.id where ${clause} GROUP BY u.branchId`,
      { type: QueryTypes.SELECT }
    );
    // const research = await Research.findAll({
    //   attributes: [
    //     // "researchBudget",
    //     // [sequelize.fn("sum", sequelize.col("researchBudget")), "totalBudget"],
    //   ],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["branchId"],
    //       group: "branchId",
    //       required: true,
    //       where:
    //         branchList?.length > 0
    //           ? {
    //               BranchId: branchList || [],
    //             }
    //           : null,
    //     },
    //   ],
    //   where: {
    //     researchBudgetYear:
    //       useYear == "true"
    //         ? {
    //             [Op.between]: [startYear, endYear],
    //           }
    //         : year,
    //   },
    //   // group:'branchId'

    // });
    return response.status(200).json({ data: research });
  } catch (e) {
    console.log(e);
    return response.status(500).json({
      error: "network error!",
    });
  }
});

module.exports = router;
