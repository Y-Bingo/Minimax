/**
 * 开始页面
 */
export class BeginPage extends eui.Component {
	// 皮肤
	public skinName: any = skins.BeginPage;
	// 组件
	public btn_start: eui.Button;

	/**
	 * @override
	 */
	protected childrenCreated() {
		this.btn_start.addEventListener(
			egret.TouchEvent.TOUCH_TAP,
			this._onClickStart,
			this,
		);
	}

	/** 响应开始点击事件 */
	private _onClickStart(): void {
		this.parent?.removeChild(this);
	}
}
