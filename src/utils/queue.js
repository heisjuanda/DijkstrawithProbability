class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(node, distance) {
    this.queue.push({ node, distance });
    this.queue.sort((a, b) => a.distance - b.distance);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

export default PriorityQueue;