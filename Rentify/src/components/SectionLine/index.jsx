import Stack from "react-bootstrap/Stack";
export default function SectionLine({ backgroundColor }) {
  return (
    <div>
      <Stack
        className="align-self-center align-self-sm-stretch"
        gap={2}
        direction="horizontal"
      >
        <span
          style={{ width: "25px", height: "6px" }}
          className={`rounded-pill mt-2 mb-3 ${backgroundColor}`}
        ></span>
        <span
          style={{ width: "50px", height: "6px" }}
          className={`rounded-pill mt-2 mb-3 ${backgroundColor}`}
        ></span>
      </Stack>
    </div>
  );
}
