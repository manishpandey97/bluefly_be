const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
const tokenModel = require('../model/token.model');

const authUserTask = (req, res, next) => {
  const accesstoken = req.headers.authorization?.split(" ")[1];
  try {
    if (!accesstoken) {
      return res.status(400).send(`access token not found!`)
    }

    jwt.verify(accesstoken, process.env.secret_Key1, async (err, decoded) => {
      if (err) {
        return res.status(400).send(`error during access token verifying:${err}`)
      }
      if (decoded) {
        const userid = decoded.userId;
        const user = await userModel.findById({ _id:userid});
        if (!user) {
          return res.status(400).send(`error during access token user not found!`)
        }

        const blockTokenObj = await tokenModel.findOne({userId:userid})
  
        if (blockTokenObj && blockTokenObj.blockToken.toString() == accesstoken.toString()) {
          return res.status(400).send(`your token is blocked you have to login again!`)
        }
        req.user = user;
        next()
      }

    });

  } catch (error) {
    return res.status(500).send(`error during auth of user:${error}`)
  }
}

module.exports = authUserTask;