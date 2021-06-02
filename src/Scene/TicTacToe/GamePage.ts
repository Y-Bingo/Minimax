import { ArrUtil } from '../../Core/Arr';
import { Piece } from '../Common/Piece';
import { VsPanel } from '../Common/VsPanel';
import { ETTTPiece, TTT_COL, TTT_PIECE_CELL_HEIGHT, TTT_PIECE_CELL_WIDTH, TTT_ROW } from '../Model/BaseConstant';

/**
 * 井字棋
 */
export default class GamePage extends eui.Component {
	// 皮肤
	public skinName: any = skins.TTT.GameScene;
	// 组件
	private main_bg: eui.Image;
	private vs_bar: VsPanel;
	private gp_board: eui.Group;
	// 属性
	private _pieceArr: Piece[][] = [];
	private _isTurnToPc: boolean = false;
	private _board: ETTTPiece[][]; // 局面数据

	/**
	 * @override
	 * 节点创建完成
	 */
	protected childrenCreated() {
		// 组件初始化
		// for (let i = TTT_ROW; i >= 0; i--) {
		// 	this._pieceArr[i] = [];
		// 	for (let j = TTT_ROW; j >= 0; j--) {
		// 		this._recyclePiece(this._createPiece(i, j));
		// 	}
		// }
		this._board = ArrUtil.create(TTT_ROW, TTT_COL) as any;

		// 事件监听
		this.gp_board.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this);
	}

	private onGroupTouch(e: egret.TouchEvent): void {
		const { localX, localY } = e;
		const row = Math.floor(localY / TTT_PIECE_CELL_WIDTH);
		const col = Math.floor(localX / TTT_PIECE_CELL_HEIGHT);
		if (this._pieceArr[row][col]) {
			console.log('已经有棋子了');
			return;
		}
		const piece = this._createPiece(row, col, this._isTurnToPc ? ETTTPiece.CIRCLE : ETTTPiece.CROSS);
		this._pieceArr[row][col] = piece;
		this.gp_board.addChild(piece);
		this._change();
	}

	// 棋子工厂
	private _pieceList: Piece[] = [];
	private _createPiece(row: number = 0, col: number = 0, type: ETTTPiece = ETTTPiece.CIRCLE): Piece {
		let pieceIns;
		if (this._pieceList.length) {
			pieceIns = this._pieceList.pop();
		} else {
			pieceIns = new Piece();
		}
		pieceIns.row = row;
		pieceIns.col = col;
		pieceIns.type = type;
		return pieceIns;
	}
	private _recyclePiece(pieceIns: Piece): void {
		pieceIns.parent?.removeChild(pieceIns);
		this._pieceList.push(pieceIns);
	}

	/** 切换玩家  */
	private _change(): void {
		if (this._isTurnToPc) {
		} else {
		}
		this._isTurnToPc = !this._isTurnToPc;
	}

	/**
	 * 落子点判断是否成功
	 * @param board 棋盘
	 * @param p 落子坐标 [ row, col ]
	 * @param type 落子类型
	 */
	private _checkWin(board: ETTTPiece[][], p: number[], type: ETTTPiece): void {
		const count = 0;
		const rows = board.length;
		const cols = board[0].length;
		const visits = ArrUtil.create(rows, cols);
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				// 没子，且遍历过了
				if (visits[row][col] || board[row][col]) {
					visits[row][col] = 1;
				}
			}
		}
	}
}
