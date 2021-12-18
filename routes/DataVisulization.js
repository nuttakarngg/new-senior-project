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
      `select sum(r.researchBudget) as total,b.color,b.name_th from research r join researchs_researchers rr on rr.researchId = r.researchId join users u on u.id = rr.userId join branches b on u.branchId = b.id where ${clause} GROUP BY u.branchId order by sum(r.researchBudget) DESC`,
      { type: QueryTypes.SELECT }
    );
    return response.status(200).json({ data: research });
  } catch (e) {
    console.log(e);
    return response.status(500).json({
      error: "network error!",
    });
  }
});

router.get("/getTrendByYear", async (request, response) => {
  try {
    const { yearList } = request.query;
    const { branchList } = JSON.parse(request.query.filterState);
    console.log(branchList);
    let clause = " AND ";
    if (branchList && branchList.length > 0) {
      clause += `u.branchId IN (${branchList.join(",")})`;
    } else {
      clause += `1=1`;
    }
    let clause2 = " AND ";
    let date = new Date();
    if (yearList && yearList.length > 0) {
      clause2 += `r.researchBudgetYear between ${
        date.getFullYear() + 543 - yearList
      } and ${date.getFullYear() + 543}`;
    } else {
      clause2 += `1=1`;
    }
    const research = await sequelize.query(
      `select sum(r.researchBudget) as total,u.branchId,b.*,r.researchBudgetYear from research r join researchs_researchers rr on rr.researchId = r.researchId join users u on u.id = rr.userId join branches b on u.branchId = b.id where true ${clause} ${clause2} GROUP BY u.branchId,r.researchBudgetYear order by u.branchId,r.researchBudgetYear ASC`,
      { type: QueryTypes.SELECT }
    );
    return response.status(200).json({ data: research });
  } catch (e) {
    console.log(e);
    return response.status(500).json({
      error: "network error!",
    });
  }
});

router.get("/getTypeOfResearch", async (request, response) => {
  try {
    let researchType = await Research.findAll();
  } catch (e) {
    console.log(e);
    return response.status(500).json({
      error: "network error!",
    });
  }
});

module.exports = router;
