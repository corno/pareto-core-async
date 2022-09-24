import * as pi from "pareto-core-internals"
import * as pt from "pareto-core-types"
import { Cache } from "../types/Cache"

export function createCache<T>(
    get: (key: string) => pt.AsyncValue<T>
): Cache<T> {
    const resolved: { [key: string]: T } = {}
    const resolving: {
        [key: string]: {
            _isGuaranteedToReturnAResult: boolean
            callbacks: ((v: T) => void)[]
        }
    } = {}
    return {
        getEntry: (key) => {
            const resolvedEntry = resolved[key]
            if (resolvedEntry !== undefined) {
                return pi.wrapAsyncValueImp(
                    true,
                    {
                        _execute: (cb) => {
                            cb(resolvedEntry)
                        }
                    }
                )
            } else {
                const entryBeingResolved = resolving[key]
                if (entryBeingResolved !== undefined) {
                    return pi.wrapAsyncValueImp(
                        entryBeingResolved._isGuaranteedToReturnAResult,
                        {
                            _execute: (cb) => {
                                entryBeingResolved.callbacks.push(cb)
                            }
                        }
                    )
                } else {
                    const callbacks: ((v: T) => void)[] = []
                    const x = get(key)

                    resolving[key] = {
                        _isGuaranteedToReturnAResult: x._isGuaranteedToReturnAResult,
                        callbacks,
                    }

                    return pi.wrapAsyncValueImp(
                        x._isGuaranteedToReturnAResult,
                        {
                            _execute: (cb) => {
                                callbacks.push(cb)
                                x._execute((v) => {
                                    callbacks.forEach(($) => {
                                        $(v)
                                    })
                                    resolved[key] = v
                                    delete resolving[key]
                                })
                            }
                        }
                    )
                }
            }
        }
    }
}