type Hex = {
	coordinates: CubeCoordinates
	canvasCoordinates: { x: number; y: number }
}

type Direction = 'Up' | 'UpRight' | 'DownRight' | 'Down' | 'DownLeft' | 'UpLeft'

type CubeCoordinates = {
	q: number
	r: number
	s: number
}

type DoubledCoordinates = {
	x: number
	y: number
}
