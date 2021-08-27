import {Stream, Sink, Scheduler, Disposable} from "./stream";
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
*/

export type ObjUpdate = [key: string, oldVal: any, newVal: any]
export function objectUpdateStream(obj: {ref: {[key: string]: any}}): [any, Stream<ObjUpdate>] {
	return [obj, {}];
}

/*
window.getSelection()
https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection
https://developer.mozilla.org/en-US/docs/Web/API/Selection
*/
export function selectionStream(): Stream<string> {
	return {};
}