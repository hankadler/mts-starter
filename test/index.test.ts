import { beforeAll, afterAll, describe, it, vi, expect } from "vitest";
import greet from "../src/greet";

beforeAll(() => {
  vi.spyOn(console, "log");
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("greet works", () => {
  it("logs \"Hello there!\" by default", () => {
    greet();
    expect(console.log).toBeCalledWith("Hello there!");
  });

  it("logs \"Hello Ada!\" when name=Ada", () => {
    greet("Ada");
    expect(console.log).toBeCalledWith("Hello Ada!");
  });
});
