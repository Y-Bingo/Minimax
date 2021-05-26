import { Main } from './Main';

(window as any).Main = Main;

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
