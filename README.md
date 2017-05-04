# SlotFiller
slot-filler is used in combination with sentence-similarity to fill in slots.  Slots are defined using a phrase template such as "What (keyword) is the (item) in?".  The slot-filler can then take a sentence such as "Hi, what aisle is the bacon in?" and fill in the slots keyword="aisle" and item = "bacon".  The slot filler will often work even when the sentence does not exactly match the phrase template including when words are missing, added or misspelled.  A user defined word similarity measure give the user flexibility, one could even include a synonym search in the word similarity measure if desired.  The slot-filler is used as part of the clockmaker bot framework (in the process of release).

# Example 1

```javascript
let slotFiller = require('slot-filler')
let ss = require('sentence-similarity')

let stdOpts = { f: ss.similarityScore.metaphoneDl, options : {threshold: 0.3} }

let a = ['Hello', 'my', 'name', 'is', 'John', 'Jacob']
let b = ['Hello', '(pronoun)', 'name', 'is', '(name)']
let ans = ss.sentenceSimilarity(a,b,stdOpts) 	

console.log(ans)

let slots = slotFiller.getWildcards(b, a, ans.matched, null)
console.log(slots)
```
gives output
```json
{ wildcards: { matched: true, pronoun: 'my', name: 'John Jacob' },
  score: { score: 1, count: 2 } }
```
so that now the slotFiller has estimated the slots for (pronoun) and
(name).  Note, the names inside the wildcards (pronoun),(name) are arbitrary,
the slotFiller would not behave any differently if the names were changed.

# Example 2, reconstruction
Given a phrase with slots and a set of slot values, the slot filler can also fill
in the slots

```javascript
let slotFiller = require('slot-filler')

let wc = {pronoun : "your", name : "kai"}
let phrase = 'Hello, (pronoun) name is (name)'
	
let res = slotFiller.reconstructPhrase(phrase, wc)
console.log(res)
```
produces
```json
{ phrase: 'Hello, your name is kai', success: true, score: 2 }
```