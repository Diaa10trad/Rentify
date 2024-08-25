function ItemDescription({ text }) {
  return (
    <div className="">
      <h3 className="mb-4 bg-primary text-white rounded-top-4 p-4 shadow">
        الوصف
      </h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
    </div>
  );
}
export default ItemDescription;
