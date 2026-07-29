import mongoose, { Schema, model, models } from "mongoose"

const AssetSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true }, // e.g., 'pitch-deck'
        data: { type: String, required: true }, // Base64 data
        contentType: { type: String, required: true }, // e.g., 'application/pdf'
    },
    { timestamps: true }
)

export default models.Asset || model("Asset", AssetSchema)
