export class Grid {
	private _hexes: Array<Hex>

	public get hexes() {
		return this._hexes
	}

	constructor(hexes: Array<Hex>) {
		this._hexes = hexes
	}
}