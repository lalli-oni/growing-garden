export class Grid {
	private _hexes: Array<Hex>

	public get hexes() {
		return this._hexes
	}

	public get(coordinates: CubeCoordinates): Hex | null {
		return (
			this._hexes?.find(
				(h) =>
					h.coordinates.q === coordinates.q &&
					h.coordinates.r === coordinates.r &&
					h.coordinates.s === coordinates.s
			) || null
		)
	}

	constructor(hexes: Array<Hex>) {
		this._hexes = hexes
	}
}
