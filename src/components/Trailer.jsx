const Trailer = ({ trailer, onClose }) => {
  if (!trailer) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
      >
        ✖
      </button>

      <iframe
        src={`https://www.youtube.com/embed/${trailer.key}`}
        width="800"
        height="450"
        title="Trailer"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

export default Trailer;
