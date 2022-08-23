
import * as pt from "pareto-core-types"

export function setCondition<In, Out>(
    source: pt.AsyncValue<In>,
    rewrite: (v: In) => undefined | pt.AsyncValue<Out>,
): pt.AsyncValue<Out> {
    return {
        execute: (cb) => {
            source.execute((vIn) => {
                const res = rewrite(vIn)
                if (res !== undefined) {
                    res.execute(cb)
                }
                //callback is never called
            })
        }
    }
}
