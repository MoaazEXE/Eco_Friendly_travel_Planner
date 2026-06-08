import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalculatorPage from "./CalculatorPage";

describe("CalculatorPage", () => {
  test("does not show results before calculation", () => {
    render(<CalculatorPage />);

    expect(screen.queryByText("Results")).not.toBeInTheDocument();
  });

  test("calculates emissions using default flight and hotel options", async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);

    await user.type(screen.getByLabelText(/total distance/i), "1000");
    await user.type(screen.getByLabelText(/number of nights/i), "5");
    await user.click(screen.getByRole("button", { name: /calculate emissions/i }));

    expect(screen.getByText("255.00 kg CO₂")).toBeInTheDocument();
    expect(screen.getByText("150.00 kg CO₂")).toBeInTheDocument();
    expect(screen.getByText(/Total: 405.00 kg CO₂/i)).toBeInTheDocument();
    expect(screen.getByText(/High Impact/i)).toBeInTheDocument();
  });

  test("calculates low impact result for train and camping", async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);

    await user.click(screen.getByRole("button", { name: /train/i }));
    await user.click(screen.getByRole("button", { name: /camping/i }));

    await user.type(screen.getByLabelText(/total distance/i), "100");
    await user.type(screen.getByLabelText(/number of nights/i), "2");
    await user.click(screen.getByRole("button", { name: /calculate emissions/i }));

    expect(screen.getByText("4.10 kg CO₂")).toBeInTheDocument();
    expect(screen.getByText("10.00 kg CO₂")).toBeInTheDocument();
    expect(screen.getByText(/Total: 14.10 kg CO₂/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Great Job/i)).toBeInTheDocument();
  });

  test("calculates moderate impact result for car and hostel", async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);

    await user.click(screen.getByRole("button", { name: /car/i }));
    await user.click(screen.getByRole("button", { name: /hostel/i }));

    await user.type(screen.getByLabelText(/total distance/i), "200");
    await user.type(screen.getByLabelText(/number of nights/i), "3");
    await user.click(screen.getByRole("button", { name: /calculate emissions/i }));

    expect(screen.getByText("38.40 kg CO₂")).toBeInTheDocument();
    expect(screen.getByText("45.00 kg CO₂")).toBeInTheDocument();
    expect(screen.getByText(/Total: 83.40 kg CO₂/i)).toBeInTheDocument();
    expect(screen.getByText(/Moderate Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Offset Suggestions/i)).toBeInTheDocument();
  });

  test("returns zero emissions when inputs are empty", async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);

    await user.click(screen.getByRole("button", { name: /calculate emissions/i }));

    expect(screen.getAllByText("0.00 kg CO₂").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Total: 0.00 kg CO₂/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Impact/i)).toBeInTheDocument();
  });

  test("handles negative distance input safely", async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);

    const distanceInput = screen.getByLabelText(/total distance/i);
    const nightsInput = screen.getByLabelText(/number of nights/i);

    await user.type(distanceInput, "-100");
    await user.type(nightsInput, "5");

    await user.click(
        screen.getByRole("button", { name: /calculate emissions/i })
    );

    screen.debug();
    });
});