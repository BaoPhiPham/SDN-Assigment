import mongoose, { Schema } from 'mongoose'

const perfumeSchema = new Schema(
  {
    perfumeName: { type: String, required: true },
    uri: { type: String, required: true },
    price: { type: Number, required: true },
    concentration: { type: String, required: true }, // nồng độ của nước hoa: Extrait, EDP, EDT,…
    description: { type: String, required: true },

    ingredients: { type: String, required: true },
    volume: { type: Number, required: true },
    targetAudience: { type: String, required: true }, // male, femail, unisex
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ], //dùng schema
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }
  },
  { timestamps: true }
)

export default perfumeSchema
