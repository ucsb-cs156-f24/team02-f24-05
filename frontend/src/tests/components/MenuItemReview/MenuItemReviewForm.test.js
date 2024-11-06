import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("MenuItemReviewForm tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    expect(await screen.findByText(/Item Id/)).toBeInTheDocument();
    expect(await screen.findByText(/Create/)).toBeInTheDocument();
  });

  test("renders correctly when passing in a MenuItemReview", async () => {
    render(
      <Router>
        <MenuItemReviewForm initialContents={menuItemReviewFixtures.oneReview} />
      </Router>
    );
    expect(await screen.findByTestId("MenuItemReviewForm-id")).toBeInTheDocument();
    expect(screen.getByTestId("MenuItemReviewForm-itemId")).toBeInTheDocument();
    expect(screen.getByTestId("MenuItemReviewForm-dateReviewed")).toBeInTheDocument();
    expect(screen.getByTestId("MenuItemReviewForm-reviewerEmail")).toBeInTheDocument();
    expect(screen.getByTestId("MenuItemReviewForm-stars")).toBeInTheDocument();
    expect(screen.getByTestId("MenuItemReviewForm-comments")).toBeInTheDocument();
    expect(screen.getByTestId("MenuItemReviewForm-id")).toHaveValue("1");
  });

  test("displays correct error messages on invalid input", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    const itemIdField = screen.getByTestId("MenuItemReviewForm-itemId");
    const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
    const starsField = screen.getByTestId("MenuItemReviewForm-stars");
    const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
    const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

    fireEvent.change(itemIdField, { target: { value: "bad-input" } });
    fireEvent.change(reviewerEmailField, { target: { value: "bad-input" } });
    fireEvent.change(starsField, { target: { value: 6 } });
    fireEvent.change(dateReviewedField, { target: { value: "bad-input" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Item Id is required/)).toBeInTheDocument();
    //expect(screen.getByText(/Enter a valid email/)).toBeInTheDocument();
    //expect(screen.getByText(/Rating must be between 1 and 5/)).toBeInTheDocument();
    expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument();
  });

  test("displays correct error messages on missing input", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

    fireEvent.click(submitButton);

    expect(await screen.findByText(/Item Id is required/)).toBeInTheDocument();
    expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument();
    expect(screen.getByText(/Reviewer Email is required/)).toBeInTheDocument();
    expect(screen.getByText(/Rating is required/)).toBeInTheDocument();
    expect(screen.getByText(/Comments are required/)).toBeInTheDocument();
  });

  test("does not display error messages on valid input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <Router>
        <MenuItemReviewForm submitAction={mockSubmitAction} />
      </Router>
    );

    const itemIdField = screen.getByTestId("MenuItemReviewForm-itemId");
    const starsField = screen.getByTestId("MenuItemReviewForm-stars");
    const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
    const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
    const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
    const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

    fireEvent.change(itemIdField, { target: { value: 4 } });
    fireEvent.change(reviewerEmailField, { target: { value: "test@gmail.com" } });
    fireEvent.change(starsField, { target: { value: 2 } });
    fireEvent.change(commentsField, { target: { value: "fine" } });
    fireEvent.change(dateReviewedField, { target: { value: "2022-01-02T12:00" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(screen.queryByText(/Date Reviewed must be in ISO format/)).not.toBeInTheDocument();
  });

  test("calls navigate(-1) when Cancel is clicked", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    const cancelButton = screen.getByTestId("MenuItemReviewForm-cancel");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });

  test("handles onChange events properly for all fields", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    const itemIdField = screen.getByTestId("MenuItemReviewForm-itemId");
    const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
    const starsField = screen.getByTestId("MenuItemReviewForm-stars");
    const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
    const commentsField = screen.getByTestId("MenuItemReviewForm-comments");

    fireEvent.change(itemIdField, { target: { value: 3 } });
    expect(itemIdField).toHaveValue(3);

    fireEvent.change(reviewerEmailField, { target: { value: "user@example.com" } });
    expect(reviewerEmailField).toHaveValue("user@example.com");

    fireEvent.change(starsField, { target: { value: 4 } });
    expect(starsField).toHaveValue(4);

    fireEvent.change(dateReviewedField, { target: { value: "2023-03-04T10:00" } });
    expect(dateReviewedField).toHaveValue("2023-03-04T10:00");

    fireEvent.change(commentsField, { target: { value: "Great item!" } });
    expect(commentsField).toHaveValue("Great item!");
  });
});
