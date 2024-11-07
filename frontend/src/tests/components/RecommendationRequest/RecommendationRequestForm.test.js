import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";
import RecommendationRequestForm from "main/components/RecommendationRequest/RecommendationRequestForm";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("RecommendationRequestForm tests", () => {
  test("renders correctly", () => {
    render(
      <Router>
        <RecommendationRequestForm />
      </Router>,
    );
    expect(screen.getByLabelText(/Requester's Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Professor's Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Explanation/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Request Date \(iso format\)/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Date Needed \(iso format\)/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Done/i)).toBeInTheDocument();
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test("renders correctly with initial contents", () => {
    render(
      <Router>
        <RecommendationRequestForm
          initialContents={
            recommendationRequestFixtures.oneRecommendationRequest
          }
        />
      </Router>,
    );
    expect(screen.getByTestId("RecommendationRequestForm-id")).toHaveValue("1");
  });

  test("displays error messages on invalid input", async () => {
    render(
      <Router>
        <RecommendationRequestForm />
      </Router>,
    );
    const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Requester's Email is required/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Professor's Email is required/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Explanation is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Request Date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Date Needed is required/i)).toBeInTheDocument();
    });
  });

  test("submits correctly with valid input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <Router>
        <RecommendationRequestForm submitAction={mockSubmitAction} />
      </Router>,
    );

    fireEvent.change(
      screen.getByTestId("RecommendationRequestForm-requesterEmail"),
      { target: { value: "test@gmail.com" } },
    );
    fireEvent.change(
      screen.getByTestId("RecommendationRequestForm-professorEmail"),
      { target: { value: "sample@gmail.com" } },
    );
    fireEvent.change(
      screen.getByTestId("RecommendationRequestForm-explanation"),
      { target: { value: "test explanation" } },
    );
    fireEvent.change(
      screen.getByTestId("RecommendationRequestForm-dateRequested"),
      { target: { value: "2024-11-03T12:00" } },
    );
    fireEvent.change(
      screen.getByTestId("RecommendationRequestForm-dateNeeded"),
      { target: { value: "2024-12-03T12:00" } },
    );
    fireEvent.change(screen.getByTestId("RecommendationRequestForm-done"), {
      target: { value: "true" },
    });
    fireEvent.click(screen.getByTestId("RecommendationRequestForm-submit"));

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());
  });

  test("calls navigate(-1) when Cancel is clicked", async () => {
    render(
      <Router>
        <RecommendationRequestForm />
      </Router>,
    );

    fireEvent.click(screen.getByTestId("RecommendationRequestForm-cancel"));

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});
