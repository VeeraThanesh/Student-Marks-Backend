import { userModel } from "../Model/user.js";

const createUserController = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const isExist = await userModel.findOne({ userName })

    if(isExist){
      return res.status(400).json({
        success: false,
        message: "User already exist"
      })
    }

    if (!userName || !password) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Please Fill All Fields",
      });
    }

    const user = await userModel.create({ userName, password });

    res.status(200).send({
      status: true,
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userModel.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    if (user.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    res
      .status(200)
      .json({ success: true, message: "Login successfully", data: user });
  } catch (error) {
    console.log(error, "error");
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export { createUserController, loginUser };
