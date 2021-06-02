import { ETTTPiece, TTT_PIECE_CELL_HEIGHT, TTT_PIECE_CELL_WIDTH } from '../Model/BaseConstant';

const PIECE_RES_TEMP = 'img_piece_%type_png';

/**
 * 棋子组件
 */
export class Piece extends eui.Component {
	// 皮肤
	public skinName: any = skins.TTT.Piece;
	// 组件
	public img_piece: eui.Image;
	// 属性
	private _type: ETTTPiece;
	private _gameType: any;
	private _col: number;
	private _row: number;

	// get gameType() {
	// 	return this._gameType;
	// }
	// set gameType(gameType: any) {
	// 	if (this._gameType === gameType) return;
	// 	this.updateGameType();
	// }
	// private updateGameType() {}

	/**
	 * 行数
	 */
	get row() {
		return this._row;
	}
	set row(val: number) {
		this._row = val;
		this.y = TTT_PIECE_CELL_HEIGHT * val + TTT_PIECE_CELL_HEIGHT / 2;
	}

	/**
	 * 列数
	 */
	get col() {
		return this._col;
	}
	set col(val: number) {
		this._col = val;
		this.x = TTT_PIECE_CELL_WIDTH * val + TTT_PIECE_CELL_WIDTH / 2;
	}

	/**
	 * 棋子类型
	 */
	get type() {
		return this._type;
	}
	set type(type: ETTTPiece) {
		if (this._type === type) return;
		this._type = type;
		this.updateType();
	}
	private updateType() {
		this.img_piece.source = PIECE_RES_TEMP.replace('%type', this._type.toString());
	}
}
