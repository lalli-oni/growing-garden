
// Doubled coordinates (height) to Cube coordinates
export const doubledToCubed = (doubled: DoubledCoordinates) => {
	const r = Math.floor((doubled.y - doubled.x) / 2)
	const q = doubled.x
	return { q: toPositiveZero(q), r: toPositiveZero(r), s: toPositiveZero(-q-r) }
}

// Cube coordinates to Doubled coordinates (height)
export const CubedToDoubled = (cubed: CubeCoordinates) => {
	// PROBABLY SUPER WRONG TEST NEEDED
	const x = 2 * cubed.q + cubed.r
	const y = cubed.r
	return { x, y }
}

const toPositiveZero = (n: number) => n === -0 ? 0 : n