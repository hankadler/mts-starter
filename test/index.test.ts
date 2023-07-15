import { beforeAll, afterAll, describe, it, vi, expect } from "vitest";
// import greet from "../src";
import greet from "../build";

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

  it("logs \"Hello Ada! You're 20 years old!\" when name=Ada,age=20", () => {
    greet("Ada", 20);
    expect(console.log).toBeCalledWith("Hello Ada! You're 20 years old!");
  });
});
