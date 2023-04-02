// Steps to writing a recursive function:
// 1. determine the base case - when the recursion stops?
// 2. determine the smallest effective unit of work that can be done towards the solution 

//"In a loop, each iteration is a 'refreshed' scope, all of the variables from the previous iteration are deleted 
// (variables for iteration i-1 can't be accessed from iteration i, because the variables from i-1 are deleted 
// on the transition from iteration i-1 to iteration i). 
// In a recursive function, each new iteration is run in a subscope of the last iteration 
// (the variables for iteration i-1 are still alive during iteration 1, they just exist in a different scope)." -- charmoniumQ, https://stackoverflow.com/questions/660337/recursion-vs-loops 


//___________________________________________________________
// Reverse a string
//___________________________________________________________

function reverseString(str){
    if(str==="") return ""
    console.log(str.charAt(str.length-1))
    return reverseString(str.slice(0, str.length-1));
}



//___________________________________________________________
// Is a palindrome
//___________________________________________________________

function isPalindrome(str){
    if(str === "" || str.length===1) return true
    if(str.charAt(0)===str.charAt(str.length-1)){
        return isPalindrome(str.slice(1, str.length - 1))
    }
    return false
}

//___________________________________________________________
// Convert decimal to binary
//___________________________________________________________

function decimalToBinary(int, str=""){
    if(int === 0){
      console.log(str)
      return  
    } 
    str+=int%2
    return decimalToBinary(Math.floor(int/2), str)
}
//___________________________________________________________
// Sum of natural numbers 1-n
//___________________________________________________________

function sum(n, s=0){
    if(n===0){
     console.log(s)  
     return 
    } 
   return sum(n-1, s+n)
}

//___________________________________________________________
// Divide and Conquer - useful for SORTED data
//___________________________________________________________

const data = [-1, 0, 1, 2, 3, 4, 7, 9, 10, 20];

function divideAndConquer(arr, target){
  if(arr.length === 1 && arr[0] !== target) return "target not found"
  const mid = Math.floor(arr.length/2);
  for(let i = 0; i<mid; ++i){
    if (arr[i]===target) return `found ${target}`
  }
  return divideAndConquer(arr.slice(mid), target) // space complexity?
}

function divideAndConquer_2(arr, leftIdx, rightIdx, target) {
 if(leftIdx === rightIdx && rightIdx !== target) return "target not found"
 const mid = Math.floor((leftIdx+rightIdx)/2);
 if (arr[mid]===target) return `found ${target} at index ${mid}`
 if(target < arr[mid]) return divideAndConquer_2(arr, leftIdx, mid-1, target);
 return divideAndConquer_2(arr, mid+1, rightIdx, target) // space complexity?
}


//___________________________________________________________
// Factorial of n 
//___________________________________________________________

function factorial(n){
 if(n===1) return 1
 return n*factorial(n-1)
}


//___________________________________________________________
// N-th number of fibonacci sequence 
//___________________________________________________________

function fib(n){
    if(n===0 || n===1) return n
    return fib(n-1) + fib(n-2)
} // how to optimize this?


