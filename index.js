class DoublyListNode {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }


    length() {
        return this.size;
    }

    append(elem) {
        try {
            if (typeof elem !== "string") {
                throw new Error("Invalid input data type detected. Please provide input as a string.");
            }

            const node = new DoublyListNode(elem);

            if (!this.head) {
                this.head = node;
                this.tail = node;
            } else {
                this.tail.next = node;
                node.prev = this.tail;
                this.tail = node;
            }

            this.size++;
        } catch (error) {
            console.error(error.message);
        }
    }

    insert(elem, index) {
        if (typeof elem !== "string") {
            throw new Error("Invalid input data type detected. Please provide input as a string.")
        }
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds. Please provide a valid index.")
        }

        const node = new DoublyListNode(elem)
        let current = this.head
        let i = 0

        while (i < index) {
            current = current.next
            i++
        }
        if (index === 0) {
            node.next = current
            current.prev = node
            this.head = node
        } else {
            node.prev = current.prev
            node.next = current
            current.prev.next = node
            current.prev = node
        }
        this.size++
    }

    delete(index) {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of bounds. Please provide a valid index.");
        }

        let current = this.head;
        let removedItem;

        switch (true) {
            case index === 0:
                removedItem = this.head;
                this.head = this.head.next;
                if (this.head) {
                    this.head.prev = null;
                } else {
                    this.tail = null;
                }
                break;

            case index === this.size - 1:
                removedItem = this.tail;
                this.tail = this.tail.prev;
                this.tail.next = null;
                break;

            default:
                for (let i = 0; i < index; i++) {
                    current = current.next;
                }
                removedItem = current;
                current.prev.next = current.next;
                current.next.prev = current.prev;
        }

        this.size--;

        return removedItem.value;
    }

    deleteAll(key) {
        let current = this.head
        let nodesToDelete = []

        while (current) {
            if (current.value === key) {
                nodesToDelete.push(current)
            }
            current = current.next
        }

        for (let node of nodesToDelete) {
            if (node === this.head) {
                this.head = node.next
                if (this.head) {
                    this.head.prev = null
                } else {
                    this.tail = null
                }
            } else if (node === this.tail) {
                this.tail = node.prev
                this.tail.next = null
            } else {
                node.prev.next = node.next
                node.next.prev = node.prev
            }
            this.size --
        }
    }

    get(index) {
        if (index < 0 || index >= this.size) {
            return new Error("Index out of bounds. Please provide a valid index.")
        }

        let currentIndex = 0
        let currentNode = this.head
        while (currentIndex < index) {
            currentNode = currentNode.next
            currentIndex++
        }

        return currentNode.value
    }

    clone() {
        const newList = new DoublyList()
        let currentNode = this.head
        while(currentNode) {
            newList.append(currentNode.value)
            currentNode = currentNode.next
        }
        return newList
    }

    reverse() {
        let currentNode = this.head
        let previousNode = null
        let nextNode = null

        while (currentNode) {
            nextNode = currentNode.next
            currentNode.next = previousNode
            currentNode.prev = nextNode
            previousNode = currentNode
            currentNode = nextNode
        }

        this.tail = this.head
        this.head = previousNode

        return this
    }

    findFirst(elem) {
        let current = this.head;
        let index = -1;

        while (current) {
            index++;
            if (current.value === elem) {
                return index;
            }
            current = current.next;
        }

        return -1;
    }

    findLast(elem) {
        let current = this.tail;
        let index = this.size - 1;

        do {
            if (current.value === elem) {
                return index;
            }
            current = current.prev;
            index--;
        } while (current !== null && index >= 0);

        return -1;
    }

    clear() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    extend(otherList) {
        let currentNode = otherList.head;
        let i = 0;
        while (currentNode && i < otherList.size) {
            this.append(currentNode.value);
            currentNode = currentNode.next;
            i++;
        }
    }
}

module.exports = DoublyList;
