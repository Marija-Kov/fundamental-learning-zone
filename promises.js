// Tasks that take a while to return results (like talking to the API, getting things from databases, opening remote files)
// can return Promises, that represent the eventual completion or failure of an async operation.

// Think of getting data from the API. The HTTP request method returns (a Promise) immediately, but that doesn't mean that 
// the request has finished processing. If we tried getting data out of the API at this point,
// we would get an error because the data isn't there just yet.
// So we have to make sure that we actually get the data out of the API (resolve the Promise that HTTP request gets in return)
// before we try to do something with it.

// To demonstrate that promises take time to execute (i.e. give the process as much time as it needs to return the data)
// we can write another, synchronous process right below the long, asynchronous one and see 
// which returns the result first.

// 
const hungry = true;

// creating a promise
const eat = new Promise((resolve, reject) => {
  if (hungry) {
    const food = {
      tofu: "4pcs",
      rice: "1cup",
    };
    resolve(food);
  } else {
    reject(new Error("not hungry"));
  }
});

// consuming a promise
const eatFood = () => {
  eat
    .then((ingredients) =>
      console.log(
        `I'll have ${ingredients.tofu} of tofu and ${ingredients.rice} of rice`
      )
    )
    .catch((err) => console.log(err.message));
};

eatFood();

// Asynchronous processes/functions are those that take a while to execute. 
// Since Javascript is synchronous by default, it needs a special way to deal with async processes
// because they have no "awareness" of other processes the way synchronous processes do.
// With this "awareness", synchronous processes are executed concurrently, one after another -
// the synchronicity is in connecting the endpoints of the processes 
// so that one process starts at the point where the other ends.

// An async process is not "in sync" with any other processes by default and that's a great thing because that means that we 
// can run operations "in the background" not interrupting sync processes while they're doing their thing.
// With async programming we can also make a process wait till another process returns something that would be used
// to complete the former process (like in fetching data from an API example).