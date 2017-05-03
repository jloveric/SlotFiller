"use strict";

let slotFiller = require('../SlotFiller.js')
let ss = require('sentence-similarity')

let stdOpts = { f: ss.similarityScore.metaphoneDl, options : {threshold: 0.3} }

//let UserData = require('sb/user/UserData.js')

describe("Testing SlotFiller", function () {


    it("This should produce the correct wildcards", function (done) {

        let pList = []

	let a = ['Hello', 'my', 'name', 'is', 'John', 'Jacob']
	let b = ['Hello', '(pronoun)', 'name', 'is', '(name)']
	let ans = ss.sentenceSimilarity(a,b,stdOpts) 	

	console.log(ans)

    let queryIndex = [];

    for(let i=0; i<a.length; i++) {
        queryIndex.push({word : a[i], index : ans.matched[i]})
    }

	let slots = slotFiller.computeWildcards(b, a, queryIndex, null)
    console.log(slots)
    done();
     
    }, 10000);

});
