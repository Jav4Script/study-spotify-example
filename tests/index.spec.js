import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

global.fetch = require("node-fetch");

import SpotifyExample from "../src/index";

describe("SpotifyExample Library", function () {
  it("should create an instance of SpotifyExample", () => {
    let spotify = new SpotifyExample({});
    expect(spotify).to.be.an.instanceof(SpotifyExample);
  });

  it("should receive apiURL as an option", () => {
    let spotify = new SpotifyExample({
      apiURL: "blabla",
    });

    expect(spotify.apiURL).to.be.equal("blabla");
  });

  it("should use the default apiURL if not provided", () => {
    let spotify = new SpotifyExample({});
    expect(spotify.apiURL).to.be.equal("https://api.spotify.com/v1");
  });

  it("should receive token as an option", () => {
    let spotify = new SpotifyExample({
      token: "foo",
    });

    expect(spotify.token).to.be.equal("foo");
  });

  describe("request method", () => {
    let stubedFetch;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, "fetch");
      stubedFetch.resolves({ json: () => {} });
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it("should have request method", () => {
      let spotify = new SpotifyExample({});

      expect(spotify.request).to.exist;
    });

    it("should call fetch when request", () => {
      let spotify = new SpotifyExample({
        token: "foo",
      });

      spotify.request("url");
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it("should call fetch with right url passed", () => {
      let spotify = new SpotifyExample({
        token: "foo",
      });

      spotify.request("url");
      expect(stubedFetch).to.have.been.calledWith("url");
    });

    it("should call fetch with right headers passed", () => {
      let spotify = new SpotifyExample({
        token: "foo",
      });

      const headers = {
        headers: {
          Authorization: `'Bearer foo'`,
        },
      };

      spotify.request("url");
      expect(stubedFetch).to.have.been.calledWith("url", headers);
    });
  });
});
