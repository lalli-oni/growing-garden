<script lang="ts">
    import Canvas from './Canvas.svelte'

</script>


<div>
    <p>
        Experimenting on drawing a hexagonal grid in a canvas element. This is to support my pet project of a procedurally generated storytelling hexagonal grid turn based fantasy RPG.
    </p>

    <h2>TODO</h2>
    <ol>
        <li>Linking with hex object model</li>
        <li>Identify hexes using hexagonal coordinate system</li>
        <li>Moving around the grid</li>
        <li>Allow resizing the viewport</li>
        <li>Draw hex content</li>
    </ol>

    <Canvas />
</div>

<style>
</style>
