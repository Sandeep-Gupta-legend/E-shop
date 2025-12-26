import { useState, useRef } from "react";

const SearchBar = ({ value, onChange }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onChange(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="flex items-center bg-white rounded-lg shadow overflow-hidden w-full max-w-xl">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-3 outline-none"
      />

      <button
        onClick={startListening}
        className={`px-4 text-xl ${
          listening ? "text-red-500 animate-pulse" : "text-gray-600"
        }`}
        title="Voice Search"
      >
        🎤
      </button>
    </div>
  );
};

export default SearchBar;
