import {Stream} from "./stream";
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
*/

export type ObjUpdate = [key: string, oldVal: any, newVal: any]
export function objectUpdateStream(obj: {[key: string]: any}): [any, Stream<ObjUpdate>] {
	return [obj, {}];	
}

export type ISelectionEvent = {
	kind: 'selection';
	anchorNodeId: string;
	anchorOffset: number;
	focusNodeId: string;
	focusOffset: number;
};

export type IDeselectionEvent = {
	kind: 'deselection'
}

/*
window.getSelection()
https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection
https://developer.mozilla.org/en-US/docs/Web/API/Selection
*/
export type selectionEvents = ISelectionEvent | IDeselectionEvent;
export function selectionStream(): Stream<ISelectionEvent | IDeselectionEvent> {

}