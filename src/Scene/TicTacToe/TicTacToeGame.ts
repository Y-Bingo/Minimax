import { ArrUtil } from '../../Utils/ArrUtil';
import EE from '../../Utils/EventUtil';
import { BeginPanel } from '../Common/BeginPage';
import { Piece } from '../Common/Piece';
import { ResultPanel } from '../Common/ResultPanel';
import { VsPanel } from '../Common/VsPanel';
import { EResultType, ETTTPiece, TTT_COL, TTT_COMBO, TTT_PIECE_CELL_HEIGHT, TTT_PIECE_CELL_WIDTH, TTT_ROW } from '../Model/BaseConstant';
import { GameEventType } from '../Model/EventType';
import { PcSimulate } from '../Model/GameConstant';
import { checkDraw, checkDrawWin } from './Evaluate';
import GameModel from './GameModel';
import PCPlayerSimulate from './PCPlayerSimulate';

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
	// 玩家
	private pcPlayer: PCPlayerSimulate;
	// 属性
	private _pieceArr: Piece[][] = []; // 棋子对象数组

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
		GameModel.init();
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
		this.resultPanel?.btnStart?.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResult, this);
		this.chessBoard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this);

		EE.on(GameEventType.DRAW_PIECE, this.onDrawPiece, this);
	}

	/** 初始化玩家 */
	private initPlayer(): void {
		const simulateCls = PcSimulate[GameModel.pcLevel];
		this.pcPlayer = new simulateCls(GameModel.pcPieceType);

		this.vsBar.setTarget(GameModel.pcLevel);
	}

	/** 开始 */
	private gameStart(): void {
		this.initPlayer();
		this.initData();
		this.beginPanel?.parent?.removeChild(this.beginPanel);
		this.resultPanel?.parent?.removeChild(this.resultPanel);
		while (this.chessBoard.numChildren) {
			this._recyclePiece(this.chessBoard.getChildAt(0) as Piece);
		}

		EE.emit(GameEventType.GAME_START);
	}

	/** 结束 */
	private gameEnd(result?: EResultType): void {
		if (!result) {
			result = GameModel.isTurnToPc ? EResultType.LOSE : EResultType.WIN;
		}

		this.resultPanel.setResult(result);
		this.topLayer.addChild(this.resultPanel);

		EE.emit(GameEventType.GAME_OVER);
		this.pcPlayer.onDestroy();
		this.pcPlayer = null;
	}

	/** 结算 */
	private onResult(): void {
		this.resultPanel?.parent?.removeChild(this.resultPanel);
		this.topLayer.addChild(this.beginPanel);
	}

	/** 用户交互 */
	private onGroupTouch(e: egret.TouchEvent): void {
		if (GameModel.isTurnToPc) return;

		const { localX, localY } = e;
		const row = Math.floor(localY / TTT_PIECE_CELL_WIDTH);
		const col = Math.floor(localX / TTT_PIECE_CELL_HEIGHT);
		if (this._pieceArr[row] && this._pieceArr[row][col]) {
			console.log(`【${row}, ${col}】:${this._pieceArr[row][col]}`);
			return;
		}

		const pieceType = GameModel.isTurnToPc ? ETTTPiece.CROSS : ETTTPiece.CIRCLE;
		this.onLayDown(row, col);
	}

	/** 下子 */
	private onDrawPiece(e: egret.Event): void {
		const result = e.data;
		this.onLayDown(result.row, result.col);
	}

	/** 下棋 */
	private onLayDown(row: number, col: number): void {
		const type = GameModel.isTurnToPc ? GameModel.pcPieceType : GameModel.playerPieceType;
		// 更新数据
		GameModel.board[row][col] = type;
		// 更新 UI
		const piece = this._createPiece(row, col, type);
		this._pieceArr[row][col] = piece;
		this.chessBoard.addChild(piece);
		// 检测局面
		// if (this._checkWin(GameModel.board, [row, col], type, TTT_COMBO)) {
		if (checkDrawWin(GameModel.board, [row, col], type, TTT_COMBO)) {
			// if (checkWin(GameModel.board, type, TTT_COMBO)) {
			this.gameEnd();
		} else if (checkDraw(GameModel.board, TTT_ROW, TTT_COL)) {
			this.gameEnd(EResultType.DRAW);
		} else {
			this._change();
		}
	}

	/** 切换玩家  */
	private _change(): void {
		GameModel.isTurnToPc = !GameModel.isTurnToPc;
		GameModel.totalStep++;
		EE.emit(GameEventType.ROUND_CHANGE);
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
