import mongoose, { Schema, model, models } from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        chatId: { type: String, default: null },
        role: { type: String, enum: ["client", "developer", "admin", "manager"], default: "client" },
        resetToken: { type: String, default: null },
        resetTokenExpiry: { type: Date, default: null },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

// Hash password before saving
UserSchema.pre("save", async function () {
    const user = this as any
    if (!user.isModified("password")) return

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

export default models.User || model("User", UserSchema)
