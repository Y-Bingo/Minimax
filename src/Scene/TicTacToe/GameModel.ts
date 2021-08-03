import { ArrUtil } from '../../Utils/ArrUtil';
import { EMPTY, TTT_COL, TTT_ROW } from '../Model/BaseConstant';

export default class GameModel {
	/** 棋盘数据 */
	static board: any[][] = [];
	/** 是否为 pc 操作 */
	static isTurnToPc: boolean;

	/**
	 *  初始化
	 */
	public static init(): void {
		GameModel.isTurnToPc = false;
		GameModel.board = ArrUtil.create(TTT_ROW, TTT_COL, EMPTY);
	}

	/**
	 * 重置
	 */
	public static reset(): void {}
}
