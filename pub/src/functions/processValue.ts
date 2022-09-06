// import * as pa from "pareto-core-types"

// export function processValue<T>(
//     source: pa.AsyncValue<T>,
//     processor: (v: T) => void
// ): pa.AsyncNonValue {
//     return {
//         execute: () => {
//             source.execute((v) => {
//                 processor(v)
//             })
//         }
//     }
// }