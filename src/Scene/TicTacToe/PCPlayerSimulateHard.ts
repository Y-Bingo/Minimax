import { ArrUtil } from '../../Utils/ArrUtil';
import { EMPTY, TTT_COL, TTT_COMBO, TTT_ROW } from '../Model/BaseConstant';
import { EPcLevel } from '../Model/GameConstant';
import { checkDraw, checkWin } from './Evaluate';
import GameModel from './GameModel';
import PCPlayerSimulate from './PCPlayerSimulate';

/**
 * pc 玩家模拟
 */
export default class PCPlayerSimulateHard extends PCPlayerSimulate {
	/** pc 模拟玩家等级 */
	public level: EPcLevel = EPcLevel.HARD;
	/** 思考深度 */
	public deep: number = 8;

	/**
	 * @override
	 * @param board
	 * @param deep
	 * @returns
	 */
	protected maxmin(board: any[][], deep: number = 1): any {
		const tempBoard = ArrUtil.clone(board);
		const rows = tempBoard.length;
		const cols = tempBoard[0].length;
		const score = ArrUtil.create(rows, cols, 0);
		let alpha = -Infinity;
		let beta = Infinity;
		let result = {
			row: -1,
			col: -1,
			score: -Infinity,
		};
		console.time('开始评估局面：');
		let curScore = 0;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (board[i][j] !== EMPTY) continue;
				// console.log(`=========== （${i}，${j}） ===========`);
				board[i][j] = GameModel.pcPieceType;
				curScore = this.min(board, deep - 1, alpha, beta);
				// 这里就是 max
				// 更是 alpha 的值
				if (alpha < curScore) {
					alpha = curScore;
				}
				if (result.score < curScore) {
					result.score = curScore;
					result.row = i;
					result.col = j;
				}

				// if (result.score < curBoardScore) {
				// 	result.score = curBoardScore;
				// 	result.row = i;
				// 	result.col = j;
				// }
				board[i][j] = EMPTY;
				score[i][j] = curScore;
				// console.log(`【${i},${j}】局面评分： ${score[i][j]}`);
			}
		}
		// console.timeEnd('开始评估局面：');
		console.table(score);
		return result;
	}

	/**
	 * 寻找最大
	 * @param board
	 * @param deep
	 */
	private max(board: any[][], deep = 1, alpha = -Infinity, beta = Infinity): any {
		// 预测步数结束
		if (deep === 0) {
			return this.evaluateBoard(board, TTT_COMBO);
		}
		// 结束游戏
		if (checkWin(board, GameModel.playerPieceType, TTT_COMBO)) {
			return this.evaluateBoard(board, TTT_COMBO);
		}
		// 平局
		if (checkDraw(board, TTT_ROW, TTT_COL)) {
			return 0;
		}
		const rows = TTT_ROW;
		const cols = TTT_COL;
		let best = -Infinity;
		let curScore = 0;
		// console.log(`【max : ${deep}】 = (${alpha} , ${beta} )`);
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (board[i][j] !== EMPTY) continue;
				board[i][j] = GameModel.pcPieceType;
				curScore = this.min(board, deep - 1, alpha, beta);
				if (curScore > best) {
					best = curScore;
				}
				// 更是 alpha 的值
				if (alpha < curScore) {
					alpha = curScore;
				}
				board[i][j] = EMPTY;
				// 剪枝
				if (alpha > beta) {
					break;
				}
			}
		}
		return best;
	}

	/**
	 * 寻找最小
	 * @param board
	 * @param deep
	 */
	private min(board: any[][], deep = 1, alpha = -Infinity, beta = Infinity): any {
		// 预测步数结束
		if (deep === 0) {
			return this.evaluateBoard(board, TTT_COMBO);
		}
		// 结束游戏
		if (checkWin(board, GameModel.playerPieceType, TTT_COMBO)) {
			return this.evaluateBoard(board, TTT_COMBO);
		}
		// 平局
		if (checkDraw(board, TTT_ROW, TTT_COL)) {
			return 0;
		}
		const rows = TTT_ROW;
		const cols = TTT_COL;
		let best = Infinity;
		let curScore = 0;
		// console.log(`【min : ${deep}】 = (${alpha} , ${beta} )`);
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (board[i][j] !== EMPTY) continue;
				// 尝试使用 board
				board[i][j] = GameModel.playerPieceType;
				curScore = this.max(board, deep - 1, alpha, beta);
				if (curScore < best) {
					best = curScore;
				}
				// 更新 beta 值
				if (curScore < beta) {
					beta = curScore;
				}
				board[i][j] = EMPTY;
				// 剪枝
				if (alpha > beta) {
					break;
				}
			}
		}
		return best;
	}
}
