import mongoose from "mongoose"

const assetSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true },
    purpose: { type: String, trim: true },
    category: { type: String },
    establishmentDate: { type: Date },
    organization: { type: String, trim: true },
    ownedBy: { type: String, trim: true },
    managedBy: { type: String, trim: true },
    yearofEstablishment: { type: Number },
    assetValue: { type: Number },
    operatingCosts: [
      {
        id: { type: String, trim: true },
        amount: { type: Number },
        year: { type: Number }
      }
    ],
    photos: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        photo: { type: Buffer },
        contentType: { type: String }
      }
    ],
    assetUnitofMeasurement: { type: String, trim: true },
    assetCapacity: { type: String, trim: true },
    assetDailyThroughput: { type: Number },
    assetManning: { type: Number },
    assetStatus: { type: String, trim: true },
    site: { type: String, trim: true },
    location: { type: String, trim: true },
    coordinates: [
      {
        id: { type: String, trim: true },
        latitude: { type: String, trim: true },
        longitude: { type: String, trim: true },
        description: { type: String, trim: true }
      }
    ],
    leaseDescription: { type: String, trim: true },
    leaseCode: { type: String, trim: true },
    leaseType: { type: String, trim: true },
    leaseAct: { type: String, trim: true },
    leaseHolder: { type: String, trim: true },
    leaseLocality: { type: String, trim: true },
    leaseStatus: { type: String, trim: true },
    leaseArea: { type: Number },
    leaseExpiryDate: { type: Date },
    portionNumber: { type: Number },
    portionVolume: { type: Number },
    portfolioNumber: { type: Number },
    compliances: [
      {
        complianceDescription: { type: String, trim: true },
        complianceType: { type: String, trim: true },
        complianceOwner: { type: String, trim: true },
        complianceDate: { type: Date },
        complianceYear: { type: Number }
      }
    ],
    complianceDocuments: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        doc: { type: Buffer },
        contentType: { type: String },
        complienceId: { type: String, trim: true }
      }
    ],
    transitionStartDate: { type: Date },
    transitionEndDate: { type: Date },
    transitionEvents: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        date: { type: Date },
        eventDescription: { type: String, trim: true },
        potentialThirdPartyName: { type: String, trim: true },
        potentialThirdPartyAddress: { type: String, trim: true },
        potentialThirdPartyPhoneNumber: { type: String, trim: true },
        potentialThirdPartyDescription: { type: String, trim: true },
        potentialThirdPartyEmail: { type: String, trim: true }
      }
    ],
    transitionEventDocuments: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        doc: { type: Buffer },
        contentType: { type: String },
        transitionEventId: { type: String, trim: true }
      }
    ],
    closureEvents: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        date: { type: Date },
        closureOption: { type: String, trim: true },
        alternateClosureOption: { type: String, trim: true },
        description: { type: String, trim: true }
      }
    ],
    closureEventDocuments: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        doc: { type: Buffer },
        contentType: { type: String },
        closureEventId: { type: String, trim: true }
      }
    ],
    postClosureGovernanceStartDate: { type: Date },
    postClosureGovernanceEndDate: { type: Date },
    postClosureGovernances: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        date: { type: Date }
      }
    ],
    postClosureGovernanceDocuments: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        doc: { type: Buffer },
        contentType: { type: String },
        postClosureGovernanceId: { type: String, trim: true }
      }
    ],
    assetViabilities: [
      {
        id: { type: String, trim: true },
        name: { type: String, trim: true },
        organization: { type: String, trim: true },
        address: { type: String, trim: true },
        phoneNumber: { type: String, trim: true },
        email: { type: String, trim: true },
        assessmentDate: { type: Date },
        nextAssessmentDate: { type: Date },
        assetValuation: { type: Number },
        assetViability: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true }
      }
    ],
    assetViabilityDocuments: [
      {
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        doc: { type: Buffer },
        contentType: { type: String },
        assetViabilityId: { type: String, trim: true }
      }
    ],
    createdBy: { type: String, trim: true },
    updatedBy: { type: String, trim: true }
  },
  { timestamps: true, versionKey: false }
)

const AssetModel = mongoose.model("Asset", assetSchema)

export default AssetModel
