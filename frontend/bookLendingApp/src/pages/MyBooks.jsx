import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";

export default function MyBooks() {
  const { token } = useAuth();
  const [borrowedEntries, setBorrowedEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/mybooks/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowedEntries(res.data.filter(entry => !entry.returned)); // only active borrows
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch borrowed books.");
      setLoading(false);
    }
  };

  const returnBook = async (bookId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/return/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowedEntries(prev => prev.filter(entry => entry.book.id !== bookId));
    } catch (err) {
      console.error("Failed to return:", err);
    }
  };

  const borrowBook = async (bookId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/borrow/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyBooks(); // refresh list
    } catch (err) {
      console.error("Failed to borrow:", err);
    }
  };

  useEffect(() => {
    if (token) fetchMyBooks();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Borrowed Books</h2>

      {loading ? (
        <p>Loading your books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : borrowedEntries.length === 0 ? (
        <p>You have not borrowed any books.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {borrowedEntries.map(entry => (
            <BookCard
              key={entry.book.id}
              book={entry.book}
              isBorrowed={true}
              onReturn={() => returnBook(entry.book.id)}
              onBorrow={() => borrowBook(entry.book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
