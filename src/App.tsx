import './App.css';
import {Stream, run, newDefaultScheduler, Time, Disposable} from './stream';
import {objectUpdateStream, selectionStream, ObjUpdate} from './newstreams';
import { Component, render } from 'preact';

const scheduler = newDefaultScheduler();
let [state, updateStream] = objectUpdateStream({ref: {
    inputOne: "",
    inputTwo: ""
}});

let selectStream = selectionStream();

let disposables: Disposable[] = [
    // run({
    //     event(time: Time, value: ObjUpdate) {
    //         console.log(time, "objectUpdate", value);
    //     },
    //     error(time: Time, err: Error) {
    //         console.error(err);
    //     },
    //     end(time: Time) {}
    // } , scheduler, updateStream),
    // run({
    //     event(time: Time, value) {
    //         console.log(time, "selection", value);
    //     },
    //     error(time: Time, err: Error) {
    //         console.error(err);
    //     },
    //     end(time: Time) {}

    // } , scheduler, selectStream)
];

class App extends Component {
    mutableState: {ref: {[key: string]: any}};
    constructor() {
        super();
        this.mutableState = state;
    }

    onInputOne(event: InputEvent & any) {
        this.mutableState.ref["inputOne"] = event.target!.value;
    }
    onInputTwo(event: InputEvent & any) {
        this.mutableState.ref["inputTwo"] = event.target!.value
    }

    stopStreams() {
        disposables.forEach(disp => disp.dispose());
    }
    render() {
    return (
      <div class="App">
        <h1>Hello Streams</h1>
        <input type="text" id="textOne" onInput={(e) => this.onInputOne(e)}></input>
        <input type="text" id="textTwo" onInput={(e) => this.onInputTwo(e)}></input>
        <p id="A">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts.
        </p>
        <p id="B">
          Separated they live in Bookmarksgrove right at the coast of the
          Semantics, a large language ocean.
        </p>
        <p id="C">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia.
        </p>
        <p id="D">
          It is a paradisematic country, in which roasted parts of sentences fly
          into your mouth.
        </p>
        <p id="E">
          Even the all-powerful Pointing has no control about the blind texts it
          is an almost unorthographic life One day however a small line of blind
          text by the name of Lorem Ipsum decided to leave for the far World of
          Grammar.
        </p>
        <p id="F">
          The Big Oxmox advised her not to do so, because there were thousands
          of bad Commas, wild Question Marks and devious Semikoli, but the
          Little Blind Text didn???t listen.
        </p>
        <p id="G">
          She packed her seven versalia, put her initial into the belt and made
          herself on the way.
        </p>
        <p id="H">
          When she reached the first hills of the Italic Mountains, she had a
          last view back on the skyline of her hometown Bookmarksgrove, the
          headline of Alphabet Village and the subline of her own road, the Line
          Lane.
        </p>
        <input type="button" onClick={() => this.stopStreams()} value="Stop Streams"></input>
      </div>
    );
    }
}

export default App;