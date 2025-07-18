import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ genre: '', author: '', availability: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);


  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const [booksRes, myBooksRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/books/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://127.0.0.1:8000/api/mybooks/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setBooks(booksRes.data);
      const borrowedIds = myBooksRes.data
        .filter(entry => !entry.returned)
        .map(entry => entry.book.id);
      setBorrowedBooks(borrowedIds);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books.");
      setLoading(false);
    }
  };

  if (token) fetchBooks();
}, [token]);



  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filtered = books.filter(book => {
    const isAvailable = book.available_copies > 0;
    return (
      (!filters.genre || book.genre.toLowerCase() === filters.genre.toLowerCase()) &&
      (!filters.author || book.author.toLowerCase().includes(filters.author.toLowerCase())) &&
      (!filters.availability || (filters.availability === "available" ? isAvailable : !isAvailable))
    );
  });

  const borrowBook = async (bookId) => {
  try {
    await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/borrow/`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBorrowedBooks(prev => [...prev, bookId]);
  } catch (err) {
    console.error("Failed to borrow:", err);
  }
};

const returnBook = async (bookId) => {
  try {
    await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/return/`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBorrowedBooks(prev => prev.filter(id => id !== bookId));
  } catch (err) {
    console.error("Failed to return:", err);
  }
};


  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4 flex-wrap">
        <select name="genre" onChange={handleChange} className="p-2 border rounded">
          <option value="">All Genres</option>
          <option value="Mystery">Mystery</option>
          <option value="Novel">Novel</option>
          <option value="Tech">Tech</option>
        </select>
        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select name="availability" onChange={handleChange} className="p-2 border rounded">
          <option value="">Any</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map(book => (
            <BookCard
              book={book}
              isBorrowed={borrowedBooks.includes(book.id)}
              onBorrow={() => borrowBook(book.id)}
              onReturn={() => returnBook(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
