import app from "../../src/app";

describe("'tasks' service", () => {
  it("registered the service", () => {
    const service = app.service("tasks");
    expect(service).toBeTruthy();
  });
});
