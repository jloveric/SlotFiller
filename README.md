# SlotFiller
slot-filler is used in combination with sentence-similarity to fill in slots

#Example 1

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