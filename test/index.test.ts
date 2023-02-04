import sinon, { SinonSpy } from "sinon";
import assert from "assert";
import greet from "../src/greet";

describe("greet works", () => {
  const mockConsole: Record<string, SinonSpy> = {};

  before(() => {
    mockConsole.spy = sinon.spy(console, "log");
  });

  after(() => {
    mockConsole.spy.restore();
  });

  it("logs \"Hello there!\" by default", () => {
    greet();
    assert(mockConsole.spy.calledWith("Hello there!"));
  });

  it("logs \"Hello Ada!\" when name=Ada", () => {
    greet("Ada");
    assert(mockConsole.spy.calledWith("Hello Ada!"));
  });
});
