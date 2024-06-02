const test = (title, callback) => {
  console.log(` 🔹 ${title} 🔹 `);
  callback();
};

/*
 Hash table implementation:
*/
(() => {
  class HashTable {
    constructor(size) {
      this.size = size;
      this.buckets = Array(this.size);
      for (let i = 0; i < this.size; ++i) {
        this.buckets[i] = new Map();
      }
    }

    hash(key, tableSize) {
      let str = "";
      for (let i = 0; i < key.length; ++i) {
        str += key.charCodeAt(i);
      }
      return Number(str) % tableSize;
    }

    add(key, value) {
      const hashNum = this.hash(key, this.size);
      this.buckets[hashNum].set(key, value);
    }

    remove(key) {
      const hashNum = this.hash(key, this.size);
      if (this.buckets[hashNum].has(key)) {
        this.buckets[hashNum].delete(key);
        return;
      }
      return `${key} not found`;
    }

    find(key) {
      const hashNum = this.hash(key, this.size);
      if (!this.buckets[hashNum].has(key)) {
        return `${key} not found`;
      }
      return this.buckets[hashNum];
    }
  }

  test("Hash method works", () => {
    const hashTable = new HashTable(30);
    const hash = hashTable.hash("poozh", 30);
    if (hash === 14) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Hash table adds and finds added entry", () => {
    const hashTable = new HashTable(30);
    hashTable.add("poozh", "secret");
    const findKey = hashTable.find("poozh");
    if (findKey) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Hash table removes an entry", () => {
    const hashTable = new HashTable(30);
    hashTable.add("poozh", "secret");
    hashTable.remove("poozh");
    const findKey = hashTable.find("poozh");
    if (findKey === "poozh not found") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Hash table removes a non-existing entry", () => {
    const hashTable = new HashTable(30);
    const removeKey = hashTable.remove("poozh");
    if (removeKey === "poozh not found") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();
