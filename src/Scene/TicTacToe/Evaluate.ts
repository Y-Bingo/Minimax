import { EMPTY } from '../Model/BaseConstant';

const SCORE_TABLE = {
	'000': 1,
	'100': 10,
	'110': 100,
	'111': 1000,
};

/**
 * 评分系数
 */
export enum EScoreTable {
	NONE = 0,
	ONE = 1,
	TWO = 11,
	THREE = 20,
	BLOCK = -5,
}

export function countToScore(count: number, block: number, empty?: number): number {
	if (block > 0) return EScoreTable.BLOCK;
	switch (count) {
		case 1:
			return EScoreTable.ONE;
		case 2:
			return EScoreTable.TWO;
		case 3:
			return EScoreTable.THREE;
	}
	return EScoreTable.NONE;
}

/**
 *
 * @param n
 */
export function evaluateLine(n: any[], type: any): number {
	let count = 0;
	let block = 0;
	let empty = 0;
	for (let i = 0; i < n.length; i++) {
		if (n[i] === '0') {
			empty++;
		} else if (n[i] === type) {
			count++;
		} else {
			block++;
		}
	}
	return countToScore(count, block, empty);
}

/**
 * 评价棋盘
 * @param board
 * @param type
 * @param maxCombo
 * @returns
 */
export function evaluateBoard(board: any[][], type: any, maxCombo: number): number {
	let score = 0;
	const rows = board.length;
	const cols = board[0].length;
	const n = [];
	//【|】 垂直方向遍历
	console.log('=====  垂直  =====');
	for (let col = 0; col < cols; col++) {
		for (let row = 0; row <= rows - maxCombo; row++) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row + i][col];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}
	//【——】水平方向遍历
	console.log('=====  水平  =====');
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col <= cols - maxCombo; col++) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row][col + i];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}

	//【\】 正对角方向遍历 左上 -> 右下
	console.log('===== 正对角 =====');
	for (let row = 0; row <= rows - maxCombo; row++) {
		for (let col = 0; col <= cols - maxCombo; col++) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row + i][col + i];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}

	//【/】反对角方向遍历 右上 -> 左下
	console.log('===== 反对角 =====');
	for (let row = 0; row <= rows - maxCombo; row++) {
		for (let col = cols - 1; col >= maxCombo - 1; col--) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row - i][col - i];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}

	return score;
}

/**
 * 落子点判断是否成功
 * @param board 棋盘
 * @param p 落子坐标 [ row, col ]
 * @param type 落子类型
 */
export function checkDrawWin(board: any[][], p: number[], type: any, max: number): boolean {
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

/**
 * 棋盘判断是否结束成功
 * @param board 棋盘
 * @param p 落子坐标 [ row, col ]
 * @param type 落子类型
 */
export function checkWin(board: any[][], type: any, maxCombo: number): boolean {
	let count = 0;
	const rows = board.length;
	const cols = board[0].length;

	// 垂直方向遍历
	count = 0;
	//【|】 垂直方向遍历
	for (let col = 0; col < cols; col++) {
		for (let row = 0; row <= rows - maxCombo; row++) {
			for (let i = 0; i < maxCombo; i++) {
				if (board[row + i][col] === type) {
					count++;
				}
			}
			if (count >= maxCombo) return true;
			count = 0;
		}
	}
	//【——】水平方向遍历
	count = 0;
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col <= cols - maxCombo; col++) {
			for (let i = 0; i < maxCombo; i++) {
				if (board[row][col + i] === type) {
					count++;
				}
			}
			if (count >= maxCombo) return true;
			count = 0;
		}
	}

	//【\】 正对角方向遍历 左上 -> 右下
	count = 0;
	for (let row = 0; row <= rows - maxCombo; row++) {
		for (let col = 0; col <= cols - maxCombo; col++) {
			for (let i = 0; i < maxCombo; i++) {
				if (board[row + i][col + i] === type) {
					count++;
				}
			}
			if (count >= maxCombo) return true;
			count = 0;
		}
	}

	//【/】反对角方向遍历 右上 -> 左下
	count = 0;
	for (let row = 0; row <= rows - maxCombo; row++) {
		for (let col = cols - 1; col >= maxCombo - 1; col--) {
			for (let i = 0; i < maxCombo; i++) {
				if (board[row + i][col - i] === type) {
					count++;
				}
			}
			if (count >= maxCombo) return true;
			count = 0;
		}
	}

	return false;
}

/**
 * 检查是否为和局
 */
export function checkDraw(board: any[][], maxRows: number, maxCols: number): boolean {
	let count = maxRows * maxCols;
	for (let i = board.length - 1; i >= 0; i--) {
		for (let j = board[i].length - 1; j >= 0; j--) {
			if (board[i][j] !== EMPTY) count--;
		}
	}
	return count === 0;
}
