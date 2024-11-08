const menuItemReviewFixtures = {
  oneReview: {
    id: 1,
    itemId: 1,
    stars: 3,
    comments: "nice",
    reviewerEmail: "a@gamil.com",
    dateReviewed: "2022-01-02T12:00:00",
  },
  threeReviews: [
    {
      id: 1,
      itemId: 2,
      stars: 3,
      comments: "nice",
      reviewerEmail: "a@gamil.com",
      dateReviewed: "2022-01-02T12:00:00",
    },
    {
      id: 2,
      itemId: 6,
      stars: 5,
      comments: "great",
      reviewerEmail: "b@gamil.com",
      dateReviewed: "2022-01-03T12:00:00",
    },
    {
      id: 3,
      itemId: 8,
      stars: 4,
      comments: "not bad",
      reviewerEmail: "c@gamil.com",
      dateReviewed: "2022-01-04T12:00:00",
    },
  ],
};

export { menuItemReviewFixtures };
