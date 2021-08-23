/**
 * 胜负类型
 */
export enum EResultType {
	/** 输 */
	LOSE = 'lose',
	/** 赢 */
	WIN = 'win',
	/** 平局 */
	DRAW = 'draw',
}

/** 空 定义 */
export const EMPTY = '0';

/**
 * 井字棋 棋类枚举
 */
export enum ETTTPiece {
	EMPTY = '0', // 空

	CROSS = 'x', // 叉

	CIRCLE = 'o', // 圆
}
/** 最大列数 */
export const TTT_COL = 3;
/** 最大行数 */
export const TTT_ROW = 3;
/** 连击 combo 数 */
export const TTT_COMBO = 3;
/** 每格棋子的宽度 */
export const TTT_PIECE_CELL_WIDTH = 180;
/** 每格棋子的高度 */
export const TTT_PIECE_CELL_HEIGHT = 180;

/** 遍历顺序 */
export const D = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
];

