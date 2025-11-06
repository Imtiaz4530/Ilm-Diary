const Ilm = require("../models/ilm.model");

const createIlmRecord = async (req, res) => {
  const { title, type, bangla, arabic, surah, verse, book, hadithNo } =
    req.body;

  try {
    if ((!title, !type, !bangla, !arabic)) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (type === "quran" && (!surah || !verse)) {
      return res
        .status(400)
        .json({ message: "Surah and Verse are required for Quran type" });
    }

    if (type === "hadith" && (!book || !hadithNo)) {
      return res
        .status(400)
        .json({ message: "Book and Hadith No are required for Hadith type" });
    }

    const newIlmRecord = new Ilm({
      title,
      type,
      bangla,
      arabic,
      surah: type === "quran" ? surah : undefined,
      verse: type === "quran" ? verse : undefined,
      book: type === "hadith" ? book : undefined,
      hadithNo: type === "hadith" ? hadithNo : undefined,
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

const editIlmRecord = async (req, res) => {};

const getAllIlmRecord = async (req, res) => {
  try {
    const allIlmRecords = await Ilm.find().sort({ createdAt: -1 });

    res.status(200).json(allIlmRecords);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from getAllIlmRecord" });
  }
};

module.exports = {
  createIlmRecord,
  editIlmRecord,
  getAllIlmRecord,
};
