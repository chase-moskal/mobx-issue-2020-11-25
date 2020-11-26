
import {configure, observable, action, autorun} from "mobx"
import {makeAssertionContext} from "./tools/make-assertion-context.js"
const {assert, getFailureCount} = makeAssertionContext()
configure({})

// create mobx observable
let data = observable.box(0)

// create a mobx action that increments the observable
const increment = action(() => {
	data += 1
	console.log(`increment data ${data}`)
})

// establish a mobx autorun which counts number of runs
let runs = 0
autorun(() => {
	runs += 1
	console.log(`autorun ${runs} ${data}`)
})

// expecting autorun to have been run once for initialization
assert(runs === 1)

// expect autorun to respond to change
increment()
assert(runs === 2)

// expect autorun responds to two more changes
increment()
increment()
assert(runs === 4)

// report the result
const failureCount = getFailureCount()
if (failureCount === 0) console.log("pass, mobx works")
else console.log(`${failureCount} FAILURES, ${runs} runs`)
