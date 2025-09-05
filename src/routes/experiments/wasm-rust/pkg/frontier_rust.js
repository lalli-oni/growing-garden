import * as wasm from './frontier_rust_bg.wasm'
import { __wbg_set_wasm } from './frontier_rust_bg.js'
__wbg_set_wasm(wasm)
export * from './frontier_rust_bg.js'
