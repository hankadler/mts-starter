import sinon, { SinonSpy } from "sinon";
import test, { ExecutionContext } from "ava";
import greet from "../src/greet";

const mockConsole: Record<string, SinonSpy> = {};

test.before(() => {
  mockConsole.spy = sinon.spy(console, "log");
});

test.after(() => {
  mockConsole.spy.restore();
});

test("logs \"Hello there!\" by default", (t: ExecutionContext) => {
  greet();
  t.assert(mockConsole.spy.calledWith("Hello there!"));
});

test("logs \"Hello Ada!\" when name=Ada", (t: ExecutionContext) => {
  greet("Ada");
  t.assert(mockConsole.spy.calledWith("Hello Ada!"));
});
