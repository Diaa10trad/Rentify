import Stack from "react-bootstrap/Stack";
export default function SectionLine() {
  return (
    <Stack
      className="align-self-center align-self-sm-stretch"
      gap={2}
      direction="horizontal"
    >
      <span
        style={{ width: "25px", height: "6px" }}
        className="bg-primary rounded-pill"
      ></span>
      <span
        style={{ width: "50px", height: "6px" }}
        className="bg-primary rounded-pill"
      ></span>
    </Stack>
  );
}
