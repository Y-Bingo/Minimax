import { EPcLevel, PCAvatar, PCName } from '../Model/GameConstant';
import { Avatar } from './Avatar';

/**
 * vs 面板
 */
export class VsPanel extends eui.Component {
	// 皮肤
	public skinName: any = skins.VSPanel;
	// 组件
	public avatar_pc: Avatar;
	public avatar_player: Avatar;
	// 属性

	/**
	 * @override
	 */
	protected childrenCreated() {
		this.avatar_player.avatarName = 'Player';
		this.avatar_player.avatar = 'avatar_player_png';
	}

	/** 设置对手 */
	public setTarget(level: EPcLevel) {
		this.avatar_pc.avatarName = PCName[level];
		this.avatar_pc.avatar = PCAvatar[level];
	}

	/** 胜者 */
	public setWinner(isPcWin: boolean): void {
		if (isPcWin) {
			this.avatar_player.isWinner = true;
		} else {
			this.avatar_player.isWinner = true;
		}
	}

	/** 重置 */
	public reset(): void {
		this.avatar_pc.isWinner = false;
		this.avatar_player.isWinner = false;
	}
}
