import { RoseTree, IRoseTree } from '../src/treemap';
import { array, integer, Arbitrary } from 'fast-check';


export interface EdgeList {
	[node: string]: number[];
}

export function EdgeListToTree(el: EdgeList): IRoseTree {
	const nodes: IRoseTree[] = Object.keys(el).map(index => ({ attributes: {id: index}, nodes: [] }));
	const tree: IRoseTree = nodes[0];
	for (let i = 0; i < nodes.length; i++) {
		for (const index of el[i]) {
			nodes[i].nodes.push(nodes[index]);
		}
	}
	let root = nodes[0];
	//console.log(JSON.stringify(root));
	return root;
}

export function edgesToEdgeList(edges: [number, number][]): EdgeList {
	const result: EdgeList = {};
	for (const edge of edges) {
		if (edge[0] in result) {
			result[edge[0]].push(edge[1]);
		} else {
			result[edge[0]] = [edge[1]];
		}

		if (!(edge[1] in result)) {
			result[edge[1]] = [];
		}
	}
	return result;
}

export function pruferToEdges(pruferSequence: number[]): [number, number][] {
	const result: [number, number][] = [];
	const degree = pruferSequence.map(() => 1).concat([1, 1]);
	const length = pruferSequence.length;
	for (const node of pruferSequence) {
		degree[node - 1] += 1;
	}
	for (const i of pruferSequence) {
		for (let j = 0; j < degree.length; j++) {
			if (degree[j] === 1) {
				result.push([i - 1, j]);
				degree[i - 1] -= 1;
				degree[j] -= 1;
				break;
			}
		}
	}
	let u = 0, v = 0;
	for (let j = 0; j < degree.length; j++) {
		if (degree[j] === 1) {
			if (u === 0) {
				u = j;
			} else {
				v = j;
			}
		}
	}
	result.push([u, v]);
	result.sort((a, b) => a[0] - b[0]);
	return result;
}

export const smallTreeGen: Arbitrary<[IRoseTree, number]> = integer(1, 10)
	.chain(num => array(integer(1, num), {minLength: num, maxLength: num}))
	.map((pruferSequence): [IRoseTree, number] => {
		return [EdgeListToTree(edgesToEdgeList(pruferToEdges(pruferSequence))), pruferSequence.length];
	});

export const treeGen: Arbitrary<[IRoseTree, number]> = integer(1, 100)
	.chain(num => array(integer(1, num), {minLength: num, maxLength: num}))
	.map((pruferSequence): [IRoseTree, number] => {
		return [EdgeListToTree(edgesToEdgeList(pruferToEdges(pruferSequence))), pruferSequence.length];
	});


export function flatten(node: IRoseTree): IRoseTree[] {
	return [node].concat(node.nodes.flatMap(flatten));
}