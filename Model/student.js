import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  rollNo: { type: Number, required: true },
  result: { type: String, required: true },
  english: { type: String, required: true },
  tamil: { type: String, required: true },
  mathematics: { type: String, required: true },
  biology: { type: String, required: true },
  physics: { type: String, required: true },
  chemistry: { type: String, required: true },
  totalMark: { type: String, required: true },
  totalCutOff: { type: Number, required: true },
});

export const studentModel = mongoose.model("Students", studentSchema);
