// import { createContext, useState } from "react";
// import { analyzeSentiment } from "../utils/sentimentAnalysis";

// export const JournalContext = createContext();

// export const JournalProvider = ({ children }) => {
//   const [journals, setJournals] = useState([]);

//   const addJournal = (text) => {
//     const sentiment = analyzeSentiment(text);
//     const mood =
//       sentiment === "Positive"
//         ? "😊"
//         : sentiment === "Negative"
//         ? "😞"
//         : "😐";

//     setJournals([{ text, sentiment, mood, date: new Date() }, ...journals]);
//   };

//   return (
//     <JournalContext.Provider value={{ journals, addJournal }}>
//       {chsildren}
//     </JournalContext.Provider>
//   );
// };
// import { createContext, useState } from "react";
// import { analyzeSentiment } from "../utils/sentimentAnalysis";

// export const JournalContext = createContext();

// export const JournalProvider = ({ children }) => {
//   const [journals, setJournals] = useState([]);

//   const addJournal = (text) => {
//     const sentiment = analyzeSentiment(text);
//     const mood =
//       sentiment === "Positive" ? "😊" : sentiment === "Negative" ? "😞" : "😐";

//     setJournals([{ text, sentiment, mood, date: new Date() }, ...journals]);
//   };

//   const deleteJournal = (index) => {
//     setJournals(journals.filter((_, i) => i !== index));
//   };

//   return (
//     <JournalContext.Provider value={{ journals, addJournal, deleteJournal }}>
//       {children}
//     </JournalContext.Provider>
//   );
// };
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main"; // backend base URL
import toast from "react-hot-toast";

export const JournalContext = createContext(); // ✅ export context

export const JournalProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all journals
  const fetchJournals = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/journals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJournals(data);
    } catch (error) {
      console.error("Error fetching journals:", error);
      toast.error("Failed to fetch journals");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add a journal
  const addJournal = async (text, sentiment) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Determine mood from sentiment
    const mood = sentiment.includes("Positive")
      ? "😊"
      : sentiment.includes("Negative")
      ? "😞"
      : "😐";

    try {
      const { data } = await axios.post(
        `${server}/api/journals`,
        { text, sentiment, mood },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJournals((prev) => [data, ...prev]);
      toast.success("Journal saved!");
    } catch (error) {
      console.error("Error adding journal:", error);
      toast.error("Failed to save journal");
    }
  };

  // ✅ Update existing journal
  const updateJournal = async (id, newText, newSentiment) => {
    try {
      const mood = newSentiment.includes("Positive")
        ? "😊"
        : newSentiment.includes("Negative")
        ? "😞"
        : "😐";

      const { data } = await axios.put(
        `${server}/api/journal/${id}`,
        { text: newText, sentiment: newSentiment, mood },
        { withCredentials: true }
      );

      setJournals(journals.map((j) => (j._id === id ? data : j)));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete a journal
  const deleteJournal = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await axios.delete(`${server}/api/journals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);
      setJournals((prev) => prev.filter((j) => j._id !== id));
    } catch (error) {
      console.error("Error deleting journal:", error);
      toast.error("Failed to delete journal");
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <JournalContext.Provider
      value={{
        journals,
        entry,
        setEntry,
        loading,
        fetchJournals,
        addJournal,
        updateJournal,
        deleteJournal,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const JournalData = () => useContext(JournalContext);
