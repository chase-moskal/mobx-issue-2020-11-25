
export function makeAssertionContext() {
	let failureCount = 0
	return {
		assert(condition) {
			if (!condition) failureCount += 1
		},
		getFailureCount() {
			return failureCount
		},
	}
}
