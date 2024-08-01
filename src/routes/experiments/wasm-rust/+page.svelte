<script>
    import * as wasm from "./pkg/frontier_rust.js"
</script>



<div>
    <p>
        Experimenting with integrating WASM compiled from Rust. This is loosely done with the idea of web app game development.
    </p>

    <p>
        Used this guide to compile rust code into WebAssembly: https://rustwasm.github.io/docs/book/game-of-life
    </p>

    <p>
        Copied the `/pkg` folder into this project. Don't want to bring in the complexity (yet!) of configuring the wasm compiling process into vite & sveltekit.
    </p>

    <h2>TODO</h2>
    <ol>
        <li>Look into database integration (use browser storage?)</li>
        <li>Production bundle size</li>
    </ol>

    <button on:click={() => { wasm.greet() }}>Run wasm code</button>
</div>

<style>
</style>
