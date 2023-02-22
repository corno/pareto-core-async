import * as pt from "pareto-core-types"
import * as pi from "pareto-core-internals"
import { AsyncTuple2Result, AsyncTuple3Result } from "../types/Tuples"

export function tuple2<T1, T2, Result>(
    cb1: pt.AsyncValue<T1>,
    cb2: pt.AsyncValue<T2>,
    map: ($: AsyncTuple2Result<T1, T2>) => Result,
): pt.AsyncValue<Result> {
    return pi.wrapAsyncValueImp(
        (cb) => {
            let elem1IsSet = false
            let elem2IsSet = false

            let elem1: T1
            let elem2: T2

            function wrapup() {
                if (elem1IsSet && elem2IsSet) {
                    cb(map({ first: elem1, second: elem2 }))
                }
            }
            cb1.__execute((val) => {
                elem1 = val
                elem1IsSet = true
                wrapup()
            })
            cb2.__execute((val) => {
                elem2 = val
                elem2IsSet = true
                wrapup()
            })
        }
    )
}

export function tuple3<T1, T2, T3, Result>(
    cb1: pt.AsyncValue<T1>,
    cb2: pt.AsyncValue<T2>,
    cb3: pt.AsyncValue<T3>,
    map: ($: AsyncTuple3Result<T1, T2, T3>) => Result,
): pt.AsyncValue<Result> {
    return pi.wrapAsyncValueImp(
        (cb) => {
            let elem1IsSet = false
            let elem2IsSet = false
            let elem3IsSet = false

            let elem1: T1
            let elem2: T2
            let elem3: T3

            function wrapup() {
                if (elem1IsSet && elem2IsSet && elem3IsSet) {
                    cb(map({ first: elem1, second: elem2, third: elem3 }))
                }
            }
            cb1.__execute((val) => {
                elem1 = val
                elem1IsSet = true
                wrapup()
            })
            cb2.__execute((val) => {
                elem2 = val
                elem2IsSet = true
                wrapup()
            })
            cb3.__execute((val) => {
                elem3 = val
                elem3IsSet = true
                wrapup()
            })

        }
    )
}
