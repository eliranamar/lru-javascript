/* coded by Eliran Amar - https://www.linkedin.com/in/eliranamar/
*
*  this is an implementation of LRU caching in Javascript
*
* */

// for creating node instances in the list
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// creating doubly linked list data structure as the cache
class DoublyLinkedList {
  constructor() {
    this.count = 0; // for keeping track on cache size
    this.head = null;
    this.tail = null;
  }

  // getting the current size of cache
  get length() {
    return this.count;
  }

  // add new node to beginning of list
  addNewNodeToHead(node) {

    if (!this.head) { // if list is empty
      this.head = node;
      this.tail = this.head;
      this.count++;
      return;
    }

    this.head.next = node;
    node.prev = this.head;
    this.head = node;
    this.count++;

  }

  moveNodeFromListToHead(node) { // this func move nodes that exist in the cache

    if (this.head === node) {return} // if node is in head already do nothing

    if (this.tail === node) { // if node is the tail move it to head
      let newTail = this.tail.next;
      this.head.next = node;
      node.prev = this.head;
      this.head = node;
    } else { // if the node is somewhere in the middle
      let prev = node.prev;
      let next = node.next;
      this.head.next = node;
      node.prev = this.head;
      this.head = node;
      next.prev = prev;
      prev.next = next;
    }
  }

  // to remove last item from cache simply make no one pointing to it
  removeNodeFromTail() {
    let last = this.tail;
    let beforeLast = this.tail.next;
    beforeLast.prev = null;
    this.tail = beforeLast;
    this.count--;
    return last.data;
  }
}


const cache = new DoublyLinkedList(); // acting as cache
const obj = {}; // acting as hash map

function lruFunc(url) {
  cosnt cacheSize = 3;

  const node = new Node(url);
  if (obj[url]) { // check if the url is in the map
    cache.moveNodeFromListToHead(obj[url]);
  } else { // if url is not in cache
    obj[url] = node;
    if (cache.length < cacheSize) { // check if there is free space in cache - you can change cache size here
      cache.addNewNodeToHead(node);
    } else { // if no free space in cache
      cache.addNewNodeToHead(node);
      let key = cache.removeNodeFromTail(); // remove entry from the map
      delete obj[key];
    }
  }
}

lruFunc('google');
lruFunc('ynet');
lruFunc('zap');
lruFunc('facebook');
lruFunc('zap');

console.log('cache: ', cache);

console.log('map: ', obj);
