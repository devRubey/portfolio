import { render, screen } from "@testing-library/react";
import Portfolio from "./App";

test("renders portfolio title", () => {
  render(<Portfolio />);
  const linkElement = screen.getByText(/devRubey/i);
  expect(linkElement).toBeInTheDocument();
});
