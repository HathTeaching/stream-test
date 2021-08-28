import {IRoseTree, RoseTree, treemap} from '../src/treemap';
import expect from 'chai';
import _ from 'underscore';
import fc from 'fast-check';
import { smallTreeGen, flatten } from './EdgeList';

describe("treemap", () => {
	it("should change all nodes", () => {
		fc.assert(
			fc.property(smallTreeGen, ([tree, sizeMinusTwo]) => {
				treemap(tree, (treeNode) => {
					treeNode.attributes.id = sizeMinusTwo.toString();
					return treeNode;
				})
				return flatten(tree).every(node => node.attributes.id == sizeMinusTwo.toString());
			})
		)
	})

	it("should replace nodes", () => {
		fc.assert(
			fc.property(smallTreeGen, ([tree, sizeMinusTwo]) => {
				function copyTree(treeNode: IRoseTree): IRoseTree {
					return new RoseTree(Object.assign({}, treeNode.attributes), treeNode.nodes.slice());
				}
				let result = flatten(treemap(tree, copyTree));
				return flatten(tree).every((node, index) => _.isEqual(result[index].attributes, node.attributes) && !(result[index] == node))
			})
		)
	})
})