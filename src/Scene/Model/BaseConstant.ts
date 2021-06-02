/**
 * 井字棋 枚举
 */
export enum ETTTPiece {
	CROSS = 1, // 叉

	CIRCLE = 2, // 圆
}

export const TTT_COL = 3;
export const TTT_ROW = 3;
export const TTT_PIECE_CELL_WIDTH = 180;
export const TTT_PIECE_CELL_HEIGHT = 180;

/** 遍历顺序 */
export const D = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
];
