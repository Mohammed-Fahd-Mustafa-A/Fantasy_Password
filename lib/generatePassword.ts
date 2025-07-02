const themes = {
  mystic: ["Rune", "Echo", "Star", "Whisper", "Celest", "Luma", "Mythos", "Nova", "Drift", "Zephyr"],
  pop: ["Thanos", "Naruto", "Pixel", "Kong", "Wakanda", "Marvel", "Neo", "Luffy", "Spidey", "Sonic"],
  tamil: ["Semma", "Scene", "Kalakkal", "Mass", "Thala", "Vaada", "Gethu", "Machan", "Sema", "Loosu"],
  ai: ["Quantum", "Prompt", "Neuro", "Logic", "Cyber", "Synth", "Algo", "Model", "Stream", "Node"]
};

const symbols = ["!", "@", "#", "$", "%", "&", "*", "^"];
const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateFantasyPasswords(
  count: number,
  options: {
    includeNumber: boolean;
    includeSymbol: boolean;
    wordCount: number;
    theme: string;
    maxLength: number;
  }
): string[] {
  const { includeNumber, includeSymbol, wordCount, theme, maxLength } = options;
  const words = themes[theme as keyof typeof themes] || themes["mystic"];

  const passwords: string[] = [];

  for (let i = 0; i < count; i++) {
    let parts: string[] = [];

    // Add words until close to maxLength
    while (parts.join("").length < maxLength - 2 && parts.length < wordCount) {
      const word = getRandom(words);
      if (parts.join("").length + word.length <= maxLength) {
        parts.push(word);
      } else {
        break;
      }
    }

    // Join and add optional symbol/number
    let result = parts.join("");

    if (includeNumber) result += getRandom(numbers);
    if (includeSymbol) result += getRandom(symbols);

    // Now pad or trim to exact maxLength
    while (result.length < maxLength) {
      const pool = [...letters];
      if (includeNumber) pool.push(...numbers);
      if (includeSymbol) pool.push(...symbols);
      result += getRandom(pool);
    }

    if (result.length > maxLength) {
      result = result.slice(0, maxLength);
    }

    passwords.push(result);
  }

  return passwords;
}
