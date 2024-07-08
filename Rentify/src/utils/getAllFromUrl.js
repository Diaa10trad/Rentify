import { useLocation } from "react-router-dom";
const getAllFromUrl = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const UrlValues = {};
  for (const [key, value] of searchParams.entries()) {
    if (value === "true") UrlValues[key] = true;
    else if (value === "false") UrlValues[key] = false;
    else UrlValues[key] = value;
  }
  return UrlValues;
};

export default getAllFromUrl;
