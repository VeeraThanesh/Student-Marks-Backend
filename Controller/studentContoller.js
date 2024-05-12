import { studentModel } from "../Model/student.js";
import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  secure: true,
  host: "smtp.forwardemail.net",
  port: 465,
  auth: {
    user: "eventmanagement098@gmail.com",
    pass: "oekl mlya smnw wmgk",
  },
});

const createStudentController = async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      email,
      dob,
      rollNo,
      result,
      english,
      tamil,
      mathematics,
      biology,
      physics,
      chemistry,
    } = req.body;

    const cutOff =
      parseInt(mathematics) + parseInt(physics) + parseInt(chemistry);

    const totalMark =
      parseInt(tamil) +
      parseInt(english) +
      parseInt(biology) +
      parseInt(mathematics) +
      parseInt(physics) +
      parseInt(chemistry);

    const totalCutOff = cutOff / 2;

    if (
      !studentName ||
      !fatherName ||
      !email ||
      !dob ||
      !rollNo ||
      !result ||
      !english ||
      !tamil ||
      !mathematics ||
      !biology ||
      !physics ||
      !chemistry
    ) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Please provide all the required fields",
      });
    }
    const student = await studentModel.create({
      studentName,
      fatherName,
      email,
      dob,
      rollNo,
      result,
      english,
      tamil,
      mathematics,
      biology,
      physics,
      chemistry,
      totalMark,
      totalCutOff,
    });

    let mailOptions = {
      from: "eventmanagement098@gmail.com",
      to: `${email}`,
      subject: "Student Mark List",
      html: `<div>
      <h1 style="color: red;"> Hi ${studentName} , </h1>
      <h1> You  ${result} the Exam <h1/>
      <table border="1" style="border: aqua;text-align: center; display: flex;justify-content: center; align-items: center;">
      <tr>
          <th>Tamil</th>
          <th>English</th>
          <th>Mathematics</th>
          <th>Biology</th>
          <th>Physics</th>
          <th>Chemistry</th>
      </tr>
      <tr>
          <td>${tamil}</td>
          <td>${english}</td>
          <td>${mathematics}</td>
          <td>${biology}</td>
          <td>${physics}</td>
          <td>${chemistry}</td>
      </tr>
  </table>
      <h5> Total Mark <h1> ${totalMark} <h1/> <h5/>
      <h4> Your Cut-Off Mark is <h2> ${totalCutOff} <h2/> </h4>
      
      <h5 style="text-align: center;">All The Best!</h5>
    </div>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info, "info");
      }
    });
    res.status(200).send({
      status: true,
      statusCode: 200,
      data: student,
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

// GET ALL STUDENTS

const getAllStudentsController = async (req, res) => {
  try {
    const student = await studentModel.find({});

    if (student) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        data: student,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

//GET SINGLE STUDENT

const getStudentByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findById(id);

    if (student) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        data: student,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

//UPDATE STUDENT

const updateStudentByIdController = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      studentName,
      fatherName,
      email,
      dob,
      rollNo,
      result,
      english,
      tamil,
      mathematics,
      biology,
      physics,
      chemistry,
      totalMark,
      totalCutOff,
    } = req.body;

    const student = await studentModel.findByIdAndUpdate(id, {
      studentName,
      fatherName,
      email,
      dob,
      rollNo,
      result,
      english,
      tamil,
      mathematics,
      biology,
      physics,
      chemistry,
      totalMark,
      totalCutOff,
    });

    if (student) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Student Update Successfully",
        data: student,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

//DELETE STUDENT

const deleteStudentByIdContoller = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await studentModel.findByIdAndDelete(id);

    if (student) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Student Deleted Successfully",
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentByIdController,
  deleteStudentByIdContoller,
};
