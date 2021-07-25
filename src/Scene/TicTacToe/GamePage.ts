import { ArrUtil } from '../../Core/Arr';
import { Piece } from '../Common/Piece';
import { VsPanel } from '../Common/VsPanel';
import { ETTTPiece, TTT_COL, TTT_COMBO, TTT_PIECE_CELL_HEIGHT, TTT_PIECE_CELL_WIDTH, TTT_ROW } from '../Model/BaseConstant';

/**
 * 井字棋
 */
export default class GamePage extends eui.Component {
	// 皮肤
	public skinName: any = skins.TTT.GameScene;
	// 组件
	private bg: eui.Image;
	private vsBar: VsPanel;
	private chessBoard: eui.Group;
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
		for (let i = TTT_ROW; i >= 0; i--) {
			this._pieceArr[i] = [];
			for (let j = TTT_ROW; j >= 0; j--) {
				this._recyclePiece(this._createPiece(i, j));
			}
		}
		this._board = ArrUtil.create(TTT_ROW, TTT_COL) as any;

		// 事件监听
		this.chessBoard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this);
	}

	private onGroupTouch(e: egret.TouchEvent): void {
		const { localX, localY } = e;
		const row = Math.floor(localY / TTT_PIECE_CELL_WIDTH);
		const col = Math.floor(localX / TTT_PIECE_CELL_HEIGHT);
		if (this._pieceArr[row] && this._pieceArr[row][col]) {
			console.log('已经有棋子了');
			return;
		}
		const pieceType = this._isTurnToPc ? ETTTPiece.CIRCLE : ETTTPiece.CROSS;
		const piece = this._createPiece(row, col, pieceType);
		this._board[row][col] = pieceType;
		this._pieceArr[row][col] = piece;
		this.chessBoard.addChild(piece);
		if (this._checkWin(this._board, [row, col], pieceType, TTT_COMBO)) {
			console.log(`【游戏结束】：${this._isTurnToPc ? 'PC' : 'Player'} 胜利`);
		} else {
			this._change();
		}
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
	private _checkWin(board: ETTTPiece[][], p: number[], type: ETTTPiece, max: number): boolean {
		let count = 0;
		const rows = board.length;
		const cols = board[0].length;

		// 垂直方向遍历
		count = 1;
		for (let i = 1; i < max; i++) {
			if (p[0] - i >= 0 && board[p[0] - i][p[1]] === type) {
				count++;
			}
			if (p[0] + i < rows && board[p[0] + i][p[1]] === type) {
				count++;
			}
		}
		if (count >= max) return true;

		// 水平方向遍历
		count = 1;
		for (let i = 1; i < max; i++) {
			if (p[1] - i >= 0 && board[p[0]][p[1] - i] === type) {
				count++;
			}
			if (p[1] + i < cols && board[p[0]][p[1] + i] === type) {
				count++;
			}
		}
		if (count >= max) return true;

		// 正对角方向遍历 左上 -> 右下
		count = 1;
		for (let i = 1; i < max; i++) {
			if (p[0] - i >= 0 && p[1] - i >= 0 && board[p[0] - i][p[1] - i] === type) {
				count++;
			}
			if (p[0] + i < rows && p[1] + i < cols && board[p[0] + i][p[1] + i] === type) {
				count++;
			}
		}
		if (count >= max) return true;

		// 反对角方向遍历 右上 -> 左下
		count = 1;
		for (let i = 1; i < max; i++) {
			if (p[0] - i >= 0 && p[1] + i < cols && board[p[0] - i][p[1] + i] === type) {
				count++;
			}
			if (p[0] + i < rows && p[1] - i >= 0 && board[p[0] + i][p[1] - i] === type) {
				count++;
			}
		}
		if (count >= max) return true;

		return false;
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
}
