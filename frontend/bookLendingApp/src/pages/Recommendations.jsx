import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";

export default function Recommendations() {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/recommendations/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data); // Directly store recommended books
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations.");
      setLoading(false);
    }
  };

  const borrowBook = async (bookId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/borrow/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRecommendations(); // Refresh the recommendations after borrowing
    } catch (err) {
      console.error("Failed to borrow:", err);
    }
  };

  useEffect(() => {
    if (token) fetchRecommendations();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recommended Reads</h2>

      {loading ? (
        <p>Loading your recommendations...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : books.length === 0 ? (
        <p>You have no recommendations.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isBorrowed={false} // Assume not borrowed
              onBorrow={() => borrowBook(book.id)}
              onReturn={null} // Return not needed here
            />
          ))}
        </div>
      )}
    </div>
  );
}
