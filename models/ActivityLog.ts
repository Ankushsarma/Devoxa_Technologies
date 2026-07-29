import mongoose, { Schema, model, models } from "mongoose"

const ActivityLogSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        action: { type: String, required: true },
        target: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export default models.ActivityLog || model("ActivityLog", ActivityLogSchema)
