import mongoose, { Schema, model, models } from "mongoose"

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        visitUrl: { type: String, default: null },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
)

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
