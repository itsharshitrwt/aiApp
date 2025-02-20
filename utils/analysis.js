const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const characterDescriptions = {
  "Joyce Byers": "Fiercely protective, determined mother; resilient, intuitive, and compassionate in the face of the supernatural. Values family above all, but can be stubborn and frazzled.",
  "Jim Hopper": "Gruff protector haunted by the past; values loyalty, fears losing loved ones, finds solace in quiet reflection. Sacrifices all for those he loves.",
  "Dustin Henderson": "Inquisitive, humorous problem-solver; values knowledge and honesty, fears isolation, ideal weekend is fun with friends. Embraces the unconventional.",
  "Eleven": "Emotionally intense, protective survivor; values loyalty, fears losing the love, finds comfort in Eggos and connection. Learning vulnerability.",
  "Mike Wheeler": "Passionate, loyal leader; values honesty, fears losing friends, ideal weekend is D&D with his party. Fights for justice.",
  "Lucas Sinclair": "Rational, honest, grounded practical; values trust, fears people cannot trust, finds peace in logic and protecting his friends. Skeptical but loyal.",
  "Max Mayfield": "Independent, guarded survivor; brave, outspoken, seeks meaningful connections despite trauma. Values space, finds escape in video games.",
  "Steve Harrington": "Charismatic protector seeking purpose; values loyalty, fears being alone, ideal weekend is helping friends. Self-improvement through friendship.",
  "Nancy Wheeler": "Intelligent, resourceful journalist driven by truth; values justice, fears failure, helps everyone, very sweet and finds purpose in uncovering secrets. Fights fearlessly.",
  "Will Byers": "Sensitive, artistic soul longing for belonging; values kindness, fears many things, finds solace in art and true friendship.",
  "Robin Buckley": "Witty, perceptive outsider seeking acceptance; values honesty, fears being unoriginal, finds joy in solving puzzles and quirky friendships.",
  "Eddie Munson": "Rebellious metalhead with a caring heart; fiercely loyal, dramatically misunderstood, values loyalty and finds freedom in music.",
  "Billy Hargrove": "Aggressive exterior hiding deep pain and insecurity; values control, fears vulnerability, driven by repressed anger and validation.",
  "Argyle": "Laid-back, humorous friend seeking good vibes; values peace, fears stress, finds bliss in pizza, skating, and positive energy.",
  "Murray Bauman": "Cynical but insightful investigator seeking truth; values honesty, fears government conspiracies, finds validation in exposing secrets."
};

async function analyzePersonality(answers, questions) {
  // Shuffle character descriptions to ensure equal evaluation
  const shuffledCharacters = Object.entries(characterDescriptions)
    .sort(() => Math.random() - 0.5) 
    .map(([name, traits]) => `* **Character Name**: ${name}\n* **Personality Profile**: ${traits}`)
    .join('\n\n');

  const prompt = `
  Analyze the user's responses and determine which **one** Stranger Things character the user is *most likely to be similar to*, based *strictly* on the provided information. The AI *must* base its analysis *solely* on the user's answers and the character descriptions.

  **[Important Guidelines]:**

  * Carefully compare all characters before deciding. Do *not* favor earlier ones in the list.
  * Only include the character name and why they are similar to the user.
  * Do *not* include the user's answers in the output.
  * If no character is a *clearly* good fit, return:  
    "No strong character match found based on these responses."

  **[User Responses]:**

  ${questions.map((question, index) => `* **Question**: ${question}\n* **Answer**: ${answers[index]}`).join('\n\n')}

  **[Shuffled Stranger Things Characters & Detailed Personality Profiles]:**

  ${shuffledCharacters}

  **[Response Format]:**

  Character Name::: [Matched character]

  * Important: Provide reasoning but do not reference specific user answers.
  `;

  try {
    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,          
      temperature: 0.9,         
      top_p: 0.9,               
      frequency_penalty: 0.5,   
      presence_penalty: 0.5,    
    });

    return response?.choices[0]?.message?.content || "Error analyzing personality.";
  } catch (error) {
    console.error("Error analyzing personality:", error);
    return "Error analyzing personality.";
  }
}

module.exports = { analyzePersonality };
