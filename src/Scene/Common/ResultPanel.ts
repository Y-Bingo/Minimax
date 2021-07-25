import { EResultType } from '../Model/BaseConstant';

/**
 * 结果面板
 */
export class ResultPanel extends eui.Component {
	// 皮肤
	public skinName: any = skins.ResultPanel;
	// 组件
	public imgResult: eui.Image; // 结果
	public btnStart: eui.Image; // 开始按钮
	// 属性

	/**
	 *
	 * @param resultType 结果类型
	 */
	public setResult(resultType: EResultType): void {
		this.imgResult.source = `result_${resultType}_png`;
	}
}
