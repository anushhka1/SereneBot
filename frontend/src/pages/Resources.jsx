import React, { useState, useEffect } from "react";

const Resources = () => {
  // ------------------ USER HABITS ------------------
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("userHabits");
    return saved
      ? JSON.parse(saved)
      : {
          drinksAlcohol: false,
          sleepsLate: false,
          stressed: false,
          lessWater: false,
          sociallyIsolated: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("userHabits", JSON.stringify(habits));
  }, [habits]);

  const resetHabits = () => {
    const defaultHabits = {
      drinksAlcohol: false,
      sleepsLate: false,
      stressed: false,
      lessWater: false,
      sociallyIsolated: false,
    };
    setHabits(defaultHabits);
    localStorage.setItem("userHabits", JSON.stringify(defaultHabits));
  };

  // ------------------ SEARCH STATE ------------------
  const [searchQuery, setSearchQuery] = useState("");

  // ------------------ CRISIS SECTION DATA ------------------
  const crisisResources = [
    {
      title: "Vandrevala Foundation (India)",
      desc: "24×7 free mental health support & counselling",
      link: "tel:+919999666555",
      btn: "📞 +91‑9999‑666‑555",
      btnClass: "btn-danger",
    },
    {
      title: "iCALL Psychosocial Helpline (TISS, India)",
      desc: "Telephone & email‑based counselling support",
      link: "tel:02225521111",
      btn: "📞 022‑25521111",
      btnClass: "btn-warning",
    },
    {
      title: "TherapyKaro Online Therapy (India)",
      desc: "Online therapy & counselling services",
      link: "https://therapykaro.com",
      btn: "Visit TherapyKaro",
      btnClass: "btn-primary",
    },
  ];

  // ------------------ ARTICLES DATA ------------------
  const articles = [
    [
      "Free Online Therapy in India – How to Access",
      "Guide to free/low‑cost therapy in India.",
      "Article",
      "https://www.amahahealth.com/",
    ],
    [
      "Stress Management Tips",
      "Practical methods to reduce daily stress.",
      "Article",
      "https://www.helpguide.org/articles/stress/stress-management.htm",
    ],
    [
      "Mental Health & Sleep",
      "Understand how sleep affects emotional wellbeing.",
      "Article",
      "https://www.sleepfoundation.org/mental-health",
    ],
    [
      "Understanding Depression — Digital Discourse",
      "In-depth article on depression and managing it.",
      "Article",
      "https://www.digitaldiscourse.org.in/soulful/mental-health-depression",
    ],
    [
      "Mindfulness Exercises for Beginners",
      "Step-by-step guide to mindfulness practice.",
      "Article",
      "https://www.mindful.org/mindfulness-for-beginners-a-guide/",
    ],
    [
      "Anxiety Management Tips",
      "Practical tips to manage daily anxiety.",
      "Article",
      "https://www.psychologytoday.com/us/basics/anxiety",
    ],
    [
      "Tele‑MANAS National MH Helpline (India)",
      "Government‑run 24/7 mental health helpline offering multilingual support.",
      "Resource",
      "https://telemanas.mohfw.gov.in/",
    ],
    [
      "Coping with Stress — WHO",
      "Global guidance on stress and mental wellbeing.",
      "Article",
      "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    ],
  ];

  // ------------------ PROFESSIONAL HELP DATA ------------------
  const professionalHelp = [
    [
      "Manoshala",
      "Online counselling & mental health support in India",
      "https://www.manoshala.com/",
    ],
    [
      "YourDOST",
      "Online emotional support & professional counseling platform",
      "https://yourdost.com/",
    ],
    [
      "CareForMind",
      "Connect with mental health professionals & therapists across India",
      "https://www.careformind.in/",
    ],
    [
      "Mindhouse",
      "Therapy, counselling & wellness services — online in India",
      "https://www.mindhouse.com/therapy/",
    ],
    [
      "BetterLYF",
      "Professional mental health support & therapy in India",
      "https://betterlyf.com/",
    ],
    [
      "InnerHour",
      "Self-help programs & professional therapy online",
      "https://www.theinnerhour.com/",
    ],
    [
      "Mind.fit",
      "Mental wellness programs & online therapy in India",
      "https://www.mind.fit/",
    ],
    [
      "iTherapy",
      "Digital therapy & counselling services",
      "https://www.itherapy.in/",
    ],
  ];

  // ------------------ DYNAMIC TIPS ------------------
  const getDynamicTips = () => {
    const personalized = [];

    if (habits.sleepsLate)
      personalized.push("Try fixing a consistent sleep schedule 🌙");
    if (habits.drinksAlcohol)
      personalized.push("Reduce alcohol and increase hydration 💧");
    if (habits.stressed)
      personalized.push("Practice breathing exercises for 5 minutes 😮‍💨");
    if (habits.lessWater)
      personalized.push("Try drinking at least 5–6 glasses of water daily 🥤");
    if (habits.sociallyIsolated)
      personalized.push("Reach out to a close friend or family member 🤝");

    if (personalized.length === 0)
      return ["Great! You're maintaining healthy habits 🎉"];

    return personalized;
  };

  // ------------------ FILTERED DATA ------------------
  const query = searchQuery.trim().toLowerCase();

  const filteredArticles = articles.filter(
    ([title, desc]) =>
      title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)
  );

  const filteredProfessionalHelp = professionalHelp.filter(
    ([title, desc, link]) =>
      title.toLowerCase().includes(query) ||
      desc.toLowerCase().includes(query) ||
      link.toLowerCase().includes(query)
  );

  return (
    <div className="container py-5 resources-page">
      {/* ---------------- PAGE HEADING ---------------- */}
      <h1 className="page-heading text-center mb-4">
        🌿 Your Mental Wellness Hub
      </h1>
      <p className="resources-subtitle text-center mb-5">
        Curated tools, articles, and support to help you feel better every day.
      </p>

      {/* ================= CRISIS SECTION ================= */}
      <section className="crisis-box p-4 mb-5 rounded shadow">
        <h2 className="section-title mb-3">Crisis & Counselling Resources</h2>
        <p className="text-danger fw-bold mb-3">
          If you're in immediate distress or need help — reach out any time.
        </p>
        <div className="row g-4">
          {crisisResources.map(({ title, desc, link, btn, btnClass }, i) => (
            <div className="col-md-4" key={i}>
              <a href={link} className="text-decoration-none text-dark">
                <div className={`card crisis-card h-100 p-3`}>
                  <h5 className="fw-bold">{title}</h5>
                  <p>{desc}</p>
                  <div className={`btn w-100 fs-6 ${btnClass}`}>{btn}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SEARCH BAR ================= */}
      <div className="mb-4 search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search articles or professional help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ================= ARTICLES SECTION ================= */}
      <section className="mb-5 resource-section">
        <h2 className="section-title mb-3">
          Mental Health Resources (Global + India)
        </h2>
        <div className="row g-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(([title, desc, tag, link]) => (
              <div className="col-md-4" key={title}>
                <a
                  href={link}
                  target="_blank"
                  className="text-decoration-none text-dark"
                >
                  <div className="card resource-card h-100 p-3">
                    <span className="badge bg-info mb-2">{tag}</span>
                    <h5 className="fw-bold">{title}</h5>
                    <p>{desc}</p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </section>

      {/* ================= PROFESSIONAL HELP ================= */}
      <section className="mb-5 prof-help-section">
        <h2 className="section-title mb-3">Finding Professional Help</h2>
        <div className="row g-4">
          {filteredProfessionalHelp.length > 0 ? (
            filteredProfessionalHelp.map(([title, desc, link]) => (
              <div className="col-md-6" key={title}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  <div className="card resource-card h-100 p-3">
                    <h5 className="fw-bold">{title}</h5>
                    <p>{desc}</p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p>No professional help resources found.</p>
          )}
        </div>
      </section>

      {/* ================= SELF-CARE TIPS ================= */}
      <section className="mb-5">
        <h2 className="section-title mb-3">Daily Self-Care Tips</h2>

        {/* USER HABITS */}
        <div className="selfcare-box p-3 rounded mb-4">
          <h5 className="fw-bold mb-3">Tell us about your habits:</h5>
          {[
            ["drinksAlcohol", "I drink alcohol sometimes"],
            ["sleepsLate", "I sleep very late"],
            ["stressed", "I often feel stressed"],
            ["lessWater", "I drink very little water"],
            ["sociallyIsolated", "I barely talk to anyone"],
          ].map(([key, label]) => (
            <label
              key={key}
              className="selfcare-item d-flex align-items-center"
            >
              <input
                type="checkbox"
                checked={habits[key]}
                onChange={() =>
                  setHabits((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              />
              <span>{label}</span>
            </label>
          ))}

          <button className="btn btn-secondary mt-3" onClick={resetHabits}>
            Reset Habits
          </button>
        </div>

        {/* DYNAMIC TIPS */}
        <div className="selfcare-box p-3 rounded">
          <h5 className="fw-bold mb-3">Your Personalized Tips:</h5>
          {getDynamicTips().map((tip, i) => (
            <div key={i} className="selfcare-item">
              {tip}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
