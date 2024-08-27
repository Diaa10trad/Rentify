function TextSection({ title, text }) {
  return (
    <div className="">
      <h3 className="mb-4 bg-primary text-white rounded-top-4 p-4 shadow">
        {title}
      </h3>
      <p className="text-wrap text-break" style={{ whiteSpace: "pre-wrap" }}>
        {text}
      </p>
    </div>
  );
}
export default TextSection;
