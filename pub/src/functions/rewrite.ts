import * as pt from "pareto-core-types"

export function rewrite<In, Out>(
    source: pt.AsyncValue<In>,
    rewrite: (source: In) => pt.AsyncValue<Out>
): pt.AsyncValue<Out> {
    return {
        execute: ((cb) => {
            source.execute((v) => {
                rewrite(v).execute(cb)
            })
        })
    }
}
