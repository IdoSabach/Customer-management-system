'use client';

import { useState, useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage'; // ייבא את קומפוננטת הודעת השגיאה

export default function TextInput() {
  const [text, setText] = useState('');
  const [lines, setLines] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false); // מצב להראות את ההודעה

  // פונקציה לקרוא את התוכן מה-API
  const fetchFileContent = async () => {
    try {
      const res = await fetch('/api/read-text');
      const result = await res.json();
      if (res.ok) {
        setLines(result.lines || []); // שמור את השורות במשתנה
      } else {
        console.error('Failed to fetch file content:', result.error);
      }
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  useEffect(() => {
    fetchFileContent(); // קרא את התוכן כשמטען הקומפוננטה
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const isTextInArray = (text, array) => {
    return array.some(line => line.trim() === text.trim());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text.trim()) {
      setError('Text is empty. Nothing to save.');
      return;
    }

    const exists = isTextInArray(text, lines);
    
    if (exists) {
      setError('Text already exists.');
      setShowError(true); // הצג את הודעת השגיאה
      return;
    }

    try {
      const res = await fetch('/api/save-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        setText(""); // מחק את התוכן לאחר שמירה מוצלחת
        setError(''); // הסר את הודעת השגיאה
        setShowError(false); // הסר את הודעת השגיאה
        fetchFileContent(); // עדכן את התוכן לאחר שמירה
      } else {
        console.error('Failed to save text');
        setError('Failed to save text');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save text');
    }
  };

  const handleStay = () => {
    setError("")
  };

  const handleDisconnect = async () => {
    try {
      const res = await fetch('/api/delete-text', { // עדכן את ה-API למחיקת טקסט
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        setText(""); // מחק את התוכן לאחר מחיקה מוצלחת
        setError(''); // הסר את הודעת השגיאה
        setShowError(false); // סגור את הודעת השגיאה
        fetchFileContent(); // עדכן את התוכן לאחר מחיקה
      } else {
        console.error('Failed to delete text');
        setError('Failed to delete text');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to delete text');
    }
  };

  return (
    <main>
      <h2>File Content:</h2>
      <ul>
        {lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter Your ID"
          value={text}
          onChange={handleChange}
        ></textarea>
        <button type="submit">SUBMIT</button>
      </form>
      <ErrorMessage
        message={error}
        onStay={handleStay}
        onDisconnect={handleDisconnect}
      />
    </main>
  );
}
