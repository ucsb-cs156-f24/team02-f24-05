import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UCSBDiningCommonsMenuItemForm from "main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemForm";
import { ucsbDiningCommonsMenuItemFixtures } from "fixtures/ucsbDiningCommonsMenuItemFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("UCSBDiningCommonsMenuItemForm tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByText(/Create/);
  });

  test("renders correctly when passing in a UCSBDiningCommonsMenuItem", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm
          initialContents={ucsbDiningCommonsMenuItemFixtures.oneMenuItem}
        />
      </Router>,
    );
    await screen.findByTestId(/UCSBDiningCommonsMenuItemForm-id/);
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId(/UCSBDiningCommonsMenuItemForm-id/)).toHaveValue(
      "1",
    );
  });

  test("Correct Error messages on bad input 1", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByTestId(
      "UCSBDiningCommonsMenuItemForm-diningCommonsCode",
    );
    const diningCommonsCodeField = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-diningCommonsCode",
    );
    const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-name");
    const submitButton = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-submit",
    );

    fireEvent.change(diningCommonsCodeField, {
      target: { value: "a".repeat(60) },
    });
    fireEvent.change(nameField, { target: { value: "a".repeat(30) } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Max length is 50")).toBeInTheDocument();
  });

  test("Correct Error messages on bad input 2", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByTestId(
      "UCSBDiningCommonsMenuItemForm-diningCommonsCode",
    );
    const diningCommonsCodeField = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-diningCommonsCode",
    );
    const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-name");
    const submitButton = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-submit",
    );

    fireEvent.change(diningCommonsCodeField, {
      target: { value: "a".repeat(20) },
    });
    fireEvent.change(nameField, { target: { value: "a".repeat(60) } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Max length is 50")).toBeInTheDocument();
  });

  test("Correct Error messages on bad input 3", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByTestId(
      "UCSBDiningCommonsMenuItemForm-diningCommonsCode",
    );
    const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-name");
    const stationField = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-station",
    );
    const submitButton = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-submit",
    );

    fireEvent.change(stationField, { target: { value: "a".repeat(60) } });
    fireEvent.change(nameField, { target: { value: "a".repeat(30) } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Max length is 50")).toBeInTheDocument();
  });

  test("Correct Error messsages on missing input", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemForm-submit");
    const submitButton = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-submit",
    );

    fireEvent.click(submitButton);

    await screen.findByText("Name is required.");
    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Station is required.")).toBeInTheDocument();
    expect(
      screen.getByText("DiningCommonsCode is required."),
    ).toBeInTheDocument();
  });

  test("No Error messsages on good input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm submitAction={mockSubmitAction} />
      </Router>,
    );
    await screen.findByTestId(
      "UCSBDiningCommonsMenuItemForm-diningCommonsCode",
    );

    const diningCommonsCodeField = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-diningCommonsCode",
    );
    const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-name");
    const stationField = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-station",
    );
    const submitButton = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-submit",
    );

    fireEvent.change(diningCommonsCodeField, { target: { value: "ortega" } });
    fireEvent.change(nameField, { target: { value: "Broccoli" } });
    fireEvent.change(stationField, { target: { value: "sides" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemForm-cancel");
    const cancelButton = screen.getByTestId(
      "UCSBDiningCommonsMenuItemForm-cancel",
    );

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});
