import mongoose, { Schema, model, models } from "mongoose"

const TaskSchema = new Schema(
    {
        leadId: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["todo", "in-progress", "review", "done"], default: "todo" },
    },
    { timestamps: true }
)

export default models.Task || model("Task", TaskSchema)
