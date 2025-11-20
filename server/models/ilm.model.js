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
      enum: ["quran", "hadith", "general"],
      required: true,
    },
    arabic: {
      type: String,

      trim: true,
      required: function () {
        return this.type === "quran" || this.type === "hadith";
      },
    },
    bangla: {
      type: String,
      required: function () {
        return this.type === "quran" || this.type === "hadith";
      },
      trim: true,
    },
    surah: {
      type: String,
      required: function () {
        return this.type === "quran";
      },
    },
    verse: {
      type: Number,
      required: function () {
        return this.lineType === "one" && this.type === "quran";
      },
    },

    startingVerse: {
      type: Number,
      required: function () {
        return this.lineType === "multiple" && this.type === "quran";
      },
    },
    endingVerse: {
      type: Number,
      required: function () {
        return this.lineType === "multiple" && this.type === "quran";
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

    lineType: {
      type: String,
      enum: ["one", "multiple"],
      required: function () {
        return this.type === "quran";
      },
    },
    answer: {
      type: String,
      trim: true,
      required: function () {
        return this.type === "general";
      },
    },
  },
  { timestamps: true }
);

const Ilm = mongoose.model("Ilm", ilmSchema);
module.exports = Ilm;
