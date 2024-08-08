<script lang="ts">
	import { Grid } from "./Grid";

	import { createEventDispatcher } from 'svelte';

    export let selectedHex: Hex
    export let grid: Grid

	const dispatch = createEventDispatcher<{ selectHex: Direction }>();
</script>


<div style="display: flex">
    <button on:click={() => {
        dispatch('selectHex', 'UpLeft')
    }}>
        UpLeft
    </button>
    <button on:click={() => {
        dispatch('selectHex', 'Up')
    }}>
        Up
    </button>
    <button on:click={() => {
        dispatch('selectHex', 'UpRight')
    }}>
        UpRight
    </button>
</div>
<div style="display: flex">
    <button on:click={() => {
        dispatch('selectHex', 'DownLeft')
    }}>
        DownLeft
    </button>
    <button on:click={() => {
        dispatch('selectHex', 'Down')
    }}>
        Down
    </button>
    <button on:click={() => {
        dispatch('selectHex', 'DownRight')
    }}>
        DownRight
    </button>
</div>