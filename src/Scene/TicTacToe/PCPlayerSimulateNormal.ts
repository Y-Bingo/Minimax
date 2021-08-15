import { ArrUtil } from '../../Utils/ArrUtil';
import { EMPTY, TTT_COL, TTT_COMBO, TTT_ROW } from '../Model/BaseConstant';
import { checkDraw, checkWin } from './Evaluate';
import GameModel from './GameModel';
import PCPlayerSimulate from './PCPlayerSimulate';

/**
 * pc 玩家模拟
 */
export default class PCPlayerSimulateNormal extends PCPlayerSimulate {
	/** pc 模拟玩家等级 */
	public level: string = 'normal';
	/** 思考深度 */
	public deep: number = 6;

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
		let result = {
			row: -1,
			col: -1,
			score: -Infinity,
		};

		let curBoardScore = 0;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (board[i][j] !== EMPTY) continue;
				board[i][j] = GameModel.pcPieceType;
				curBoardScore = this.min(board, deep - 1);
				// 这里就是 max
				if (result.score < curBoardScore) {
					result.score = curBoardScore;
					result.row = i;
					result.col = j;
				}
				board[i][j] = EMPTY;
				score[i][j] = curBoardScore;
				console.log(`【${i},${j}】局面评分： ${score[i][j]}`);
			}
		}
		console.table(score);
		return result;
	}

	/**
	 * 寻找最大
	 * @param board
	 * @param deep
	 */
	private max(board: any[][], deep: number = 1): any {
		let score = -Infinity;
		if (deep === 0 || checkWin(board, GameModel.playerPieceType, TTT_COMBO) || checkDraw(GameModel.board, TTT_ROW, TTT_COL)) {
			score = this.evaluateBoard(board, TTT_COMBO);
			// console.log(`max ${deep} ${score}`);
			return score;
		}
		const rows = TTT_ROW;
		const cols = TTT_COL;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (board[i][j] !== EMPTY) continue;
				board[i][j] = GameModel.pcPieceType;
				let curScore = this.min(board, deep - 1);
				if (score < curScore) {
					score = curScore;
				}
				board[i][j] = EMPTY;
			}
		}
		return score;
	}

	/**
	 * 寻找最小
	 * @param board
	 * @param deep
	 */
	private min(board: any[][], deep: number = 1): any {
		let score = Infinity;
		if (deep === 0 || checkWin(board, GameModel.pcPieceType, TTT_COMBO) || checkDraw(GameModel.board, TTT_ROW, TTT_COL)) {
			score = this.evaluateBoard(board, TTT_COMBO);
			// console.log(`min ${deep} ${score}`);
			return score;
		}
		const rows = TTT_ROW;
		const cols = TTT_COL;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (board[i][j] !== EMPTY) continue;
				// 尝试使用 board
				board[i][j] = GameModel.playerPieceType;
				// score = Math.min(score, this.max(board, deep - 1));
				let curScore = this.max(board, deep - 1);
				if (score > curScore) {
					score = curScore;
				}
				board[i][j] = EMPTY;
			}
		}
		return score;
	}
}
