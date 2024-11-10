import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import HelpRequestEditPage from "main/pages/HelpRequest/HelpRequestEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({
      id: 16,
    }),
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("HelpRequestEditPage tests", () => {
  describe("when the backend doesn't return data", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/helprequest", { params: { id: 16 } }).timeout();
    });

    const queryClient = new QueryClient();
    test("renders header but table is not present", async () => {
      const restoreConsole = mockConsole();

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );
      await screen.findByText("Edit Help Request");
      expect(
        screen.queryByTestId("HelpRequestForm-requesterEmail"),
      ).not.toBeInTheDocument();
      restoreConsole();
    });
  });

  describe("tests where backend is working normally", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/helprequest", { params: { id: 16 } }).reply(200, {
        id: 16,
        requesterEmail: "ryanzanone@ucsb.edu",
        teamId: "5",
        tableOrBreakoutRoom: "5",
        explanation: "explanation",
        requestTime: "2022-02-02T00:00",
        solved: "true",
      });
      axiosMock.onPut("/api/helprequest").reply(200, {
        id: 16,
        requesterEmail: "ryanmz2104@gmail.com",
        teamId: "6",
        tableOrBreakoutRoom: "6",
        explanation: "explanation",
        requestTime: "2024-02-02T00:00",
        solved: "true",
      });
    });

    const queryClient = new QueryClient();
    test("renders without crashing", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );

      await screen.findByTestId("HelpRequestForm-requesterEmail");
    });

    test("Is populated with the data provided", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );

      await screen.findByTestId("HelpRequestForm-requesterEmail");

      const idField = screen.getByTestId("HelpRequestForm-id");
      const requesterEmailField = screen.getByTestId(
        "HelpRequestForm-requesterEmail",
      );
      const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
      const tableOrBreakoutRoomField = screen.getByTestId(
        "HelpRequestForm-tableOrBreakoutRoom",
      );
      const solvedTrueField = screen.getByTestId("HelpRequestForm-solved-true");
      const explanationField = screen.getByTestId(
        "HelpRequestForm-explanation",
      );
      const requestTimeField = screen.getByTestId(
        "HelpRequestForm-requestTime",
      );
      const submitButton = screen.getByTestId("HelpRequestForm-submit");

      expect(idField).toHaveValue("16");
      expect(requesterEmailField).toHaveValue("ryanzanone@ucsb.edu");
      expect(teamIdField).toHaveValue("5");
      expect(requestTimeField).toHaveValue("2022-02-02T00:00");
      expect(tableOrBreakoutRoomField).toHaveValue("5");
      expect(solvedTrueField).toBeChecked();
      expect(explanationField).toHaveValue("explanation");
      expect(submitButton).toBeInTheDocument();
    });

    test("Changes when you click Update", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );

      await screen.findByTestId("HelpRequestForm-requesterEmail");

      const idField = screen.getByTestId("HelpRequestForm-id");
      const requesterEmailField = screen.getByTestId(
        "HelpRequestForm-requesterEmail",
      );
      const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
      const tableOrBreakoutRoomField = screen.getByTestId(
        "HelpRequestForm-tableOrBreakoutRoom",
      );
      const solvedTrueField = screen.getByTestId("HelpRequestForm-solved-true");
      const explanationField = screen.getByTestId(
        "HelpRequestForm-explanation",
      );
      const requestTimeField = screen.getByTestId(
        "HelpRequestForm-requestTime",
      );
      const submitButton = screen.getByTestId("HelpRequestForm-submit");

      expect(idField).toHaveValue("16");
      expect(requesterEmailField).toHaveValue("ryanzanone@ucsb.edu");
      expect(teamIdField).toHaveValue("5");
      expect(requestTimeField).toHaveValue("2022-02-02T00:00");
      expect(tableOrBreakoutRoomField).toHaveValue("5");
      expect(solvedTrueField).toBeChecked();
      expect(explanationField).toHaveValue("explanation");
      expect(submitButton).toBeInTheDocument();

      fireEvent.change(requesterEmailField, {
        target: { value: "ryanmz2104@gmail.com" },
      });
      fireEvent.change(teamIdField, { target: { value: "6" } });
      fireEvent.change(tableOrBreakoutRoomField, { target: { value: "6" } });
      fireEvent.change(requestTimeField, {
        target: { value: "2024-02-02T00:00" },
      });
      fireEvent.change(solvedTrueField, { target: { value: "true" } });

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockToast).toBeCalled());
      expect(mockToast).toBeCalledWith(
        "HelpRequest Updated - id: 16 email: ryanmz2104@gmail.com",
      );
      expect(mockNavigate).toBeCalledWith({ to: "/helprequest" });

      expect(axiosMock.history.put.length).toBe(1); // times called
      expect(axiosMock.history.put[0].params).toEqual({ id: 16 });
      expect(axiosMock.history.put[0].data).toBe(
        JSON.stringify({
          requesterEmail: "ryanmz2104@gmail.com",
          teamId: "6",
          requestTime: "2024-02-02T00:00",
          tableOrBreakoutRoom: "6",
          explanation: "explanation",
          solved: true,
        }),
      ); // posted object
    });
  });
});
