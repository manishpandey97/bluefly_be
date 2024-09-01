const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
const tokenModel = require('../model/token.model');

const authUserTask = (req, res, next) => {
  const accesstoken = req.headers.authorization?.split(" ")[1];
  try {
    if (!accesstoken) {
      console.log(`access token not found!`)
      return res.status(400).send(`access token not found!`)
    }
    console.log(process.env.secret_Key1)
    jwt.verify(accesstoken, process.env.secret_Key1, async (err, decoded) => {
      if (err) {
        console.log(`error during access token verifying:${err}`)
        return res.status(400).send(`error during access token verifying:${err}`)
      }
      if (decoded) {
        const userid = decoded.userId;
        const user = await userModel.findById({ _id: userid });
        if (!user) {
          console.log(`error during access token user not found!`)
          return res.status(400).send(`error during access token user not found!`)
        }

        const blockTokenObj = await tokenModel.findOne({ userId: userid })

        if (blockTokenObj && blockTokenObj.blockToken.toString() == accesstoken.toString()) {
          console.log(`your token is blocked you have to login again!`)
          return res.status(400).send(`your token is blocked you have to login again!`)
        }
        req.user = user;
        next()
      }

    });

  } catch (error) {
    console.log(`error during auth of user:${error}`)
    return res.status(500).send(`error during auth of user:${error}`)
  }
}

module.exports = authUserTask;