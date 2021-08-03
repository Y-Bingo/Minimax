export default class EE {
	/**
	 * 事件通知载体
	 */
	private static postMan: egret.Sprite = new egret.Sprite();

	public static init(): void {}

	/**
	 * @description: 事件监听，需主动移除
	 * @param {type} 事件类型，定义在 EventType.ts 里
	 * @param {listener} 监听函数
	 * @param {thisObject} 作用域
	 * @param {scene} 该事件对应的场景，当场景移除后，该事件自动解绑
	 * @param {useCapture} 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。设置为 true，则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。设置为 false，则侦听器只在冒泡阶段处理事件
	 * @param {priority} 事件侦听器的优先级，数字越大，优先级越高
	 */
	public static on(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
		EE.postMan?.addEventListener(type, listener, thisObject, useCapture, priority);
	}

	/**
	 * @description: 单次事件监听，监听后自动解除
	 * @param {type} 事件类型，定义在 EventType.ts 里
	 * @param {listener} 监听函数
	 * @param {thisObject} 作用域
	 * @param {useCapture} 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。设置为 true，则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。设置为 false，则侦听器只在冒泡阶段处理事件
	 * @param {priority} 事件侦听器的优先级，数字越大，优先级越高
	 */
	public static once = (type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) => {
		EE.postMan.once(type, listener, thisObject, useCapture, priority);
	};

	/**
	 * @description: 解除事件监听
	 * @param {type} 事件类型，定义在 EventType.ts 里
	 * @param {listener} 监听函数
	 * @param {thisObject} 作用域
	 * @param {useCapture} 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。设置为 true，则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。设置为 false，则侦听器只在冒泡阶段处理事件
	 */
	public static off = (type: string, listener: Function, thisObject: any, useCapture?: boolean) => {
		EE.postMan.removeEventListener(type, listener, thisObject, useCapture);
	};

	/**
	 * @description: 派发事件
	 * @param {type} 事件类型，定义在 EventType.ts 里
	 * @param {data} 携带的数据
	 * @param {bubbles} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false
	 * @param {cancelable} 确定是否可以取消 Event 对象。默认值为 false。
	 */
	public static emit = (type: string, data?: any, bubbles?: boolean, cancelable?: boolean) => {
		EE.postMan.dispatchEventWith(type, bubbles, data, cancelable);
	};
}
