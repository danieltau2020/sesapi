import mongoose from "mongoose"

const stakeholderSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    sex: { type: String },
    organization: { type: String, trim: true },
    position: { type: String, trim: true },
    category: { type: String },
    analysisGroup: { type: String },
    address: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    email: { type: String, trim: true }
  },
  { timestamps: true, versionKey: false }
)

const StakeholderModel = mongoose.model("Stakeholder", stakeholderSchema)

export default StakeholderModel
