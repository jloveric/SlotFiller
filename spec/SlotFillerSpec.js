"use strict";

let slotFiller = require("../SlotFiller.js");
let ss = require("sentence-similarity");

let stdOpts = {
  f: ss.similarityScore.metaphoneDl,
  options: { threshold: 0.3 }
};

//let UserData = require('sb/user/UserData.js')

describe("Testing SlotFiller", function() {
  it("This should produce the correct wildcards", function(done) {
    let a = ["Hello,", "my", "name", "is", "John", "Jacob"];
    let b = ["Hello,", "(pronoun)", "name", "is", "(name)"];
    let ans = ss.sentenceSimilarity(a, b, stdOpts);

    console.log(ans);

    let slots = slotFiller.getWildcards(b, a, ans.matched, null);
    console.log(slots);

    expect(slots.wildcards.pronoun).toEqual("my");
    expect(slots.wildcards.name).toEqual("John Jacob");
    console.log("finished");
    done();
  }, 10000);

  it("Fill in the correct wildcards", function(done) {
    let wc = { pronoun: "your", name: "kai" };
    let phrase = "Hello, (pronoun) name is (name)";

    let res = slotFiller.reconstructPhrase(phrase, wc);
    console.log(res);

    expect(res.phrase).toEqual("Hello, your name is kai");
    console.log("finished");
    done();
  }, 10000);

  it("Produce the correct wildcards with inexact match", function(done) {
    let a = ["my", "is", "John", "Jacob"];
    let b = ["Hello,", "(pronoun)", "name", "is", "(name)"];
    let ans = ss.sentenceSimilarity(a, b, stdOpts);

    console.log(ans);

    let slots = slotFiller.getWildcards(b, a, ans.matched, null);
    console.log(slots);

    expect(slots.wildcards.pronoun).toEqual("my");
    expect(slots.wildcards.name).toEqual("John Jacob");
    console.log("finished");
    done();
  }, 10000);
});
