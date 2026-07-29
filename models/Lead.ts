import mongoose, { Schema, model, models } from "mongoose"

const LeadSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String },
        status: { type: String, enum: ["new", "reviewed", "discovery", "contacted", "assigned", "pending", "working", "done", "rejected", "lost", "pending_development"], default: "new" },
        assignedTo: { type: Schema.Types.ObjectId, ref: "User", default: null },
        managerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
        managerChecklist: {
            callScheduled: { type: Date, default: null },
            clientBrief: { type: Boolean, default: false },
            proposalSent: { type: Boolean, default: false }
        },
        dealStatus: { type: String, enum: ["pending", "won", "lost"], default: "pending" },
        dealLostAt: { type: Date, default: null },
        assignedAt: { type: Date, default: null },
        chatId: { type: String, default: null },
        moms: [{
            title: { type: String, required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }]
    },
    { timestamps: true }
)

const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
export default Lead;
