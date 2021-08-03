/**
 * 游戏事件定义
 */
export const enum GameEventType {
	/** 游戏开始 */
	GAME_START = 'game_start',
	/** 交换 */
	ROUND_CHANGE = 'round_change',
	/** 下子 */
	DRAW_PIECE = 'draw_piece',
	/** 游戏结束 */
	GAME_OVER = 'game_over',
}
