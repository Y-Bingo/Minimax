import { ArrUtil } from '../../Utils/ArrUtil';
import { BeginPanel } from '../Common/BeginPage';
import { Piece } from '../Common/Piece';
import { ResultPanel } from '../Common/ResultPanel';
import { VsPanel } from '../Common/VsPanel';
import { EResultType, ETTTPiece, TTT_COL, TTT_COMBO, TTT_PIECE_CELL_HEIGHT, TTT_PIECE_CELL_WIDTH, TTT_ROW } from '../Model/BaseConstant';
import { evaluateBoard } from './Score';

/**
 * 井字棋
 */
export default class TicTacToeGame extends eui.Component {
	// 皮肤
	public skinName: any = skins.TTT.GameScene;
	// 组件
	private bg: eui.Image;
	private vsBar: VsPanel;
	private topLayer: eui.Group;
	private chessBoard: eui.Group;
	private beginPanel: BeginPanel;
	private resultPanel: ResultPanel;
	// 属性
	private _board: ETTTPiece[][]; // 棋盘数据
	private _pieceArr: Piece[][] = []; // 棋子对象数组
	private _isTurnToPc: boolean = false; // 回合标记

	/**
	 * @override
	 * 节点创建完成
	 */
	protected childrenCreated() {
		this.initUI();
		this.initEvent();
	}

	/** 初始化数据 */
	private initData(): void {
		// 初始化棋盘数据
		this._isTurnToPc = false;
		this._board = ArrUtil.create(TTT_ROW, TTT_COL, ETTTPiece.EMPTY) as any;
		this._pieceArr = ArrUtil.create(TTT_ROW, TTT_COL, null);
	}

	/** 初始化UI */
	private initUI(): void {
		this.resultPanel = new ResultPanel();
		this.beginPanel = new BeginPanel();
		this.topLayer.addChild(this.beginPanel);
	}

	/** 初始化事件 */
	private initEvent(): void {
		this.beginPanel?.btnStart?.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
		this.resultPanel?.btnStart?.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
		this.chessBoard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this);
	}

	/** 开始 */
	private gameStart(): void {
		this.initData();
		this.beginPanel?.parent?.removeChild(this.beginPanel);
		this.resultPanel?.parent?.removeChild(this.resultPanel);
		while (this.chessBoard.numChildren) {
			this._recyclePiece(this.chessBoard.getChildAt(0) as Piece);
		}
	}

	/** 结束 */
	private gameEnd(result: EResultType): void {
		this.resultPanel.setResult(result);
		this.topLayer.addChild(this.resultPanel);
	}

	/** 用户交互 */
	private onGroupTouch(e: egret.TouchEvent): void {
		const { localX, localY } = e;
		const row = Math.floor(localY / TTT_PIECE_CELL_WIDTH);
		const col = Math.floor(localX / TTT_PIECE_CELL_HEIGHT);
		if (this._pieceArr[row] && this._pieceArr[row][col]) {
			console.log(`【${row}, ${col}】:${this._pieceArr[row][col]}`);
			return;
		}
		const pieceType = this._isTurnToPc ? ETTTPiece.CIRCLE : ETTTPiece.CROSS;
		const piece = this._createPiece(row, col, pieceType);
		this._board[row][col] = pieceType;
		this._pieceArr[row][col] = piece;
		this.chessBoard.addChild(piece);

		console.log('局面评分：', evaluateBoard(this._board, ETTTPiece.CIRCLE, TTT_COMBO));
		if (this._checkWin(this._board, [row, col], pieceType, TTT_COMBO)) {
			this.gameEnd(this._isTurnToPc ? EResultType.LOSE : EResultType.WIN);
		} else if (this.checkDraw(this._board, TTT_ROW, TTT_COL)) {
			this.gameEnd(EResultType.DRAW);
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
	 * 检查是否为和局
	 */
	private checkDraw(board: ETTTPiece[][], maxRows: number, maxCols: number): boolean {
		let count = maxRows * maxCols;
		for (let i = board.length - 1; i >= 0; i--) {
			for (let j = board[i].length - 1; j >= 0; j--) {
				if (board[i][j] !== ETTTPiece.EMPTY) count--;
			}
		}
		return count === 0;
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
		if (!pieceIns) return;
		pieceIns.parent?.removeChild(pieceIns);
		this._pieceList.push(pieceIns);
	}
}
