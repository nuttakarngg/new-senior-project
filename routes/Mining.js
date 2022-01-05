const express = require("express");
const Research = require("../database/models/research");
const User = require("../database/models/User");
const { authentication } = require("../middlewares/authentication");
const axios = require("axios");
const ClassifyData = require("../database/models/classify_data");
const table = require("table-scraper");
const router = express.Router();
// router.use(authentication);

router.get("/createData", async function (req, res, next) {
  try {
    let research = await Research.findAll();
    let i = 0;
    function myLoop() {
      //  create a loop function
      setTimeout(async function () {
        //  call a 3s setTimeout when the loop is called
        let item = research[i];
        let text = item.researchNameTH + " " + item.researchScholarName;
        console.log("hello"); //  your code here
        i++; //  increment the counter
        if (i < research.length) {
          //  if the counter < 10, call the loop function
          myLoop();
          let data = await axios.get(`https://api.aiforthai.in.th/lextoplus`, {
            headers: {
              Apikey: "XhLxbnskJM6CUXymkGIUUPJ8pCUB8oEf",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
              text,
            },
          });
          if (data.status === 200) {
            let { types, tokens } = data.data;
            console.log(tokens);
            let narr = [];
            types.forEach((item, index) => {
              if (item === 1 || (item === 2 && !/\d/.test(tokens[index]))) {
                narr.push(tokens[index]);
              }
            });
            await ClassifyData.create({
              tokens: `|${narr.join("|")}|`,
              scholarTypes: item.researchBudgetType,
              label: item.researchType,
            });
          }
        } else if (i === research.length + 1) {
          return res.status(200).json({ status: "successful" });
        }
      }, 2000);
    }
    myLoop();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "network error!", e });
  }
});
router.get("/ranking", async function (req, res, next) {
  try {
    let promises = [];
    let responseResult = [];
    let userId = [];
    let users = await User.findAll({
      // limit: 3,
      include: {
        model: Research,
        association: Research.User_Research,
        where: {
          researchType: req.query.type,
        },
      },
    });
    users.forEach((item) => {
      let user = item.toJSON();
      userId.push(user);
      promises.push(
        table.get("http://localhost:3001/api/mining/getRules/" + user.id)
      );
    });
    Promise.all(promises).then((result) => {
      result.forEach((item, idx) => {
        if(!item[0]) return null;
          let rules = item[0].length;
          let rulesMatch = item[0].filter((fitem) =>
            fitem["2"]
              .replace(" ", "")
              .split(",")
              .some((item) => item === req.query.type)
          ).length;
          delete userId[idx].research;
          responseResult.push({
            user: userId[idx],
            rules,
            rulesMatch,
            percent: parseFloat(((rulesMatch / rules) * 100).toFixed(2)),
          });
      });
      return res.json(responseResult.sort((a, b) => b.percent - a.percent).splice(0,10));
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "network error!", e });
  }
});
router.get("/getRules/:id", async function (req, res, next) {
  try {
    axios
      .get(
        "http://desktop-qvfspo5:8080/api/rest/process/fp-growth?userId=" +
          req.params.id,
        {
          headers: {
            Authorization: "Basic YWRtaW46Y2hhbmdlaXQ=",
          },
        }
      )
      .then((result) => {
        return res.send(result.data);
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "network error!", e });
  }
});
module.exports = router;
