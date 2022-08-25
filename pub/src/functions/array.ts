import * as pt from "pareto-core-types"
import * as pr from "pareto-core-raw"
import { createCounter } from "../internal/createCounter"

export function array<T, NT>(
    array: pt.Array<T>,
    elementCallback: ($: T) => pt.AsyncValue<NT>
): pt.AsyncValue<pt.Array<NT>> {
    return {
        execute: (cb) => {
            const temp : NT[] = []
            createCounter(
                (counter) => {
                    array.forEach((v) => {
                        counter.increment()
                        elementCallback(v).execute((v) => {
                            temp.push(v)
                            counter.decrement()
                        })
                    })
                },
                () => {
                    cb(pr.wrapRawArray(temp))
                }
            )
        }
    }
}