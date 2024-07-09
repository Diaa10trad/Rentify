import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import getOneFromUrl from "@/utils/getOneFromUrl.js";
import { useSearchParams } from "react-router-dom";
export default function Pager() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("PageNumber") || 1
  );
  const PaginationItems = [];

  for (let number = 1; number <= 5; number++) {
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
    <Pagination style={{ width: "fit-content" }} className=" m-auto p-0">
      {PaginationItems}
    </Pagination>
  );
}
