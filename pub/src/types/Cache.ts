import * as pt from "pareto-core-types"

export type Cache<T> = {
    getEntry: (
        key: string,
    ) => pt.AsyncValue<T>
}