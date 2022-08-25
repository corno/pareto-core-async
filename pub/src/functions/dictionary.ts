import * as pt from "pareto-core-types"
import * as pr from "pareto-core-raw"
import { createCounter } from "../internal/createCounter"

export function dictionary<T, NT>(
    dictionary: pt.Dictionary<T>,
    entryCallback: ($: T, key: string) => pt.AsyncValue<NT>
): pt.AsyncValue<pt.Dictionary<NT>> {
    return {
        execute: (cb) => {
            const temp: { [key: string]: NT } = {}
            createCounter(
                (counter) => {
                    dictionary.forEach(() => true, ($, key) => {
                        counter.increment()
                        entryCallback($, key).execute((nv) => {
                            temp[key] = nv
                            counter.decrement()
                        })
                    })
                },
                () => {
                    cb(pr.wrapRawDictionary(temp))
                }
            )
        }
    }
}
