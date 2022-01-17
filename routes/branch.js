const express = require("express");
const Branch = require("../database/models/branch");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
// router.use(authentication);
router.get("/", async (request, response) => {
  try{
    const branch = await Branch.findAll();
    return response.json({ status: 200, data: branch });
  }catch(e){
    return response.json({ status: 500, error: "network error." }); 
  }
});

router.post("/", async (request, response) => {
  try {
    const newBranch = await Branch.create(request.body);
    return response.json({ status: 200, data: newBranch });
  } catch (e) {
    console.log(e);
    return response.json({ status: 500, error: "network error." });
  }
});
module.exports = router;
