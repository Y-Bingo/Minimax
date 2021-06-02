import { Main } from './Main';
import { Avatar } from './Scene/Common/Avatar';
import { BeginPage } from './Scene/Common/BeginPage';
import { VsPanel } from './Scene/Common/VsPanel';

(window as any).Main = Main;
(window as any).Avatar = Avatar;
(window as any).VsPanel = VsPanel;
(window as any).BeginPage = BeginPage;
/**
 * egret 项目启动
 */
egret.runEgret({
	renderMode: 'webgl',
	audioType: 0,
	calculateCanvasScaleFactor: function (context: any) {
		const backingStore =
			context.backingStorePixelRatio ||
			context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio ||
			1;
		return (window.devicePixelRatio || 1) / backingStore;
	},
});
