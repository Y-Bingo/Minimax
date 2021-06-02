import GamePage from './GamePage';

/**
 * 井字棋场景
 */
export default class TiTacToeScene extends eui.UILayer {
	protected childrenCreated() {
        this.addChild( new GamePage() )
    }
}
