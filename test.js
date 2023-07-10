let jsonToSend = [
  "Contract",
  "GCName",
  "Name",
  "State",
  "City"
]

//We are editing "Name" and "Address"
jsonToSend.push("Name")
console.log(jsonToSend);
jsonToSend.push("Address")
console.log(jsonToSend);

//We are removing "City" and "Country"
console.log(removeItemAll(jsonToSend, "City"));
console.log(removeItemAll(jsonToSend, "Country"));
console.log(removeItemAll(jsonToSend, "Name"));


function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}