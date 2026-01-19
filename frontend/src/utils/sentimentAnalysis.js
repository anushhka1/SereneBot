// export function analyzeSentiment(text) {
//   const positiveWords = ["happy", "great", "good", "love", "awesome"];
//   const negativeWords = ["sad", "bad", "angry", "depressed", "tired"];

//   let score = 0;
//   positiveWords.forEach((w) => text.toLowerCase().includes(w) && score++);
//   negativeWords.forEach((w) => text.toLowerCase().includes(w) && score--);

//   if (score > 0) return "Positive";
//   if (score < 0) return "Negative";
//   return "Neutral";
// }

export function analyzeSentiment(text) {
  const positiveWords = [
    "happy", "great", "good", "love", "awesome", "excited", "joy", "fantastic", "relaxed", "calm"
  ];
  const negativeWords = [
    "sad", "bad", "angry", "depressed", "tired", "stressed", "worried", "anxious", "frustrated", "lonely"
  ];

  let score = 0;

  // Split text into words for better matching
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];

  words.forEach((w) => {
    if (positiveWords.includes(w)) score += 2; 
    if (negativeWords.includes(w)) score -= 2;
  });

  // Detect intensity
  let sentiment = "Neutral";
  if (score >= 4) sentiment = "Very Positive 😄";
  else if (score > 0) sentiment = "Positive 🙂";
  else if (score <= -4) sentiment = "Very Negative 😢";
  else if (score < 0) sentiment = "Negative 😞";

  return sentiment;
}



