import { useState } from "react";

export default function BookCard({ book, isBorrowed, isReturned, onBorrow, onReturn, onReview }) {
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmitReview = () => {
    if (rating < 1 || rating > 10) {
      alert("Rating must be between 1 and 10");
      return;
    }

    onReview(book.id, rating, description);
    setShowReview(false);
    setRating(0);
    setDescription("");
  };

  return (
    <div className="border p-4 rounded shadow bg-white w-full max-w-sm">
      <div className="flex gap-4">
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="h-32 w-24 object-cover rounded"
          />
        )}
        <div className="flex flex-col justify-between">
          <h3 className="text-xl font-bold">{book.title}</h3>
          <p className="text-gray-700">{book.author}</p>
          <p className="text-sm text-gray-600">Genre: {book.genre}</p>
          <p className="text-sm">Available Copies: {book.available_copies}</p>
          <p className="text-sm">Total Borrows: {book.total_borrowed}</p>
          <p className="text-sm">
            Rating: {book.average_rating ? `${book.average_rating}/10` : "No reviews yet"}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {isBorrowed ? (
          <button
            onClick={onReturn}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Return
          </button>
        ) : (
          book.available_copies > 0 && (
            <button
              onClick={onBorrow}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Borrow
            </button>
          )
        )}

        {(isReturned || isBorrowed) && (
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showReview ? "Cancel Review" : "Write a Review"}
          </button>
        )}

        {showReview && (
          <div className="bg-gray-100 p-2 rounded space-y-2">
            <label className="block text-sm font-medium">Rating (1–10):</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min={1}
              max={10}
              className="w-full border rounded px-2 py-1"
            />
            <label className="block text-sm font-medium">Review (optional):</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded px-2 py-1"
            ></textarea>
            <button
              onClick={handleSubmitReview}
              className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
