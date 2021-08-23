import PCPlayerSimulate from '../TicTacToe/PCPlayerSimulate';
import PCPlayerSimulateHard from '../TicTacToe/PCPlayerSimulateHard';
import PCPlayerSimulateNormal from '../TicTacToe/PCPlayerSimulateNormal';

/**
 * PC 难度
 */
export enum EPcLevel {
	EASY = 1,
	NORMAL = 2,
	HARD = 3,
}

/** pc */
export const PCName = {
	[EPcLevel.EASY]: 'PC_1',
	[EPcLevel.NORMAL]: 'PC_2',
	[EPcLevel.HARD]: 'PC_3',
};

/** 头像 */
export const PCAvatar = {
	[EPcLevel.EASY]: 'avatar_pc_1_png',
	[EPcLevel.NORMAL]: 'avatar_pc_2_png',
	[EPcLevel.HARD]: 'avatar_pc_3_png',
};

export const PcSimulate = {
	[EPcLevel.EASY]: PCPlayerSimulate,
	[EPcLevel.NORMAL]: PCPlayerSimulateNormal,
	[EPcLevel.HARD]: PCPlayerSimulateHard,
};
