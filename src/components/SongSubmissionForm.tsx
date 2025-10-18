
export default function SongSubmissionForm() {
  return (
    <form className="p-6 bg-gray-800 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Song Title"
          className="p-3 bg-gray-700 border border-gray-600 rounded-md w-full text-white"
        />
        <input
          type="text"
          placeholder="Artist"
          className="p-3 bg-gray-700 border border-gray-600 rounded-md w-full text-white"
        />
      </div>
      <textarea
        placeholder="Optional note"
        className="p-3 bg-gray-700 border border-gray-600 rounded-md w-full text-white"
      ></textarea>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Spotify Link"
          className="p-3 bg-gray-700 border border-gray-600 rounded-md w-full text-white"
        />
        <input
          type="text"
          placeholder="Apple Music Link"
          className="p-3 bg-gray-700 border border-gray-600 rounded-md w-full text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 transition-colors"
      >
        Add Song
      </button>
    </form>
  );
}
