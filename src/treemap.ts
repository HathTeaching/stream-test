export type IRoseTree = { 
	attributes: {[key: string]: string};
	nodes: RoseTree[];
}

export class RoseTree {
	constructor(public attributes: {[key: string]: string}, public nodes: IRoseTree[]) {
	}
}

export function treemap(node: IRoseTree, fn: (x: IRoseTree) => IRoseTree): IRoseTree {

}