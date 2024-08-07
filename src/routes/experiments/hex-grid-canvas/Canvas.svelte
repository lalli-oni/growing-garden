<script lang="ts">
	import { onMount } from 'svelte'
	
	export let width = 800
	export let height = 500
	export let color = '#333'
	export let background = '#fff'
	
	const width = 800
	const height = 500
	
	let canvas: HTMLCanvasElement
	let context: CanvasRenderingContext2D
	
    let corners

    let hexPath: Path2D
    let gridPath: Path2D

    let grid: Grid

    const angle = 2 * Math.PI / 6
    const radius = 50
	
	onMount(() => {
        const ctx = canvas.getContext('2d')
        if (ctx === null) return
        context = ctx

		handleSize()
        generateHexPath()
        drawGrid()
	})
	
    const generateHexPath = () => {
        hexPath = new Path2D()
        for (var i = 0; i < 6; i++) {
            hexPath.lineTo(0 + radius * Math.cos(angle * i), 0 + radius * Math.sin(angle * i))
        }
        hexPath.closePath()

    }
	
	const handleSize = () => {
		corners = canvas.getBoundingClientRect()
	}

    const drawGrid = () => {
        for (let y = 0, j = 0; y < height; y += radius * Math.sin(angle)) {
            for (
                let x = 0;
                x + radius * (1 + Math.cos(angle)) < width + 100;
                x += radius * (1 + Math.cos(angle)), y += (-1) ** j++ * radius * Math.sin(angle)
            ) {
                drawHexagon(x, y);
                console.log(`drawing hexagon at ${x}, ${y}. ${height}`)
            }
        }
    }

    const drawHexagon = (x, y) => {
        context.beginPath();
        for (var i = 0; i < 6; i++) {
            context.lineTo(x + radius * Math.cos(angle * i), y + radius * Math.sin(angle * i));
        }
        context.closePath();
        context.stroke();
        context.fillStyle = "green"
        context.fill()
    }
</script>

<svelte:window on:resize={handleSize} />

<canvas
    {width}
    {height}
    bind:this={canvas}
/>