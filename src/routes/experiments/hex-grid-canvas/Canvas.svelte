<script lang="ts">
	import { onMount } from 'svelte'

    import { Grid } from './Grid.ts'
	import { doubledToCubed } from './coordinates.utils.ts';
	
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
        // Doubled coordinates
        let doubleX = -5
        let doubleY = -2
        const hexModel: Array<Hex> = []
        console.log(`${width / radius} horizontal hexes`)
        
        gridPath = new Path2D()
        for (let y = 0; y < height + radius; y += radius * Math.sin(angle)) {
            let staggerIndex = 0
            for (
                let x = 0;
                (x + radius * (1 + Math.cos(angle)) - 1) < width + radius;
                x += radius * (1 + Math.cos(angle))
            ) {
                // Stagger vertically
                const staggeredY = y += (-1) ** staggerIndex++ * radius * Math.sin(angle)

                console.log(`drawing hexagon at ${x}, ${staggeredY}. ${staggerIndex}`)

                // context.save()
                // context.translate(x, y)
                context.setTransform(1, 0, 0, 1, x, staggeredY)
                context.stroke(hexPath);
                if (staggerIndex % 2 > 0) {
                    context.fillStyle = 'red'
                } else {
                    context.fillStyle = 'blue'
                }
                context.fill(hexPath)

                console.log(`doubled ${doubleX},${doubleY}`)
                const cubedCoordinates = doubledToCubed({ x: doubleX, y: doubleY })
                console.log(`cubed q:${cubedCoordinates.q}, r:${cubedCoordinates.r}, s:${cubedCoordinates.s}`)
                hexModel.push({ coordinates: cubedCoordinates})
                // debugger
                // context.restore()
                doubleX += 2
            }
            // debugger
            doubleX = 0
            doubleY += 2
        }
        grid = new Grid(hexModel)
    }

    // Deprecated: tiny bit slower than using Path2D
    const drawHexagon = (x: number, y: number) => {
        context.beginPath();
        for (var i = 0; i < 6; i++) {
            context.lineTo(x + radius * Math.cos(angle * i), y + radius * Math.sin(angle * i));
        }
        context.closePath()
        context.stroke()
        // context.fillStyle = "green"
        // context.fill()
    }
</script>

<svelte:window on:resize={handleSize} />

<canvas
    {width}
    {height}
    bind:this={canvas}
/>