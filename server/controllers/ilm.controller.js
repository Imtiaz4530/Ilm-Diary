const Ilm = require("../models/ilm.model");
const User = require("../models/user.model");
const { surahNames } = require("./surah");

const createIlmRecord = async (req, res) => {
  const {
    title,
    type,
    bangla,
    arabic,
    surah,
    verse,
    book,
    hadithNo,
    startingVerse,
    endingVerse,
    lineType,
    answer,
  } = req.body;

  const { id } = req.user;

  try {
    if (!type || !title) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (type === "quran") {
      if (lineType === "one" && (!surah || !verse || !bangla || !arabic)) {
        return res
          .status(400)
          .json({ message: "Surah and Verse are required for Quran verse." });
      } else if (
        lineType === "multiple" &&
        (!surah || !startingVerse || !endingVerse || !bangla || !arabic)
      ) {
        return res.status(400).json({
          message:
            "Surah, Starting Verse and Ending Verse are required for Quran multiple verses.",
        });
      }
    }

    if (lineType === "multiple") {
      if (startingVerse >= endingVerse) {
        res.status(400).json({
          message: "Ending Verse must be greater than Starting Verse",
        });
      }
    }

    if (type === "hadith" && (!book || !hadithNo || !bangla || !arabic)) {
      return res
        .status(400)
        .json({ message: "Book and Hadith No are required for Hadith type" });
    }

    if (type === "general" && !answer) {
      return res
        .status(400)
        .json({ message: "Answer is required for General type" });
    }

    const creator = await User.findById(id).then((user) => user.username);
    const surahName = surahNames[Number(surah) - 1];

    const newIlmRecord = new Ilm({
      creator,
      title,
      type,
      bangla,
      arabic,
      surah: type === "quran" ? surahName : undefined,
      verse: type === "quran" ? verse : undefined,
      book: type === "hadith" ? book : undefined,
      hadithNo: type === "hadith" ? hadithNo : undefined,
      startingVerse: type === "quran" ? startingVerse : undefined,
      endingVerse: type === "quran" ? endingVerse : undefined,
      lineType: type === "quran" ? lineType : undefined,
      answer: type === "general" ? answer : undefined,
    });

    await newIlmRecord.save();
    res
      .status(201)
      .json({ newIlmRecord, message: "ILM record created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from createIlmRecord" });
  }
};

const editIlmRecord = async (req, res) => {
  const {
    title,
    type,
    bangla,
    arabic,
    surah,
    verse,
    book,
    hadithNo,
    startingVerse,
    endingVerse,
    lineType,
    answer,
  } = req.body;

  try {
    if (!title || !type) {
      return res
        .status(400)
        .json({ message: "Title or Type fields are missing" });
    }

    if (type === "quran") {
      if (lineType === "one" && (!surah || !verse || !bangla || !arabic)) {
        return res
          .status(400)
          .json({ message: "Surah and Verse are required for Quran verse." });
      } else if (
        lineType === "multiple" &&
        (!surah || !startingVerse || !endingVerse || !bangla || !arabic)
      ) {
        return res.status(400).json({
          message:
            "Surah, Starting Verse and Ending Verse are required for Quran multiple verses.",
        });
      }
    }

    if (lineType === "multiple") {
      if (startingVerse >= endingVerse) {
        res.status(400).json({
          message: "Ending Verse must be greater than Starting Verse",
        });
      }
    }

    if (type === "hadith" && (!book || !hadithNo || !bangla || !arabic)) {
      return res
        .status(400)
        .json({ message: "Book and Hadith No are required for Hadith type" });
    }

    if (type === "general" && !answer) {
      return res
        .status(400)
        .json({ message: "Answer is required for General type" });
    }

    const ilmId = req.params.id;

    const findIlmRecord = await Ilm.findById(ilmId);
    if (!findIlmRecord) {
      return res.status(404).json({ message: "ILM record not found" });
    }

    const updatedIlmRecord = await Ilm.findByIdAndUpdate(
      ilmId,
      {
        title,
        bangla,
        arabic,
        surah,
        verse,
        book,
        hadithNo,
        startingVerse,
        endingVerse,
        lineType,
        answer,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ updatedIlmRecord, message: "ILM record updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from editIlmRecord" });
  }
};

const getAllIlmRecord = async (req, res) => {
  try {
    const allIlmRecords = await Ilm.find().sort({ createdAt: -1 });

    res.status(200).json(allIlmRecords);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from getAllIlmRecord" });
  }
};

const getSingleIlmRecord = async (req, res) => {
  const ilmId = req.params.id;

  try {
    const findIlmRecord = await Ilm.findById(ilmId);
    if (!findIlmRecord) {
      return res.status(404).json({ message: "ILM record not found" });
    }

    res.status(200).json(findIlmRecord);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from getSingleIlmRecord" });
  }
};

const deleteIlmRecord = async (req, res) => {
  const ilmId = req.params.id;

  try {
    const findIlmRecord = await Ilm.findById(ilmId);
    if (!findIlmRecord) {
      return res.status(404).json({ message: "ILM record not found" });
    }

    await Ilm.findByIdAndDelete(ilmId);
    res.status(200).json({ message: "ILM record deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from deleteIlmRecord" });
  }
};

const addBookmarkIlmRecord = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ilmRecord = await Ilm.findById(id);
    if (!ilmRecord) {
      return res.status(404).json({ message: "ILM record not found" });
    }

    if (user.bookmarks.includes(id)) {
      user.bookmarks = user.bookmarks.filter(
        (bookmarkId) => bookmarkId.toString() !== id
      );
      await user.save();
      return res.status(200).json({
        bookmarked: false,
        user,
        message: "Bookmark removed successfully",
      });
    }

    user.bookmarks.push(id);
    await user.save();
    res
      .status(200)
      .json({ bookmarked: true, user, message: "Bookmark added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from addBookmarkIlmRecord" });
  }
};

module.exports = {
  createIlmRecord,
  editIlmRecord,
  getAllIlmRecord,
  deleteIlmRecord,
  addBookmarkIlmRecord,
  getSingleIlmRecord,
};
