"use strict";

let slotFiller = require('./SlotFiller.js')
let ss = require('sentence-similarity')

let stdOpts = { f: ss.similarityScore.metaphoneDl, options : {threshold: 0.3} }

//let UserData = require('sb/user/UserData.js')

describe("Testing SlotFiller", function () {


    it("This should produce the correct wildcards", function (done) {

        let pList = []

	let a = 'Hello my name is John Jacob'
	let b = 'Hello (pronoun) is (name)'
	let ans = ss.sentenceSimilarity(a,b,stdOpts) 	

	console.log(ans)

	slotFiller.computeWildcards('Hello (pronoun) is (name)', 'Hello my name is John Jacob', queryIndex, [])

        /*pList.push(simpleTest(phrasex, "muc duz taco salad cot", { item: 'taco salad' }, 'How much does the taco salad cost'))
        pList.push(simpleTest(phrasex, "What is the true color of the banana", { item: 'banana' }, 'What is the true color of the banana'))
        pList.push(simpleTest(phrasex, "What is true color of banana", { column: "true color", item: "banana" }, 'What is true color of banana'))
        pList.push(simpleTest(phrasex, "What is John Loverich email", { item: 'John Loverich', column: 'email' }, null, ['mail', 'address', 'email']))

        //Show that we can get an answer when there are more wildcards than
        //holes to fill.  The result is wrong, but it is the best you can do
        //when no keyword is matched and it is better than crashing.
        pList.push(simpleTest(phrasex, "What is John Loverich email", { item: 'John' }, null, ['mail', 'address', 'tmail'], true))

        //With non alphanumeric character in keywords (?).
        pList.push(simpleTest(phrasex, "What is John Loverich email?", { item: 'John Loverich', column: 'email' }, null, ['mail', 'address', 'email'], true))

        //check for case sensitivity on the column value.
        
        pList.push(simpleTest(phrasex, "What is John Loverich Email?", { item: 'John Loverich', column: 'Email' }, null, ['mail', 'address', 'email'], true))
        pList.push(simpleTest(phrasex, "What aisle is that taco salad located", { item: 'taco salad', column: 'aisle' }, 'What aisle is that taco salad located'))
        pList.push(simpleTest(phrasex, 
            "What aisle is that located", 
            { item: null, column: 'aisle' }, 
            null,
            'What (column) is that (item) located'))

        pList.push(simpleTest(phrasex, 
            "What is my name", 
            { column: 'name' }, 
            null,
            'What is my (column)'))    

        //Show that we get the correct reconstruction
        pList.push(new Promise((resolve, reject) => {
            let res = slotFiller.reconstructPhrase("The (item) is in (column)",
                { item: "tomato", column: "aisle 2" })
            expect(res.phrase).toEqual("The tomato is in aisle 2")
            expect(res.success).toEqual(true)
            resolve();
        }))

        Promise.all(pList).then((values) => {
            done();
        })*/
    }, 10000);

});

var simpleTest = function (phrasex, phrase, expectedWildcard, expectedReconstructedPhrase, keywords, success, expectedPhrase) {
    let userData = new UserData()
    userData.initialize();

    let p = new Promise((resolve, reject) => {

        phrasex.find(phrase, userData).then((resArray) => {

            let res = resArray[0]

            console.log(phrase)
            let wcAndScore = slotFiller.computeWildcards(res.wcDB, res.wcUser, res.matchScore, keywords);
            let wc = wcAndScore.wildcards;
            console.log(res)
            //console.log(wc)

            for (let i in expectedWildcard) {
                expect(wc[i]).toEqual(expectedWildcard[i])
            }

            if(expectedPhrase) {
                expect(res.source.phrase).toBe(expectedPhrase)
            }

            if (expectedReconstructedPhrase) {
                let ans = slotFiller.reconstructPhrase(res.source.phrase, wc);
                let phrase = ans.phrase;

                expect(phrase).toEqual(expectedReconstructedPhrase)
                console.log(phrase)

                if (success != null) {
                    expect(success).toEqual(tSuccess);
                    console.log('success', tSuccess)
                }
            }

            console.log('')
            resolve()
        }).catch((reason) => {
            console.log('failed', reason)
            console.log(reason)
        })
    })

    return p;
}
