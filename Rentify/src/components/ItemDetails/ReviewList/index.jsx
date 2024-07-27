import Person from "@/assets/images/Person.jpg";
import Review from "@/components/ItemDetails/Review";
function ReviewList() {
  const fakeReviews = [
    {
      reviewerName: "John Doe",
      rating: 4,
      image: Person,
      reviewDate: "2024-07-11",
      comment: `Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recommended!
      Great product, highly recomm
      
      
      
      
      ended!`,
    },
    {
      reviewerName: "Jane Smith",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-10",
      comment: "Excellent service and fast delivery.",
    },
    {
      reviewerName: "Michael Johnson",
      image: Person,
      rating: 3,
      reviewDate: "2024-07-09",
      comment: "Product was okay, could be better.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
    {
      reviewerName: "Emily Brown",
      image: Person,
      rating: 5,
      reviewDate: "2024-07-08",
      comment: "Absolutely love it! Best purchase ever.",
    },
  ];

  return (
    <>
      <h3 className="mb-3">المراجعات والتقييمات ({fakeReviews.length})</h3>
      <div style={{ height: "400px" }} className="overflow-y-auto pe-3 mb-4">
        {fakeReviews.map((review, index) => (
          <Review review={review} key={index} />
        ))}
      </div>
    </>
  );
}

export default ReviewList;
