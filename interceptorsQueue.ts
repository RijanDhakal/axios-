interface porcessFunction {
  processFunction: Function;
}

const queue: porcessFunction[] = [];

export function addToQueue(Fn: Function) {
  queue.push({
    processFunction: Fn,
  });
  return queue.length;
}

export async function runInterceptors() {
  if (queue.length !== 0) {
    for (const q of queue) {
      await q.processFunction();
    }
  }
}
