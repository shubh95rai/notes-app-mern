export default function EmptyCard({ imgSrc, message }) {
  return (
    <div className="flex items-center justify-center flex-col mt-26">
      <img src={imgSrc} alt="no notes" className="w-60" />
      <p className="w-1/2 text- font-medium text-center leading-7 mt-7 text-slate-700">
        {message}
      </p>
    </div>
  );
}
