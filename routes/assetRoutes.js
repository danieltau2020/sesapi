import express from "express"
import {
  findAllAsset,
  findSingleAsset,
  createAsset,
  updateAsset,
  removeAsset,
  removeInactiveAsset,
  uploadAssetPhoto,
  updateAssetPhoto,
  removeAssetPhoto
} from "../controllers/assetControllers/assetController.js"

const router = express.Router()

router.route("/findAllAsset").get(findAllAsset)
router.route("/findSingleAsset/:id").get(findSingleAsset)
router.route("/createAsset").post(createAsset)
router.route("/updateAsset/:id").patch(updateAsset)
router.route("/removeAsset/:id").delete(removeAsset)
router.route("/removeInactiveAsset").delete(removeInactiveAsset)
router.route("/uploadAssetPhoto").post(uploadAssetPhoto)
router.route("/updateAssetPhoto/:id").patch(updateAssetPhoto)
router.route("/removeAssetPhoto/:id").patch(removeAssetPhoto)

export default router
