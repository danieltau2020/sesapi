import mongoose from "mongoose"
import AssetModel from "../../models/assetModels/AssetModel.js"

const verifyObjectId = (id) => {
  const ObjectId = mongoose.Types.ObjectId

  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true
    }
    return false
  }
  return false
}

export const findAllAsset = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page) + 1

    const ObjectId = mongoose.Types.ObjectId

    let searchQuery = {
      assetId: verifyObjectId(req.query.assetId) ? req.query.assetId : "",
      description: req.query.description,
      site: req.query.site
    }

    for (let [key, value] of Object.entries(searchQuery)) {
      if (!value) {
        delete searchQuery[key]
        continue
      }

      searchQuery[key] = { $regex: value, $options: "i" }
    }

    const temp = await AssetModel.aggregate([
      {
        $facet: {
          assets: [
            {
              $match: {
                ...(searchQuery.assetId
                  ? {
                      _id: new ObjectId(req.query.assetId)
                    }
                  : {}),
                ...(searchQuery.description
                  ? { description: searchQuery.description }
                  : {}),
                ...(searchQuery.site ? { site: searchQuery.site } : {})
              }
            },
            {
              $project: {
                _id: 1,
                description: 1,
                assetStatus: 1,
                site: 1,
                createdBy: 1,
                createdAt: 1
              }
            },
            { $skip: (page - 1) * limit },
            { $limit: limit }
          ],
          totalCount: [
            {
              $match: {
                ...(searchQuery.assetId
                  ? {
                      _id: new ObjectId(req.query.assetId)
                    }
                  : {}),
                ...(searchQuery.description
                  ? { description: searchQuery.description }
                  : {}),
                ...(searchQuery.site ? { site: searchQuery.site } : {})
              }
            },
            { $count: "total" }
          ]
        }
      },
      { $unwind: "$totalCount" },
      {
        $project: { totalCount: "$totalCount.total", assets: "$assets" }
      }
    ])

    res.status(200).json({
      assets: temp.length > 0 ? temp[0].assets : [],
      totalCount: temp.length > 0 ? temp[0].totalCount : 0
    })
  } catch (error) {
    let err = new Error("Unable to get assets")
    err.status = 500
    err.errorType = "Find assets"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const findSingleAsset = async (req, res, next) => {
  try {
    const asset = await AssetModel.findById(req.params.id).lean()

    if (!asset) {
      let err = new Error("Asset doesn't exist.")
      err.status = 400
      err.errorType = "Get asset"
      throw err
    }

    let images = []

    for (let item of asset.photos) {
      const obj = {
        id: item._id,
        title: item.title,
        description: item.description,
        contentType: item.contentType,
        photo: item.photo.toString("base64")
      }
      images.push(obj)
    }

    res.status(200).json({ asset: { ...asset, photos: images } })
  } catch (error) {
    let err = new Error("Unable to get asset")
    err.status = 500
    err.errorType = "Get asset"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const createAsset = async (req, res, next) => {
  try {
    const newAsset = new AssetModel(req.body)
    await newAsset.save()

    res.status(200).json({ assetId: newAsset._id })
  } catch (error) {
    let err = new Error("Unable to create asset")
    err.status = 500
    err.errorType = "Create asset"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const updateAsset = async (req, res, next) => {
  try {
    const updatedValues = {
      description: req.body.description,
      category: req.body.category,
      assetStatus: req.body.assetStatus,
      site: req.body.site,
      createdBy: req.body.createdBy,
      active: true
    }

    const asset = await AssetModel.findById(req.params.id).lean()

    if (!asset) {
      let err = new Error("Asset doesn't exist.")
      err.status = 400
      err.errorType = "Update asset"
      throw err
    }

    const updatedAsset = await AssetModel.findByIdAndUpdate(req.params.id, {
      $set: updatedValues
    })

    res
      .status(200)
      .json({ asset: updatedAsset, message: "Asset is updated successfully" })
  } catch (error) {
    let err = new Error("Unable to update asset")
    err.status = 500
    err.errorType = "Update asset"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const removeAsset = async (req, res, next) => {
  try {
    await AssetModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "Asset removed successfully" })
  } catch (error) {
    let err = new Error("Unable to remove asset")
    err.status = 500
    err.errorType = "Remove asset"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const removeInactiveAsset = async (req, res, next) => {
  try {
    await AssetModel.deleteMany({ active: false })

    res.status(200).json({ message: "Inactive assets removed" })
  } catch (error) {
    let err = new Error("Unable to remove assets")
    err.status = 500
    err.errorType = "Remove inactive asset"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const uploadAssetPhoto = async (req, res, next) => {
  try {
    if (req.files) {
      const photo = {
        title: req.body.title,
        description: req.body.description,
        photo: req.files.photo.data,
        contentType: req.files.photo.mimetype
      }

      await AssetModel.findByIdAndUpdate(req.body.assetId, {
        $push: { photos: photo }
      })

      const asset = await AssetModel.findById(req.body.assetId).lean()

      let images = []

      for (let item of asset.photos) {
        const obj = {
          id: item._id,
          title: item.title,
          description: item.description,
          contentType: item.contentType,
          photo: item.photo.toString("base64")
        }
        images.push(obj)
      }

      res.status(200).json({ photos: images })
    }
  } catch (error) {
    let err = new Error("Unable to upload asset photo")
    err.status = 500
    err.errorType = "Upload asset photo"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const updateAssetPhoto = async (req, res, next) => {
  try {
    if (req.files) {
      await AssetModel.findOneAndUpdate(
        { "photos._id": req.body.photoId },
        {
          $set: {
            "photos.$.title": req.body.title,
            "photos.$.description": req.body.description,
            "photos.$.photo": req.files.photo.data,
            "photos.$.contentType": req.files.photo.mimetype
          }
        }
      )
      const asset = await AssetModel.findById(req.params.id).lean()

      let images = []

      for (let item of asset.photos) {
        const obj = {
          id: item._id,
          title: item.title,
          description: item.description,
          contentType: item.contentType,
          photo: item.photo.toString("base64")
        }
        images.push(obj)
      }

      return res.status(200).json({ photos: images })
    }

    await AssetModel.findOneAndUpdate(
      { "photos._id": req.body.photoId },
      {
        $set: {
          "photos.$.title": req.body.title,
          "photos.$.description": req.body.description
        }
      }
    )

    const asset = await AssetModel.findById(req.params.id).lean()

    let images = []

    for (let item of asset.photos) {
      const obj = {
        id: item._id,
        title: item.title,
        description: item.description,
        contentType: item.contentType,
        photo: item.photo.toString("base64")
      }
      images.push(obj)
    }

    res.status(200).json({ photos: images })
  } catch (error) {
    let err = new Error("Unable to upload asset photo")
    err.status = 500
    err.errorType = "Upload asset photo"
    error.message?.length > 0 ? next(error) : next(err)
  }
}

export const removeAssetPhoto = async (req, res, next) => {
  try {
    await AssetModel.findByIdAndUpdate(req.params.id, {
      $pull: { photos: { _id: req.body.photoId } }
    })

    res.status(200).json({ message: "Asset photo removed successfully" })
  } catch (error) {
    let err = new Error("Unable to remove asset photo")
    err.status = 500
    err.errorType = "Remove asset photo"
    error.message?.length > 0 ? next(error) : next(err)
  }
}
