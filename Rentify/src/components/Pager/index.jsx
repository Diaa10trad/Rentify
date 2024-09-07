import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
import { useSearchParams } from "react-router-dom";
export default function Pager({ pageSize, totalItems }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("PageNumber") || 1
  );
  const totalPages = Math.ceil(totalItems / pageSize);
  const PaginationItems = [];
  // Determine the range of pages to display
  const pageRange = 5; // Number of pages to display in the pager
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  for (let number = startPage; number <= endPage; number++) {
    PaginationItems.push(
      <Pagination.Item
        onClick={() => {
          setSearchParams((prev) => {
            prev.set("PageNumber", number);
            return prev;
          });
          setCurrentPage(number);
        }}
        key={number}
        active={number === parseInt(currentPage)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination style={{ width: "fit-content" }} className="m-auto p-0">
      {currentPage > 1 && (
        <Pagination.Prev
          onClick={() => {
            setSearchParams((prev) => {
              prev.set("PageNumber", currentPage - 1);
              return prev;
            });
            setCurrentPage(currentPage - 1);
          }}
        />
      )}
      {PaginationItems}
      {currentPage < totalPages && (
        <Pagination.Next
          onClick={() => {
            setSearchParams((prev) => {
              prev.set("PageNumber", currentPage + 1);
              return prev;
            });
            setCurrentPage(currentPage + 1);
          }}
        />
      )}
    </Pagination>
  );
}
