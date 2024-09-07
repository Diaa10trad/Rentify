import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
export default function SearchBarContainer() {
  const [selectedType, setSelectedType] = useState("product");
  const query = useRef("");
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();

    const trimmedQuery = query.current.trim();
    const encodedQuery = encodeURIComponent(trimmedQuery);

    const queryString = trimmedQuery ? `&query=${encodedQuery}` : "";

    // Construct the URL
    const url = `/Results?type=${encodeURIComponent(
      selectedType
    )}${queryString}&PageNumber=1`;

    navigate(url);
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
