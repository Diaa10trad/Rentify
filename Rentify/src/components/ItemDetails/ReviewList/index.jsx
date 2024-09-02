import Person from "@/assets/images/Person.jpg";
import Review from "@/components/ItemDetails/Review";
import StarRating from "@/components/StarRating";
import NoContentBox from "@/components/NoContentBox";
function ReviewList({ reviews, totalReviews, averageRating }) {
  return (
    <>
      <h3>المراجعات والتقييمات</h3>
      <h5 className="mb-3">
        <StarRating totalReviews={totalReviews} averageRating={averageRating} />
      </h5>

      {reviews.length > 0 ? (
        <div style={{ height: "400px" }} className="overflow-y-auto pe-3 mb-4">
          {reviews.map((review, index) => (
            <Review review={review} key={index} />
          ))}
        </div>
      ) : (
        <NoContentBox
          title={"لا يوجد تقييمات لإظهارها"}
          text={"لم يقم أحد بالتقييم بعد."}
        />
      )}
    </>
  );
}

export default ReviewList;
