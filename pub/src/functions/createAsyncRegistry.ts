import * as pa from "pareto-core-types"
import * as pl from "pareto-core-lib"
import { AsyncRegistry } from "../types/AsyncRegistry"

export function createAsyncRegistry(
    callback: ($: AsyncRegistry) => void
): pa.AsyncNonValue {
    let done = false
    return {
        execute: (cb) => {
            let counter = 0
            callback({
                register: ($) => {
                    if (done) {
                        pl.panic("UNEXPECTED REGISTER AFTER DONE")
                    }
                    counter += 1
                    $.execute(() => {
                        counter -= 1
                        if (counter === 0) {
                            done = true
                            cb()
                        }
                    })
                }
            })
        }
    }
}