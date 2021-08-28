export type IRoseTree = { 
	attributes: {[key: string]: string};
	nodes: RoseTree[];
}

export class RoseTree {
	constructor(public attributes: {[key: string]: string}, public nodes: IRoseTree[]) {
	}
}

//Write a function that visits every node of a tree, and either modifies them or replaces them using the vistorFn
export function treemap(tree: IRoseTree, visitorFn: (x: IRoseTree) => IRoseTree): IRoseTree {
}