import { ArrUtil } from '../../Utils/ArrUtil';
import { EMPTY, ETTTPiece, TTT_COL, TTT_ROW } from '../Model/BaseConstant';
import { EPcLevel } from '../Model/GameConstant';

export default class GameModel {
	/** 棋盘数据 */
	static board: any[][] = [];
	/** 是否为 pc 操作 */
	static isTurnToPc: boolean = true;
	/** 电脑棋子类型 */
	static pcPieceType: any = ETTTPiece.CROSS;
	/** 玩家棋子类型 */
	static playerPieceType: any = ETTTPiece.CIRCLE;
	/** 对手 */
	static pcLevel: EPcLevel = 1;
	/** 总步数 */
	static totalStep: number = 0;

	/**
	 *  初始化
	 */
	public static init(): void {
		GameModel.totalStep = 1;
		GameModel.board = ArrUtil.create(TTT_ROW, TTT_COL, EMPTY);
	}

	/**
	 * 重置
	 */
	public static reset(): void {}
}
