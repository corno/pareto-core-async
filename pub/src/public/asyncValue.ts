import * as pt from "pareto-core-types"
import * as pi from "pareto-core-internals"


export function asyncValue<T>(
    v: T
): pt.AsyncValue<T> {
    return pi.wrapAsyncValueImp(
        (cb) => {
            cb(v)
        }
    )
}