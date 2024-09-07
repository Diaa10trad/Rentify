import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

export default function FavoriteButton({ itemType, itemId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle the button click
  const handleClick = async () => {
    try {
      const apiUrl = `http://localhost:5079/api/favorite/${itemType}/${itemId}`;
      const token = localStorage.getItem("token");

      if (!isFavorite) {
        // Add to favorites
        setIsFavorite(true);
        await axios.post(
          apiUrl,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Remove from favorites
        setIsFavorite(false);
        await axios.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Toggle the favorite state immediately after the API call
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  // Check initial favorite status on component mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const apiUrl = `http://localhost:5079/api/favorite/${itemType}/${itemId}`;
        const token = localStorage.getItem("token");

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [itemType, itemId]);

  // Determine the button's background class based on the favorite state
  const buttonClass = isFavorite ? "bg-primary" : "bg-none";

  return (
    <Button
      className={`text-white border border-white text-center ${buttonClass}`}
      variant="outline-primary"
      onClick={handleClick}
    >
      <span className="fa fa-heart text-white"></span>
    </Button>
  );
}
