let counter = 0;

function recursiveFunction() {
  counter++;
  recursiveFunction(); // Recursive call
}

try {
  recursiveFunction();
} catch (error) {
  console.log('Error:', error.message);
  console.log('Counter value when stack overflow occurred:', counter);
}


////////////Part 2//////////////////
function flattenArray(arr) {
    return arr.reduce((acc, item) => {
      if (Array.isArray(item)) {
        return acc.concat(flattenArray(item));
      } else {
        return acc.concat(item);
      }
    }, []);
  }


function trampolinedFlattenArray(arr) {
    return function helper(arr, acc = []) {
      if (arr.length === 0) return acc;
  
      const [first, ...rest] = arr;
      if (Array.isArray(first)) {
        return () => helper(first.concat(rest), acc);
      } else {
        return () => helper(rest, acc.concat(first));
      }
    }(arr);
  }
  
  function trampoline(fn) {
    let result = fn;
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  }
  
  // Usage:
  const deeplyNestedArray = [1, [2, [3, [4, 5]]]];
  console.log(trampoline(trampolinedFlattenArray(deeplyNestedArray)));
  
  ////////////Part 3//////////////////
const primeContainer = document.getElementById('primeContainer');

// isPrime?
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// primes between 1 and n
function renderPrimes(n) {
  let i = 1;

  function findNextPrime() {
    if (i > n) {
      alert('Finished calculating primes!');
      return;
    }

    if (isPrime(i)) {
      const primeElement = document.createElement('div');
      primeElement.textContent = i;
      primeContainer.appendChild(primeElement);
    }

    i++;
    setTimeout(findNextPrime, 0);
  }

  findNextPrime();
}


renderPrimes(100);