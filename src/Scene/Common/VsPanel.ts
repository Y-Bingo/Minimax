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
		this.avatar_pc.avatarName = 'PC';
		this.avatar_pc.avatar = 'avatar_pc_png';
		this.avatar_player.avatarName = 'Player';
		this.avatar_player.avatar = 'avatar_player_png';
	}

	public setWinner(): void {}
}
