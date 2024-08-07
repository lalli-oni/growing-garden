
// Doubled coordinates (height) to Cube coordinates
export const doubledToCubed = (doubled: DoubledCoordinates) => {
	const q = (doubled.x - doubled.y) / 2
	const r = doubled.y
	return { q, r, s: -q-r }
}

// Cube coordinates to Doubled coordinates (height)
export const CubedToDoubled = (cubed: CubeCoordinates) => {
	const x = 2 * cubed.q + cubed.r
	const y = cubed.r
	return { x, y }
}