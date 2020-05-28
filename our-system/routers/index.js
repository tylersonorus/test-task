const router = require("express").Router();
const entityApi = require("./entity");

router.use("/api",entityApi);

router.get("/",(req,res)=>{
    res.render("entities-list/entities-list")
})

module.exports = router;