import * as pt from "pareto-core-types"


export function value<T>(
    v: T
): pt.AsyncValue<T> {
    return {
        execute: (cb) => {
            cb(v)
        }
    }
}