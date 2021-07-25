/**
 * 数组工具
 */
export class ArrUtil {
	/**
	 * 克隆数组元素
	 * @param arr
	 * @returns
	 */
	public static clone<T>(arr: T[]): T[] {
		const temp = [];
		for (let i = arr.length - 1; i >= 0; i--) {
			temp[i] = JSON.parse(JSON.stringify(arr[i]));
		}
		return temp;
	}

	/**
	 * 创建临时数组
	 * @param cols
	 * @param rows
	 */
	public static create<T extends any>(rows: number, cols: number, val: any = 0): T[] {
		const temp = [];
		for (let row = rows - 1; row >= 0; row--) {
			temp[row] = [];
			for (let col = cols - 1; col >= 0; col--) {
				temp[row][col] = val;
			}
		}
		return temp;
	}
}
