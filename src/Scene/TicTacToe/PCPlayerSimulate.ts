import { ArrUtil } from '../../Utils/ArrUtil';
import EE from '../../Utils/EventUtil';
import { EMPTY, ETTTPiece, TTT_COMBO } from '../Model/BaseConstant';
import { GameEventType } from '../Model/EventType';
import { evaluateLine } from './Evaluate';
import GameModel from './GameModel';

/**
 * pc 玩家模拟
 */
export default class PCPlayerSimulate {
	/** pc 模拟玩家等级 */
	public level: string = 'easy';
	/** 着棋类型 */
	public pieceType: any;
	/** 步数记录 */
	public step: number;
	/** 思考深度 */
	public deep: number = 1;

	constructor(pieceType: any) {
		this.pieceType = pieceType;
		EE.on(GameEventType.GAME_OVER, this.onGameOver, this);
		EE.on(GameEventType.GAME_START, this.onGameStart, this);
		EE.on(GameEventType.ROUND_CHANGE, this.onRoundChange, this);
	}

	/**
	 * 【监听】游戏开始
	 */
	private onGameStart(): void {
		this.step = 0;
		console.log(`【${this.level}】电脑加入战局`);
		if (GameModel.isTurnToPc) {
			this.drawPiece();
		}
	}

	/**
	 * 【监听】游戏回合交互
	 */
	protected onRoundChange(): void {
		if (!GameModel.isTurnToPc) return;
		this.drawPiece();
	}

	protected drawPiece(): void {
		console.log(`========== 步数${this.step} ==========`);
		// const result = this.maxmin(GameModel.board, this.deep);
		const result = this.maxmin(GameModel.board, this.deep - this.step * 2);
		EE.emit(GameEventType.DRAW_PIECE, result);
		this.step++;
	}

	/**
	 * min-max 算法
	 * @param board
	 * @param deep
	 * @returns
	 */
	protected maxmin(board: any[][], deep: number = 1): any {
		const tempBoard = ArrUtil.clone(board);
		const rows = tempBoard.length;
		const cols = tempBoard[0].length;
		const score = ArrUtil.create(rows, cols, 0);
		let result = {
			row: -1,
			col: -1,
			score: -Infinity,
		};
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (tempBoard[i][j] !== EMPTY) continue;
				tempBoard[i][j] = this.pieceType;
				let boardScore = this.evaluateBoard(tempBoard, TTT_COMBO);
				if (result.score < boardScore) {
					result.score = boardScore;
					result.row = i;
					result.col = j;
				}
				score[i][j] = boardScore;
				// console.log(`【${i},${j}】局面评分： ${score[i][j]}`);
				tempBoard[i][j] = EMPTY;
			}
		}
		console.table(score);
		return result;
	}

	/**
	 * 【监听】游戏结束
	 */
	private onGameOver(): void {
		console.log('收到游戏结束报告');
	}

	/**
	 * 评价局面
	 * @param board
	 * @param maxCombo
	 * @returns
	 */
	protected evaluateBoard(board: any[][], maxCombo: number): number {
		let myScore = 0;
		let enemyScore = 0;
		const rows = board.length;
		const cols = board[0].length;
		let n = [];
		//【|】 垂直方向遍历
		// console.log('=====  垂直  =====');
		for (let col = 0; col < cols; col++) {
			for (let row = 0; row <= rows - maxCombo; row++) {
				for (let i = 0; i < maxCombo; i++) {
					n[i] = board[row + i][col];
				}
				myScore += evaluateLine(n, ETTTPiece.CROSS);
				enemyScore += evaluateLine(n, ETTTPiece.CIRCLE);
				// console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
			}
		}
		//【——】水平方向遍历
		// console.log('=====  水平  =====');
		n = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col <= cols - maxCombo; col++) {
				for (let i = 0; i < maxCombo; i++) {
					n[i] = board[row][col + i];
				}
				myScore += evaluateLine(n, ETTTPiece.CROSS);
				enemyScore += evaluateLine(n, ETTTPiece.CIRCLE);
				// console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
			}
		}

		//【\】 正对角方向遍历 左上 -> 右下
		// console.log('===== 正对角 =====');
		n = [];
		for (let row = 0; row <= rows - maxCombo; row++) {
			for (let col = 0; col <= cols - maxCombo; col++) {
				for (let i = 0; i < maxCombo; i++) {
					n[i] = board[row + i][col + i];
				}
				myScore += evaluateLine(n, ETTTPiece.CROSS);
				enemyScore += evaluateLine(n, ETTTPiece.CIRCLE);
				// console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
			}
		}

		//【/】反对角方向遍历 右上 -> 左下
		// console.log('===== 反对角 =====');
		n = [];
		for (let row = 0; row <= rows - maxCombo; row++) {
			for (let col = cols - 1; col >= maxCombo - 1; col--) {
				for (let i = 0; i < maxCombo; i++) {
					n[i] = board[row + i][col - i];
				}
				myScore += evaluateLine(n, ETTTPiece.CROSS);
				enemyScore += evaluateLine(n, ETTTPiece.CIRCLE);
				// console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
			}
		}

		return myScore - enemyScore;
	}

	/**
	 * 销毁
	 */
	public onDestroy(): void {
		EE.off(GameEventType.GAME_OVER, this.onGameOver, this);
		EE.off(GameEventType.GAME_START, this.onGameStart, this);
		EE.off(GameEventType.ROUND_CHANGE, this.onRoundChange, this);
	}
}
