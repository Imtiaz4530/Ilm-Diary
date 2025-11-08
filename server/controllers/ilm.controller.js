const Ilm = require("../models/ilm.model");
const User = require("../models/user.model");

const createIlmRecord = async (req, res) => {
  const { title, type, bangla, arabic, surah, verse, book, hadithNo } =
    req.body;

  const { id } = req.user;

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

    const creator = await User.findById(id).then((user) => user.username);

    const newIlmRecord = new Ilm({
      creator,
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

const editIlmRecord = async (req, res) => {
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

    const ilmId = req.params.id;

    const findIlmRecord = await Ilm.findById(ilmId);
    if (!findIlmRecord) {
      return res.status(404).json({ message: "ILM record not found" });
    }

    const updatedIlmRecord = await Ilm.findByIdAndUpdate(
      ilmId,
      { title, bangla, arabic, surah, verse, book, hadithNo },
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

module.exports = {
  createIlmRecord,
  editIlmRecord,
  getAllIlmRecord,
  deleteIlmRecord,
};
