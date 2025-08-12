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
  const [returnedBooks, setReturnedBooks] = useState([]);

  // ✅ Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch books and borrowed status
  useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const [booksRes, myBooksRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/books/?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://127.0.0.1:8000/api/mybooks/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Set books and total pages based on count
      setBooks(booksRes.data.results);
      setTotalPages(Math.ceil(booksRes.data.count / 10)); // <- FIXED HERE

      const borrowedIds = myBooksRes.data
        .filter(entry => !entry.returned)
        .map(entry => entry.book.id);
      setBorrowedBooks(borrowedIds);

      const returnedIds = myBooksRes.data
        .filter(entry => entry.returned)
        .map(entry => entry.book.id);
      setReturnedBooks(returnedIds);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books.");
      setLoading(false);
    }
  };

  if (token) fetchBooks();
}, [token, page]);


  // Filter books
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

  // Borrow book
  const borrowBook = async (bookId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/borrow/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowedBooks(prev => [...prev, bookId]);
      setReturnedBooks(prev => prev.filter(id => id !== bookId));
    } catch (err) {
      console.error("Failed to borrow:", err);
    }
  };

  // Return book
  const returnBook = async (bookId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/return/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowedBooks(prev => prev.filter(id => id !== bookId));
      setReturnedBooks(prev => [...prev, bookId]);
    } catch (err) {
      console.error("Failed to return:", err);
    }
  };

  // Review book
  const reviewBook = async (bookId, rating, description) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/books/${bookId}/review/`, {
        rating,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Review submitted!");
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Error submitting review.");
    }
  };

  return (
    <div className="p-4">
      {/* Filters */}
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

      {/* Book Grid */}
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map(book => (
              <BookCard
                key={book.id}
                book={book}
                isBorrowed={borrowedBooks.includes(book.id)}
                isReturned={returnedBooks.includes(book.id)}
                onBorrow={() => borrowBook(book.id)}
                onReturn={() => returnBook(book.id)}
                onReview={reviewBook}
              />
            ))}
          </div>

          {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-6 gap-3">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded transition 
      ${page === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  ⬅ Previous
                </button>

                <span className="px-4 py-2 bg-gray-100 rounded shadow font-semibold text-gray-700">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded transition 
      ${page === totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  Next ➡
                </button>
              </div>

        </>
      )}
    </div>
  );
}
