import {IRoseTree, RoseTree, treemap} from '../src/treemap';
import expect from 'chai';
import _ from 'underscore';
import fc from 'fast-check';
import { smallTreeGen, flatten } from './EdgeList';



describe("treemap", () => {
	it("should change all nodes", () => {
		fc.assert(
			fc.property(smallTreeGen, ([tree, sizeMinusTwo]) => {
				treemap(tree,(node) => {
					node.attributes.id = sizeMinusTwo.toString();
					return node;
				})
				return flatten(tree).every(node => node.attributes.id == sizeMinusTwo.toString());
			})
		)
	})

	it("should replace nodes", () => {
		fc.assert(
			fc.property(smallTreeGen, ([tree, sizeMinusTwo]) => {
				function copyTree(node: IRoseTree) {
					return new RoseTree(Object.assign({}, node.attributes), node.nodes.map((childNode) => treemap(childNode, copyTree)))
				}
				let result = flatten(treemap(tree, copyTree));
				return flatten(tree).every((node, index) => _.isEqual(result[index].attributes, node.attributes) && !(result[index] == node))
			})
		)
	})
})