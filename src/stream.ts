
export type Time = number;

export interface Scheduler {
  currentTime(): Time;
}

export interface Stream<A> {
  run(sink: Sink<A>, scheduler: Scheduler): Disposable;
}

export interface Sink<A> {
  event(time: Time, value: A): void;
  end(time: Time): void;
  error(time: Time, err: Error): void;
}

// Interface of a resource that can be stopped or destroyed
export interface Disposable {
  dispose(): void;
}


//Promise example
//When run this will immediately start waiting for 5 seconds 
//and will console.log done after finishing and not again after.
const oneEvent = new Promise((resolve, reject) => {
	setTimeout(() => resolve("done"), 5000); 
}).then(data => console.log(data)) 
   
// the following setups an object which when Run will generate events every 2 seconds.
// A stream does not automatically execute like a promise.  
const intervalStream: Stream<number> = {
	run(sink: Sink<number>, scheduler: Scheduler): Disposable {
		let intervalCount = 0; 
		let interval = setInterval(() => {
			if(scheduler.currentTime() %10 !== 0) {
			sink.event(scheduler.currentTime(), intervalCount++)
			}else{
			sink.error(scheduler.currentTime(), new Error("An error every tenth iteration for example"))
			}
		}, 2000);

		return {
			dispose: () => clearInterval(interval)
		}
	}
};

const intervalSink: Sink<number> = {
	event(time: Time, value: number) {
		console.log("interval "+value, time);
	},
	error(time: Time, err: Error) {
		console.error(err);
	},
	end(time: Time) {} //not used since this stream is infinite by definition
}

export function run<T>(sink: Sink<T>, scheduler: Scheduler, stream: Stream<T>): Disposable {
	return stream.run(sink, scheduler);
}

export function newDefaultScheduler() {
	return {
		currentTime() {
			return new Date().getTime();
		}
	}
}

let disposable = run(intervalSink, newDefaultScheduler(), intervalStream);
setTimeout(() => disposable.dispose(), 30*1000) //end stream after 30 seconds;