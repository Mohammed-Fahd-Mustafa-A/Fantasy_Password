"use client";
import { useState } from "react";
import { generateFantasyPasswords } from "@/lib/generatePassword";
import { Copy } from "lucide-react";

export default function Home() {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const [count, setCount] = useState(5);
  const [theme, setTheme] = useState("mystic");
  const [maxLength, setMaxLength] = useState(24);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = () => {
    const result = generateFantasyPasswords(count, {
      includeNumber,
      includeSymbol,
      wordCount: 2,
      theme,
      maxLength,
    });
    setPasswords(result);
    setCopiedIndex(null);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-500 to-blue-500 px-6 py-12 flex flex-col items-center text-gray-900 font-sans">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center tracking-tight drop-shadow">
        🔐 Fantasy Passwords
      </h1>

      <div className="bg-white/90 p-8 md:p-10 rounded-2xl w-full max-w-4xl space-y-8 shadow-2xl backdrop-blur-lg border border-white/30">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between text-base font-medium">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeNumber} onChange={() => setIncludeNumber(!includeNumber)} />
            Numbers
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeSymbol} onChange={() => setIncludeSymbol(!includeSymbol)} />
            Symbols
          </label>

          <label className="flex items-center gap-2">
            Theme:
            <select
              className="text-black rounded px-2 py-1 font-semibold"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="mystic">Mystic</option>
              <option value="pop">Pop Culture</option>
              <option value="tamil">Tamil Slang</option>
              <option value="ai">AI Tech</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            Count:
            <select
              className="text-black rounded px-2 py-1 font-semibold"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </label>

          <div className="flex items-center gap-2 grow max-w-xs">
            <label className="whitespace-nowrap font-semibold">
              Length: <span className="text-blue-700">{maxLength}</span>
            </label>
            <input
              type="range"
              min={8}
              max={32}
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
              className="w-full accent-blue-700"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:brightness-110 text-white py-3 rounded-xl font-bold text-lg tracking-wide shadow-lg transition"
          onClick={generate}
        >
          ✨ Generate Passwords
        </button>

        {/* Output */}
        <div className="space-y-4">
          {passwords.map((pwd, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white text-gray-900 rounded-xl px-6 py-4 text-lg font-semibold shadow-sm hover:bg-gray-100 transition"
            >
              <span className="break-words max-w-[85%]">{pwd}</span>
              <button
                onClick={() => copyToClipboard(pwd, index)}
                className="hover:text-green-600 ml-3 flex items-center gap-2"
              >
                <Copy className="w-5 h-5" />
                {copiedIndex === index && (
                  <span className="text-sm text-green-600">Copied</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
