import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
export default function SearchBarContainer() {
  const [selectedType, setSelectedType] = useState("Product");
  const query = useRef("");
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    navigate(
      `/Results?type=${selectedType}&query=${encodeURIComponent(query.current)}`
    );
  };
  const onTypeChange = (e) => setSelectedType(e.currentTarget.value);

  return (
    <SearchBar
      onSubmit={search}
      query={query}
      selectedType={selectedType}
      onTypeChange={onTypeChange}
    />
  );
}
