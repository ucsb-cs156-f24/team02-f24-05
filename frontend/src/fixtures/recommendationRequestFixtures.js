const recommendationRequestFixtures = {
  oneRecommendationRequest: {
    id: 1,
    requesterEmail: "student1@university.edu",
    professorEmail: "prof1@university.edu",
    explanation: "Requesting a recommendation for internship applications",
    dateRequested: "2022-01-03T00:00:00",
    dateNeeded: "2022-01-20T00:00:00",
    done: false,
  },
  threeRecommendationRequests: [
    {
      id: 1,
      requesterEmail: "student2@university.edu",
      professorEmail: "prof2@university.edu",
      explanation: "Recommendation needed for graduate school application",
      dateRequested: "2022-01-10T00:00:00",
      dateNeeded: "2022-02-01T00:00:00",
      done: false,
    },
    {
      id: 2,
      requesterEmail: "student3@university.edu",
      professorEmail: "prof3@university.edu",
      explanation: "Letter of recommendation for scholarship application",
      dateRequested: "2023-03-15T00:00:00",
      dateNeeded: "2023-04-01T00:00:00",
      done: false,
    },
    {
      id: 3,
      requesterEmail: "student4@university.edu",
      professorEmail: "prof4@university.edu",
      explanation: "Recommendation for summer research program",
      dateRequested: "2024-05-01T00:00:00",
      dateNeeded: "2024-05-20T00:00:00",
      done: true,
    },
  ],
};

export { recommendationRequestFixtures };
