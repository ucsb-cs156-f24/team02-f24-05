const helpRequestFixtures = {
  oneRequest: {
    id: 1,
    requesterEmail: "ryanzanone@ucsb.edu",
    teamId: "5",
    tableOrBreakoutRoom: "5",
    requestTime: "2022-01-02T12:00:00",
    explanation: "explanation",
    solved: true,
  },
  threeRequests: [
    {
      id: 1,
      requesterEmail: "ryanzanone@ucsb.edu",
      teamId: "5",
      tableOrBreakoutRoom: "5",
      requestTime: "2022-01-02T12:00:00",
      explanation: "explanation",
      solved: true,
    },
    {
      id: 2,
      requesterEmail: "ryanzanone@gmail.com",
      teamId: "6",
      tableOrBreakoutRoom: "6",
      requestTime: "2022-01-02T12:00:00",
      explanation: "explanation",
      solved: false,
    },
    {
      id: 3,
      requesterEmail: "ryanzanone@cs.ucsb.edu",
      teamId: "7",
      tableOrBreakoutRoom: "7",
      requestTime: "2022-01-02T12:00:00",
      explanation: "explanation",
      solved: false,
    },
  ],
};

export { helpRequestFixtures };
