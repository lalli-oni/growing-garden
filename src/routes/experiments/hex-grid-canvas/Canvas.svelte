<script lang="ts">
	import { onMount } from 'svelte'

    import Controls from './Controls.svelte'
	import InfoArea from './InfoArea.svelte';

    import { Grid } from './Grid'
	import { doubledToCubed } from './coordinates.utils'
	
	const width = 800
	const height = 500
    const backgroundColor = "#fff"
	
	let canvas: HTMLCanvasElement
	let context: CanvasRenderingContext2D
	
    let corners

    let hexPath: Path2D
    const angle = 2 * Math.PI / 6
    const radius = 50

    let grid: Grid
    let selectedHex: Hex
	
    $: drawSelectedHex(selectedHex)

	onMount(() => {
        const ctx = canvas.getContext('2d')
        if (ctx === null) return
        context = ctx

		handleSize()
        generateHexPath()
        drawGrid()
        const selection = grid.get({ q: 0, r: 0, s: 0})
        selectedHex = selection
	})

    const selectHex = (event: CustomEvent<Direction>) => {
        let newCoordinates: CubeCoordinates
        switch (event.detail) {
            case 'Up':
                newCoordinates = { ...selectedHex.coordinates, s: selectedHex.coordinates.s + 1, r: selectedHex.coordinates.r - 1 }
                break;
            case 'UpRight':
                newCoordinates = { ...selectedHex.coordinates, q: selectedHex.coordinates.q + 1, r: selectedHex.coordinates.r - 1 } 
                break;
            case 'DownRight':
                newCoordinates = { ...selectedHex.coordinates, q: selectedHex.coordinates.q + 1, s: selectedHex.coordinates.s - 1 }
                break;
            case 'Down':
                newCoordinates = { ...selectedHex.coordinates, s: selectedHex.coordinates.s - 1, r: selectedHex.coordinates.r + 1 }
                break;
            case 'DownLeft':
                newCoordinates = { ...selectedHex.coordinates, r: selectedHex.coordinates.r + 1, q: selectedHex.coordinates.q - 1 }
                break;
            case 'UpLeft':
                newCoordinates = { ...selectedHex.coordinates, s: selectedHex.coordinates.s + 1, q: selectedHex.coordinates.q - 1 }
                break;
        }
        const newSelection = grid.get(newCoordinates)
        if (!newSelection) console.error(`Trying to select invalid hex}`)

        context.setTransform(1, 0, 0, 1, selectedHex.canvasCoordinates.x, selectedHex.canvasCoordinates.y)
        context.stroke(hexPath)
        selectedHex = newSelection
    }

    const drawSelectedHex = (hex: Hex) => {
        if (!context) return
        console.log(`drawing hex at ${hex.coordinates.q}, ${hex.coordinates.r}, ${hex.coordinates.s}`)
        context.setTransform(1, 0, 0, 1, hex.canvasCoordinates.x, hex.canvasCoordinates.y)
        context.strokeStyle = "white"
        context.stroke(hexPath)
        context.strokeStyle = "black"
    }
	
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

    // Extract initializing the grid model
    const drawGrid = () => {
        // Doubled coordinates
        let doubleX = -4
        let doubleY = -4
        const hexModel: Array<Hex> = []

        for (let y = 0; y < height + radius; y += radius * Math.sin(angle)) {
            let staggerIndex = 0
            for (
                let x = 0;
                (x + radius * (1 + Math.cos(angle)) - 1) < width + radius;
                x += radius * (1 + Math.cos(angle))
            ) {
                // Stagger vertically
                const staggeredY = y += (-1) ** staggerIndex++ * radius * Math.sin(angle)
                const staggeredDoubleY = (staggerIndex % 2 == 0) ? doubleY - 1 : doubleY
                // debugger

                const cubedCoordinates = doubledToCubed({ x: doubleX, y: staggeredDoubleY })
                console.log(`doubled ${doubleX},${staggeredDoubleY}`)
                console.log(`cubed q:${cubedCoordinates.q}, r:${cubedCoordinates.r}, s:${cubedCoordinates.s}`)
                hexModel.push({ coordinates: cubedCoordinates, canvasCoordinates: { x, y: staggeredY }})

                context.setTransform(1, 0, 0, 1, x, staggeredY)
                context.stroke(hexPath)
                if (staggerIndex % 2 > 0) {
                    context.fillStyle = 'red'
                } else {
                    context.fillStyle = 'blue'
                }
                context.fill(hexPath)
                context.font = "12px serif"
                // context.strokeText(`q: ${cubedCoordinates.q}, r: ${cubedCoordinates.r}, s: ${cubedCoordinates.s}`, -(radius / 2), 0)
                // context.strokeText(`x: ${doubleX}, y: ${staggeredDoubleY}`, -(radius / 2), 0)

                doubleX += 1
            }
            doubleX = -4
            doubleY += 2
        }
        grid = new Grid(hexModel)
    }
</script>

<svelte:window on:resize={handleSize} />

<Controls selectedHex={selectedHex} grid={grid} on:selectHex={selectHex}/>
<InfoArea selectedHex={selectedHex} />

<canvas
    {width}
    {height}
    style:backgroundColor
    bind:this={canvas}
/>