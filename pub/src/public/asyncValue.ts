import * as pi from "pareto-core-internals"

/**
 * returns a {@link pi.AsyncValue}
 * @param execute the function that produces the eventual value
 */
export const asyncValue = pi.wrapAsyncValueImp