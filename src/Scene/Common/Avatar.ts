/**
 * 公共头像组件
 */
export class Avatar extends eui.Component {
	// 皮肤
	public skinName: any = skins.Avatar;
	// 组件
	private txt_name: eui.Label;
	private img_avatar: eui.Image;
	private img_avatar_mask: eui.Image;
	private img_avatar_border: eui.Image;
	private img_winner_banner: eui.Image;
	// 属性
	private _name: string = ''; // 玩家
	private _avatar: string = ''; // 头像
	private _isWinner: boolean = null; // 胜者

	/**
	 * @override
	 * 初始化对象
	 */
	protected childrenCreated(): void {
		// 初始化组件
		this.img_avatar.mask = this.img_avatar_mask;
		// 初始化属性
		this.isWinner = false;
	}

	/**
	 * 名字
	 */
	get avatarName(): string {
		return this._name;
	}
	set avatarName(name: string) {
		if (this._name === name) return;
		this._name = name;
		this._updateName();
	}
	private _updateName() {
		this.txt_name.text = this._name;
	}

	/**
	 * 设置头像
	 */
	get avatar() {
		return this._avatar;
	}
	set avatar(source: string) {
		if (this._avatar === source) return;
		this._avatar = source;
		this._updateAvatar();
	}
	private _updateAvatar(): void {
		this.img_avatar.source = this._avatar;
	}

	/**
	 * 是否为胜者
	 */
	get isWinner(): boolean {
		return this._isWinner;
	}
	set isWinner(isWinner: boolean) {
		if (this._isWinner === isWinner) return;
		this._isWinner = isWinner;
		this._updateWinner();
	}
	private _updateWinner(): void {
		this.img_winner_banner.visible = this._isWinner;
	}

	/**
	 * UI 重置
	 */
	public reset(): void {
		this.isWinner = false;
	}
}
