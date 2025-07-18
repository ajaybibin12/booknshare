export default function BookCard({ book, isBorrowed, onBorrow, onReturn }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-xl font-bold">{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.genre}</p>
      <p>Available Copies : {book.available_copies}</p>
      <p>Total Borrows : {book.total_borrowed}</p>

      {isBorrowed ? (
        <button onClick={onReturn} className="bg-red-500 text-white px-4 py-1 rounded">
          Return
        </button>
      ) : (
        book.available_copies > 0 && (
          <button onClick={onBorrow} className="bg-green-500 text-white px-4 py-1 rounded">
            Borrow
          </button>
        )
      )}
    </div>
  );
}
