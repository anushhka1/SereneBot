import React, { useEffect, useRef, useState, useContext } from "react";
import { JournalContext } from "../context/journalContext";
import "./Journal.css";
import MoodGraph from "./MoodGraph";

// // Sentiment Analysis
// const analyzeSentiment = (text) => {
//   const positiveWords = [
//     "happy",
//     "great",
//     "good",
//     "love",
//     "awesome",
//     "excited",
//     "joy",
//     "fantastic",
//     "relaxed",
//     "calm",
//   ];
//   const negativeWords = [
//     "sad",
//     "bad",
//     "angry",
//     "depressed",
//     "tired",
//     "stressed",
//     "worried",
//     "anxious",
//     "frustrated",
//     "lonely",
//   ];

//   let score = 0;
//   const words = text.toLowerCase().match(/\b\w+\b/g) || [];
//   words.forEach((w) => {
//     if (positiveWords.includes(w)) score += 2;
//     if (negativeWords.includes(w)) score -= 2;
//   });

//   if (score >= 4) return "Very Positive 😄";
//   if (score > 0) return "Positive 🙂";
//   if (score <= -4) return "Very Negative 😢";
//   if (score < 0) return "Negative 😞";
//   return "Neutral 🙂";
// };

const prompts = [
  "What brought a spark of joy today?",
  "Which moment made you pause and reflect?",
  "A challenge you faced today and how you felt about it.",
  "Something new you discovered about yourself.",
  "What’s weighing on your mind right now?",
  "A small victory that made you proud.",
  "How are your emotions shifting today?",
  "What moment today made you feel grateful?",
  "What drained your energy and how can you recover?",
  "If you could let go of one worry, what would it be?",
];

export function analyzeSentiment(text) {
  const positiveWords = [
    "happy",
    "great",
    "good",
    "love",
    "awesome",
    "excited",
    "joy",
    "fantastic",
    "relaxed",
    "calm",
    "sparkling",
    "blissful",
    "radiant",
    "serene",
    "adventurous",
    "charming",
    "hopeful",
    "vibrant",
    "thriving",
    "courageous",
    "playful",
    "affectionate",
    "spirited",
    "luminous",
    "blessed",
    "harmonious",
    "sparkling",
    "mindful",
    "elated",
    "triumphant",
  ];
  const negativeWords = [
    "sad",
    "bad",
    "angry",
    "depressed",
    "tired",
    "stressed",
    "worried",
    "anxious",
    "frustrated",
    "lonely",
    "bleak",
    "gloomy",
    "restless",
    "irritated",
    "haunted",
    "anxious",
    "uneasy",
    "drained",
    "regretful",
    "doubtful",
    "mournful",
    "rejected",
    "hopeless",
    "pessimistic",
    "strained",
    "uncomfortable",
    "fragile",
    "melancholic",
    "distressed",
    "overwhelmed",
  ];
  const negationWords = [
    "not",
    "never",
    "no",
    "none",
    "can't",
    "won't",
    "didn't",
    "doesn't",
    "isn't",
    "aren't",
    "wasn't",
    "weren't",
    "shouldn't",
    "wouldn't",
    "couldn't",
    "cannot",
    "hardly",
    "barely",
    "neither",
    "nor",
  ];

  let score = 0;
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  let negate = false;

  words.forEach((w) => {
    if (negationWords.includes(w)) {
      negate = true;
      return;
    }

    if (positiveWords.includes(w)) {
      score += negate ? -2 : 2;
    }
    if (negativeWords.includes(w)) {
      score += negate ? 2 : -2;
    }

    // Reset negation after affecting the next word
    if (negate) negate = false;
  });

  if (score >= 4) return "Very Positive 😄";
  if (score > 0) return "Positive 🙂";
  if (score <= -4) return "Very Negative 😢";
  if (score < 0) return "Negative 😞";
  return "Neutral 🙂";
}

const Journal = () => {
  const { journals, addJournal, deleteJournal, fetchJournals, loading } =
    useContext(JournalContext);
  const [entry, setEntry] = useState("");
  const containerRef = useRef();

  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(random);
  }, []);
  useEffect(() => {
    fetchJournals();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [journals]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    const sentiment = analyzeSentiment(entry);
    addJournal(entry, sentiment);
    setEntry("");
  };

  const getBgClass = (sentiment) => {
    if (sentiment.includes("Positive")) return "positive";
    if (sentiment.includes("Negative")) return "negative";
    return "neutral";
  };

  return (
    <div className="journal-container">
      <h1 className="journal-title">
        🌻 Reflect. Write. Feel. — My Journal ✍️
      </h1>

      <form onSubmit={handleSubmit} className="journal-form">
        <p className="journal-prompt">
          <strong>💡</strong> {prompt}
        </p>
        <textarea
          className="form-control shadow-sm notebook-editor"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows="5"
          placeholder="Write your thoughts here..."
        ></textarea>
        <div className="text-end mt-3">
          <button type="submit" className="btn custom-btn">
            Save Entry
          </button>
        </div>
      </form>

      <h2 className="section-title">Previous Entries</h2>
      {loading ? (
        <p className="text-center">Loading journals...</p>
      ) : journals.length === 0 ? (
        <p className="text-center text-muted">
          No entries yet. Start journaling 🌱
        </p>
      ) : (
        <div className="row g-4 overflow-auto" ref={containerRef}>
          {journals.map((j) => (
            <div key={j._id} className="col-md-6 journal-card-wrapper">
              <div className={`journal-card ${getBgClass(j.sentiment)}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <p className="card-text mb-0">{j.text}</p>
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteJournal(j._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between small">
                    <span>
                      Sentiment: <strong>{j.sentiment}</strong>
                    </span>
                    {/* <span>
                      Mood: <strong>{j.mood}</strong>
                    </span> */}
                    <span>{new Date(j.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title mt-4">Mood Analytics</h2>
      <MoodGraph journals={journals} />
    </div>
  );
};

export default Journal;
