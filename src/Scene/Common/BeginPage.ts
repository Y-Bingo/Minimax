import { EPcLevel, PCAvatar, PCName } from '../Model/GameConstant';
import GameModel from '../TicTacToe/GameModel';
import { Avatar } from './Avatar';

/**
 * 开始面板
 */
export class BeginPanel extends eui.Component {
	// 皮肤
	public skinName: any = skins.BeginPage;
	// 组件
	public gpAvatar: eui.Group;
	public avatar_pc_0: Avatar;
	public avatar_pc_1: Avatar;
	public avatar_pc_2: Avatar;
	public btnStart: eui.Button;
	public rbFirst: eui.RadioButton;
	public rbPost: eui.RadioButton;
	public iconVs: eui.Image;

	/**
	 * @override
	 */
	protected childrenCreated() {
		this.avatar_pc_0.pcLevel = EPcLevel.EASY;
		this.avatar_pc_1.pcLevel = EPcLevel.NORMAL;
		this.avatar_pc_2.pcLevel = EPcLevel.HARD;
		this.avatar_pc_0.avatarName = PCName[this.avatar_pc_0.pcLevel];
		this.avatar_pc_1.avatarName = PCName[this.avatar_pc_1.pcLevel];
		this.avatar_pc_2.avatarName = PCName[this.avatar_pc_2.pcLevel];
		this.avatar_pc_0.avatar = PCAvatar[this.avatar_pc_0.pcLevel];
		this.avatar_pc_1.avatar = PCAvatar[this.avatar_pc_1.pcLevel];
		this.avatar_pc_2.avatar = PCAvatar[this.avatar_pc_2.pcLevel];
		this.validateNow();
		this.gpAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAvatarChange, this);
		this.rbFirst.addEventListener(eui.UIEvent.CHANGE, this.onRadioChange, this);
		this.rbPost.addEventListener(eui.UIEvent.CHANGE, this.onRadioChange, this);
		this.setDefault();
	}

	/** 设置默认 */
	private setDefault(): void {
		if (!GameModel.isTurnToPc) {
			this.rbFirst.selected = true;
		} else {
			this.rbPost.selected = true;
		}

		let target = null;
		switch (GameModel.pcLevel) {
			case EPcLevel.EASY:
				target = this.avatar_pc_0;
				break;
			case EPcLevel.NORMAL:
				target = this.avatar_pc_1;
				break;
			case EPcLevel.HARD:
				target = this.avatar_pc_2;
				break;
		}
		this.iconVs.x = target.x + target.width / 2 - 10;
	}

	/** 对手改变 */
	private onAvatarChange(e: eui.UIEvent): void {
		const target = e.target;
		this.iconVs.x = target.x + target.width / 2 - 10;
		GameModel.pcLevel = e.target.pcLevel;
	}

	/** 先手改变 */
	private onRadioChange(e: eui.UIEvent): void {
		switch (e.target.value) {
			case 'first':
				GameModel.isTurnToPc = false;
				break;
			case 'post':
				GameModel.isTurnToPc = true;
				break;
			default:
				break;
		}
	}
}
