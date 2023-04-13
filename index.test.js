const DoublyList = require('./index.js');

describe('DoublyList', () => {
    describe('length', () => {
        test('should return 0 when list is empty', () => {
            const list = new DoublyList();
            expect(list.length()).toBe(0);
        });

        test('should return the length of the list when it contains elements', () => {
            const list = new DoublyList();
            list.append('one');
            list.append('two');
            list.append('three');
            expect(list.length()).toBe(3);
        });
    });
    describe('append', () => {
        test('should add a new node to the end of the list', () => {
            const list = new DoublyList();
            list.append('A');
            expect(list.get(0)).toBe('A');
            expect(list.length()).toBe(1);

            list.append('B');
            expect(list.get(1)).toBe('B');
            expect(list.length()).toBe(2);

            list.append('C');
            expect(list.get(2)).toBe('C');
            expect(list.length()).toBe(3);
        });

        test('should update the head and tail pointers when adding the first element', () => {
            const list = new DoublyList();
            list.append('A');
            expect(list.head.value).toBe('A');
            expect(list.tail.value).toBe('A');
            expect(list.length()).toBe(1);
        });
    });
    describe("insert", () => {
        let list;
        beforeEach(() => {
            list = new DoublyList();
            list.append("apple");
            list.append("banana");
            list.append("orange");
        });

        test("should insert an element at index 0", () => {
            list.insert("mango", 0);
            expect(list.get(0)).toBe("mango");
            expect(list.get(1)).toBe("apple");
            expect(list.length()).toBe(4);
        });

        test("should insert an element at a middle index", () => {
            list.insert("mango", 1);
            expect(list.get(1)).toBe("mango");
            expect(list.get(2)).toBe("banana");
            expect(list.get(3)).toBe("orange");
            expect(list.length()).toBe(4);
        });

        test("should insert an element at the last index", () => {
            list.insert("mango", 3);
            expect(list.get(3)).toBe("mango");
            expect(list.length()).toBe(4);
        });

        test("should insert an element at the last index", () => {
            list.insert("mango", list.length());
            expect(list.get(list.length() - 1)).toBe("mango");
            expect(list.length()).toBe(4);
        });
    });
    describe('delete', () => {
        let doublyList;

        beforeEach(() => {
            doublyList = new DoublyList();
            doublyList.append("apple");
            doublyList.append("banana");
            doublyList.append("orange");
        });

        test('removes the first element', () => {
            doublyList.delete(0);
            expect(doublyList.length()).toBe(2);
            expect(doublyList.get(0)).toBe("banana");
        });

        test('removes the last element', () => {
            doublyList.delete(2);
            expect(doublyList.length()).toBe(2);
            expect(doublyList.get(1)).toBe("banana");
        });

        test('removes an element from the middle', () => {
            doublyList.delete(1);
            expect(doublyList.length()).toBe(2);
            expect(doublyList.get(0)).toBe("apple");
            expect(doublyList.get(1)).toBe("orange");
        });

        test('throws an error when index is out of bounds', () => {
            expect(() => doublyList.delete(-1)).toThrow("Index out of bounds.");
            expect(() => doublyList.delete(3)).toThrow("Index out of bounds.");
        });
    });
    describe('deleteAll', () => {
        let list;

        beforeEach(() => {
            list = new DoublyList();
        });

        test('should remove all nodes with the specified value', () => {
            list.append('apple');
            list.append('banana');
            list.append('orange');
            list.append('apple');
            list.append('grape');
            list.append('apple');

            list.deleteAll('apple');

            expect(list.length()).toBe(3);
            expect(list.get(0)).toBe('banana');
            expect(list.get(1)).toBe('orange');
            expect(list.get(2)).toBe('grape');
        });

        test('should not modify the list when given a key not present in the list', () => {
            list.append('apple');
            list.append('banana');
            list.append('orange');

            list.deleteAll('grape');

            expect(list.length()).toBe(3);
            expect(list.get(0)).toBe('apple');
            expect(list.get(1)).toBe('banana');
            expect(list.get(2)).toBe('orange');
        });

        test('should return undefined when given an empty list', () => {
            expect(list.deleteAll('apple')).toBeUndefined();
        });
    });
    describe('get', () => {
        test('should return the first element when index is 0', () => {
            const list = new DoublyList();
            list.append('a');
            list.append('b');
            expect(list.get(0)).toBe('a');
        });

        test('should return the last element when index is size - 1', () => {
            const list = new DoublyList();
            list.append('a');
            list.append('b');
            list.append('c');
            expect(list.get(list.length() - 1)).toBe('c');
        });

        test('should return the correct element when index is in the middle of the list', () => {
            const list = new DoublyList();
            list.append('a');
            list.append('b');
            list.append('c');
            list.append('d');
            list.append('e');
            expect(list.get(2)).toBe('c');
        });
    });
    describe('clone', () => {
        test('returns an empty DoublyList when called on an empty list', () => {
            const list = new DoublyList()
            const clone = list.clone()
            expect(clone.head).toBeNull()
            expect(clone.tail).toBeNull()
            expect(clone.length()).toBe(0)
        })

        test('returns a new list with the same elements as the original', () => {
            const list = new DoublyList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            expect(clone.head.value).toBe('A')
            expect(clone.tail.value).toBe('C')
            expect(clone.length()).toBe(3)
        })

        test('returns a new list with new nodes', () => {
            const list = new DoublyList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            expect(clone.head).not.toBe(list.head)
            expect(clone.tail).not.toBe(list.tail)
            expect(clone.head.next).not.toBe(list.head.next)
            expect(clone.tail.prev).not.toBe(list.tail.prev)
        })

        test('modifying the original list does not affect the clone', () => {
            const list = new DoublyList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            list.delete(1)
            expect(list.length()).toBe(2)
            expect(clone.length()).toBe(3)
            expect(clone.get(0)).toBe('A')
            expect(clone.get(1)).toBe('B')
            expect(clone.get(2)).toBe('C')
        })

        test('modifying the clone does not affect the original list', () => {
            const list = new DoublyList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            clone.delete(1)
            expect(list.length()).toBe(3)
            expect(clone.length()).toBe(2)
            expect(list.get(0)).toBe('A')
            expect(list.get(1)).toBe('B')
            expect(list.get(2)).toBe('C')
        })

        test('returns a new instance of DoublyList', () => {
            const list = new DoublyList()
            list.append('A')
            list.append('B')
            list.append('C')
            const clone = list.clone()
            expect(clone).toBeInstanceOf(DoublyList)
        })
    })
    describe('DoublyList.reverse', () => {
        let list;

        beforeEach(() => {
            list = new DoublyList();
            list.append('first');
            list.append('second');
            list.append('third');
        });

        test('should return the list instance', () => {
            expect(list.reverse()).toBe(list);
        });

        test('should reverse the order of the elements in the list', () => {
            list.reverse();
            expect(list.get(0)).toBe('third');
            expect(list.get(1)).toBe('second');
            expect(list.get(2)).toBe('first');
        });

        test('should update the head and tail properties of the list', () => {
            const originalHead = list.head;
            const originalTail = list.tail;
            list.reverse();
            expect(list.head).toBe(originalTail);
            expect(list.tail).toBe(originalHead);
        });

        test('should handle a list with only one element', () => {
            list.clear();
            list.append('one');
            list.reverse();
            expect(list.get(0)).toBe('one');
        });

        test('should handle an empty list', () => {
            list.clear();
            list.reverse();
            expect(list.length()).toBe(0);
        });

        test('should handle a list with repeated elements', () => {
            list.clear();
            list.append('a');
            list.append('b');
            list.append('b');
            list.append('c');
            list.append('b');
            list.append('d');
            list.append('b');
            list.reverse();
            expect(list.get(0)).toBe('b');
            expect(list.get(1)).toBe('d');
            expect(list.get(2)).toBe('b');
            expect(list.get(3)).toBe('c');
            expect(list.get(4)).toBe('b');
            expect(list.get(5)).toBe('b');
            expect(list.get(6)).toBe('a');
        });
    });
    describe('findFirst method', () => {
        let doublyList;
        beforeEach(() => {
            doublyList = new DoublyList();
        });

        test('should return -1 for empty list', () => {
            expect(doublyList.findFirst('abc')).toBe(-1);
        });

        test('should return -1 if element is not found', () => {
            doublyList.append('abc');
            doublyList.append('def');
            expect(doublyList.findFirst('ghi')).toBe(-1);
        });

        test('should return 0 if element is found at head', () => {
            doublyList.append('abc');
            doublyList.append('def');
            expect(doublyList.findFirst('abc')).toBe(0);
        });

        test('should return index if element is found in the middle of list', () => {
            doublyList.append('abc');
            doublyList.append('def');
            doublyList.append('ghi');
            expect(doublyList.findFirst('def')).toBe(1);
        });

        test('should return index if element is found at the end of list', () => {
            doublyList.append('abc');
            doublyList.append('def');
            expect(doublyList.findFirst('def')).toBe(1);
        });

        test('should return 0 if list has only one element and it is the searched element', () => {
            doublyList.append('abc');
            expect(doublyList.findFirst('abc')).toBe(0);
        });
    });
    describe('findLast', () => {
        let doublyList;

        beforeEach(() => {
            doublyList = new DoublyList();
            doublyList.append('apple');
            doublyList.append('banana');
            doublyList.append('cherry');
            doublyList.append('date');
            doublyList.append('apple');
        });

        test('returns the correct index when the element is found at the end', () => {
            const index = doublyList.findLast('apple');
            expect(index).toBe(4);
        });

        test('returns the correct index when the element is found in the middle', () => {
            const index = doublyList.findLast('banana');
            expect(index).toBe(1);
        });

        test('returns the correct index when the element is found at the beginning', () => {
            const index = doublyList.findLast('cherry');
            expect(index).toBe(2);
        });

        test('returns -1 when the element is not found', () => {
            const index = doublyList.findLast('grape');
            expect(index).toBe(-1);
        });

        test('returns the correct index when there is only one element in the list', () => {
            doublyList.clear();
            doublyList.append('apple');
            const index = doublyList.findLast('apple');
            expect(index).toBe(0);
        });

        test('returns -1 when the input is not a string', () => {
            const index = doublyList.findLast(123);
            expect(index).toBe(-1);
        });
    });
    describe("findLast", () => {
        let doublyList;

        beforeEach(() => {
            doublyList = new DoublyList();
            doublyList.append("apple");
            doublyList.append("banana");
            doublyList.append("cherry");
            doublyList.append("date");
            doublyList.append("elderberry");
            doublyList.append("fig");
        });

        afterEach(() => {
            doublyList.clear();
        });

        test("returns the index of the last node with the specified value", () => {
            expect(doublyList.findLast("apple")).toBe(0);
            expect(doublyList.findLast("banana")).toBe(1);
            expect(doublyList.findLast("cherry")).toBe(2);
            expect(doublyList.findLast("date")).toBe(3);
            expect(doublyList.findLast("elderberry")).toBe(4);
            expect(doublyList.findLast("fig")).toBe(5);
        });

        test("returns -1 if no node with the specified value is found", () => {
            expect(doublyList.findLast("grape")).toBe(-1);
            expect(doublyList.findLast("watermelon")).toBe(-1);
        });

        test("returns the index of the last node with the specified value even if the value appears multiple times", () => {
            doublyList.append("banana");
            doublyList.append("date");

            expect(doublyList.findLast("apple")).toBe(0);
            expect(doublyList.findLast("banana")).toBe(6);
            expect(doublyList.findLast("cherry")).toBe(2);
            expect(doublyList.findLast("date")).toBe(7);
            expect(doublyList.findLast("elderberry")).toBe(4);
            expect(doublyList.findLast("fig")).toBe(5);
        });

        test("returns the index of the last node with the specified value even if the list contains only one node", () => {
            doublyList.clear();
            doublyList.append("apple");

            expect(doublyList.findLast("apple")).toBe(0);
        });

        test("returns -1 if the specified value is not a string", () => {
            expect(doublyList.findLast(1)).toBe(-1);
            expect(doublyList.findLast(true)).toBe(-1);
            expect(doublyList.findLast({})).toBe(-1);
            expect(doublyList.findLast([])).toBe(-1);
            expect(doublyList.findLast(null)).toBe(-1);
            expect(doublyList.findLast(undefined)).toBe(-1);
        });
    });
    describe('extend', () => {
        test('should add the elements of the given list to the end of the current list', () => {
            const list1 = new DoublyList();
            list1.append('a');
            list1.append('b');
            list1.append('c');

            const list2 = new DoublyList();
            list2.append('d');
            list2.append('e');
            list2.append('f');

            list1.extend(list2);

            expect(list1.length()).toBe(6);
            expect(list1.get(3)).toBe('d');
            expect(list1.get(4)).toBe('e');
            expect(list1.get(5)).toBe('f');
        });

        test('should do nothing if the given list is empty', () => {
            const list1 = new DoublyList();
            list1.append('a');
            list1.append('b');

            const list2 = new DoublyList();

            list1.extend(list2);

            expect(list1.length()).toBe(2);
            expect(list1.get(0)).toBe('a');
            expect(list1.get(1)).toBe('b');
        });

        test('should handle the case when the current list is empty', () => {
            const list1 = new DoublyList();

            const list2 = new DoublyList();
            list2.append('a');
            list2.append('b');
            list2.append('c');

            list1.extend(list2);

            expect(list1.length()).toBe(3);
            expect(list1.get(0)).toBe('a');
            expect(list1.get(1)).toBe('b');
            expect(list1.get(2)).toBe('c');
        });


        test('should handle the case when the given list has only one element', () => {
            const list1 = new DoublyList();
            list1.append('a');
            list1.append('b');
            list1.append('c');

            const list2 = new DoublyList();
            list2.append('d');

            list1.extend(list2);

            expect(list1.length()).toBe(4);
            expect(list1.get(3)).toBe('d');
        });
    });
});
