const mongoose = require("mongoose");

const ilmSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["quran", "hadith"],
      required: true,
    },
    arabic: {
      type: String,
      required: true,
      trim: true,
    },
    bangla: {
      type: String,
      required: true,
      trim: true,
    },
    surah: {
      type: Number,
      required: function () {
        return this.type === "quran";
      },
    },
    verse: {
      type: Number,
      required: function () {
        return this.type === "quran";
      },
    },
    book: {
      type: String,
      required: function () {
        return this.type === "hadith";
      },
    },
    hadithNo: {
      type: Number,
      required: function () {
        return this.type === "hadith";
      },
    },
  },
  { timestamps: true }
);

const Ilm = mongoose.model("Ilm", ilmSchema);
module.exports = Ilm;
