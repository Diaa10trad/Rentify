import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export default function Pager() {
  const [active, setActive] = useState(1);
  const items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setActive(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination style={{ width: "fit-content" }} className=" m-auto p-0">
      {items}
    </Pagination>
  );
}
