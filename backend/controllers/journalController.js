import Journal from "../models/Journal.js";

// Add journal entry
export const addJournal = async (req, res) => {
  try {
    const { text, sentiment, mood } = req.body;
    const journal = await Journal.create({
      user: req.user._id,
      text,
      sentiment,
      mood,
    });
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all entries for logged-in user
export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete entry
export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: "Entry not found" });
    if (journal.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await journal.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};