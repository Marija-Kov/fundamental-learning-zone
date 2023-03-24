// hash function

const hash = (key, tableSize) => {
  let str = "";
  for(let i=0; i<key.length; ++i){
    str+=key.charCodeAt(i);
  }
  return Number(str) % tableSize;

}

// implementation using Map and Array

class HashTable {
    constructor(size){
      this.size = size;
      this.buckets = Array(this.size);
      for(let i=0; i<this.size; ++i){
       this.buckets[i] = new Map();
      }
    }
    add(key, value){
     const hashed = hash(key, this.size);
     console.log(`added ${key}: ${value}`);
     this.buckets[hashed].set(key, value);
    }
    remove(key){
      const hashed = hash(key, this.size);
      if (this.buckets[hashed].has(key)) {
        console.log(`deleted ${key}: ${this.buckets[hashed].get(key)}`);
        this.buckets[hashed].delete(key)
        return;
      }
      console.log(`${key} not found`);
    }
    find(key){
       const hashed = hash(key, this.size); 
       if(this.buckets[hashed].has(key)){
        console.log(`found ${key}: ${this.buckets[hashed].get(key)}`);
        return
       }
       console.log(`${key} not found`)
    }
}

let hashTable = new HashTable(30);
hashTable.add("keech", "dj techy hacky")
hashTable.add("poozh", "hello poozh kiss u");
hashTable.add("cecee", "ploppers");
hashTable.add("nebojs", "feefee");
hashTable.add("keech", "ploppers");
hashTable.add("daredev", "nostradamus");
hashTable.remove("daredev")
console.log(hashTable)