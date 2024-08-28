"use client";

import { useState, useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";

export default function TextInput() {
  const [text, setText] = useState("");
  const [lines, setLines] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const fetchFileContent = async () => {
    try {
      const res = await fetch("/api/read-text");
      const result = await res.json();
      if (res.ok) {
        setLines(result.lines || []);
      } else {
        console.error("Failed to fetch file content:", result.error);
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  useEffect(() => {
    fetchFileContent();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const isTextInArray = (text, array) => {
    return array.some((line) => line.trim() === text.trim());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text.trim()) {
      setError("");
      return;
    }

    const exists = isTextInArray(text, lines);

    if (exists) {
      setError("Text already exists.");
      setShowError(true);
      return;
    }

    try {
      const res = await fetch("/api/save-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        setText("");
        setError("");
        // setShowError(false);
        fetchFileContent();
      } else {
        console.error("Failed to save text");
        setError("Failed to save text");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save text");
    }
  };

  const handleStay = () => {
    setError("");
    setText("");
  };

  const handleDisconnect = async () => {
    try {
      const res = await fetch("/api/delete-text", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        setText("");
        setError("");
        setShowError(false);
        fetchFileContent();
      } else {
        console.error("Failed to delete text");
        setError("Failed to delete text");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to delete text");
    }
  };

  return (
    <main className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="form flex flex-col gap-4 m-4">
        <input
          type="number"
          placeholder="Enter Your ID"
          value={text}
          min="1"
          max="9999"
          onChange={handleChange}
          className="input-num text-2xl w-96 p-2 border-solid rounded-lg text-center bg-slate-100"
        ></input>
        <button
          type="submit"
          className="btn h-12 bg-green-200 rounded-lg text-xl"
        >
          SUBMIT
        </button>
      </form>
      <ErrorMessage
        message={error}
        onStay={handleStay}
        onDisconnect={handleDisconnect}
      />
      <section className="m-4 text-center">
        <h2 className="text-lg font-medium">Users are logged in:</h2>
        <ul className="grid grid-cols-10 grid-rows-3 gap-0 border-gray-300 mt-4">
          {lines.map((line, index) => (
            <li key={index} className="border border-gray-300 p-4 flex items-center justify-center h-20">{line}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
