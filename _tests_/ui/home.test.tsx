import { test, describe } from "@jest/globals";
import Home from "@/app/(website)/(pages)/(home)/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit test UI", () => {
  test("example", () => {
    render(<Home />);

    expect(screen.getByRole("heading")).toHaveTextContent("Heading");
  });
});
