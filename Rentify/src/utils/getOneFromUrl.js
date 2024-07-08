import { useLocation } from "react-router-dom";
const getOneFromUrl = (key) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const UrlValue = searchParams.get(key);
  return UrlValue;
};
export default getOneFromUrl;
