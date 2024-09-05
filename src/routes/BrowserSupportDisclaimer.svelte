<script lang="ts">
	import { onMount } from "svelte";
	import { type Writable, writable } from "svelte/store";

    const features = [{
        name: "relative colors",
        check: ["color", "hsl(from white h s l)"]
    }]
    
    let unsupportedFeatures: Writable<Array<string>> = writable([])

    let dismissed = false

    onMount(async () => {
        if (typeof window !== 'undefined' && CSS && CSS.supports) {
            features.forEach((f) => {
                if (Array.isArray(f.check) && f.check?.length === 2) {
                    if (!CSS.supports(f.check[0], f.check[1])) {
                        $unsupportedFeatures = [...$unsupportedFeatures, f.name]
                    }
                } else {
                    // if (!CSS.supports(f.check)) {
                    //     unsupportedFeatures.push(f.name)
                    // }
                }
            })
        }
    })
</script>

{#if $unsupportedFeatures.length && !dismissed}
    <div id="disclaimer-container">
        <input class="dismiss-button" type="button" on:click={() => dismissed = true} value="X"/>
        <span class="disclaimer-text">
            Sorry! The following css features are not supported in your current browser.
        </span>
        <ul class="features-list">
            {#each $unsupportedFeatures as feature}
            <li>{feature}</li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    #disclaimer-container {
        border: 1px solid white;
        padding: 0.5rem;
        max-width: 30rem;
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: var(--text-color);
    }

    .dismiss-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background-color: transparent;
        border: 0px solid transparent;
        color: var(--color-primary);
        cursor: pointer;
    }

    .features-list {
        margin: 0.2rem 0rem;
        color: var(--color-primary)
    }

    .dismiss-button:hover {
        color: white;
    }
</style>