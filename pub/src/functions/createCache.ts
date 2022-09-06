import * as pi from "pareto-core-internals"
import * as pt from "pareto-core-types"
import { Cache } from "../types/Cache"

export function createCache<T>(
    get: (key: string) => pt.AsyncValue<T>
): Cache<T> {
    const resolved: { [key: string]: T } = {}
    const resolving: {
        [key: string]: {
            callbacks: ((v: T) => void)[]
        }
    } = {}
    return {
        getEntry: (key) => {
            return pi.wrapAsyncValueImp( {
                _execute: (cb) => {
                    if (resolved[key] !== undefined) {
                        //console.log("\tresolved")
                        cb(resolved[key])
                    } else {
                        if (resolving[key] !== undefined) {
                            //console.log("\tresolving")
                            resolving[key].callbacks.push(cb)
                        } else {
                            //console.log("\tto be resolved")

                            const callbacks: ((v: T) => void)[]= []
                            const x = get(key)
                            callbacks.push(cb)
                            resolving[key] = {
                                callbacks
                            }
                            x._execute((v) => {
                                callbacks.forEach(($) => {
                                    $(v)
                                })
                                resolved[key] = v
                                delete resolving[key]
                            })
                        }
                    }
                }
            })
        }
    }
}