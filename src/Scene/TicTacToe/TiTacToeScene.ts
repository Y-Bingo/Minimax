import BeginPage from './BeginPage';

/**
 * 井字棋场景
 */
export default class TiTacToeScene extends eui.UILayer {
	protected childrenCreated() {
        this.addChild( new BeginPage() )
    }
}
