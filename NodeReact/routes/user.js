// const express = require("express");
// const UserService = require("../services/UserService");
// const router = express.Router();

// router.get("/",async (req,res)=>{
//     const userService = new UserService();
//     const result = await userService.getUser();
//     res.send(result);
// })

// router.post("/",async (req,res)=>{
//     const userService = new UserService();
//     const result = await userService.setUser(req.body);
//     res.send("User created");
// })

// router.delete("/:id",(req,res)=>{
//     res.send("deleted");
// })

// module.exports = router;





const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const auth = require("./auth");

 

// router.get("/", auth.required, async (req,res)=>{
//     const userService = new UserService();
//     const result = await userService.getUser();
//     res.send(result);
// })
router.get("/", async (req,res)=>{
    const userService = new UserService();
    const result = await userService.getUser();
    res.send(result);
})

router.post("/", auth.required, async (req,res)=>{
    const userService = new UserService();
    const result = await userService.setUser(req.body);
    res.send(result)
})
// router.post("/",  async (req,res)=>{
//     const userService = new UserService();
//     const result = await userService.setUser(req.body);
//     res.send(result)
// })


router.post("/login", async (req,res)=>{
    const userService = new UserService();
    const result = await userService.loginUser(req.body.email, req.body.password);
    res.send(result)
})


// router.delete("/:id",auth.required, async (req,res)=>{
//     const userService = new UserService();
//     const result = await userService.removeUser(req.params.id);
//     res.send(result)
// })
router.delete("/:id", async (req,res)=>{
    const userService = new UserService();
    const result = await userService.removeUser(req.params.id);
    res.send(result)
})


module.exports = router;