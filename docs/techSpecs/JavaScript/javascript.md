---
title: JavaScript Control
layout: default
nav_order: 5
parent: Technical Specifications
has_children: true
permalink: /docs/techSpecs/js
---

# JavaScript in Plumsail
{: .no_toc}

## Table of Contents
{: .no_toc}

1. TOC
{:toc}

## About

Plumsail comes with a JavaScript editor built in. However, this isn't ideal in terms of debugging, organizing, and controlling the whole process. Thus, we've segmented the code into several parts.

## Plumsail's JavaScript

All Plumsail JavaScript features can be found here: [Plumsail Documentation], but listed are the highlights - what was useful or what can be used/referenced in the future. 

## Internal Editor

For all three forms, the internal JavaScript editor has the exact same code. Once the page is rendered and JQuery (A necessary component to interacting with values on the submission forms) is loaded, then it calles the external file located in this github repo.

```js
fd.beforeRender(function(vue){
    var script = document.createElement('script'); 
    script.src = '//code.jquery.com/jquery-1.11.0.min.js'; 
    document.getElementsByTagName('head')[0].appendChild(script);
    
    jQuery(document).ready(function($){
        var imported = document.createElement('script');
        imported.src = 'https://tce-innovation.github.io/Subcontractor-Automation/src/[nameOfFile].js';
        document.head.appendChild(imported);
    });
});
```

All Plumsail JavaScript features can be found here: [Plumsail Documentation], but listed are the highlights: what was useful or what can be used/referenced in the future. 

## Form Manager

Form manager of public web forms provides access to all the elements of the form. It is called through `fd`.

Below are some important properties and methods using the fd object.

|Properties|Function|Methods|Function|
|:-:|:-:|:-:|:-:|
|`fd.save();`|Saves and submits the form|`fd.beforeCreate();`||
|`fd.clear();`|Clears the entire form of any information|`fd.created();`|
|`fd.data();`|Returns the entire form's data in an object|`fd.beforeRender();`|
|`fd.fields()`|Returns all the fields in the form|`fd.rendered();`|This is where the main code is run out of|
|`fd.controls()`|Returns all the controls in the form|`fd.beforeSave();`|This is how I handle data manipulation to send to the API|
|||`fd.saved();`|Run after the form has been completely submitted|

```js
fd.save();
fd.clear();
fd.data();
fd.fields();
fd.controls();
```
More information can be found in the [Plumsail Docs Form Manager]

### Fields

Fields are basic inputs for the user to enter information. They are referenced by `fd.field("<internalName>")`. 

Fields include
- Text and notes
- Numbers
- Toggle
- Drop Down
- Single and Multiple Choice
- Date/Date and Time
- Masked Input
- Attachments.

Additional documentation on fields can be found on the [Plumsail Forms Field Docs]

### Controls

Controls are text and dynamic elements. The most useful ones in this form are listed below. They are referenced by `fd.control("<internalName>")`

Fields include
- Data Table
- Text 
- HTML
- Ink Sketch

Additional documentation on fields can be found on the [Plumsail Forms Control Docs]

## Populating Fields

{: .note }
There is a difference between Controls and Fields. Make sure you reference them the correct way, as both fields and containers can be set.

You can access the value of either a field or a control using the `value` method. This will return what is shown on the Subcontractor form. Different types of fields/controls may yield a different data type. For example, running `fd.control("dataTable1").value` will return an array of objects. The key/value pair inside that object represents what is shown on the table.

|Element|.value returns|
|:-:|:-:|
|Attachment|Array of Objects, which contain the attachment information|
|Date|Date time string format|
|Data Table|Array of Objects, Objects Key/Value pair contains the column internal name|

Thus, we can run the following code to change the value of a field.

```js
//This sets the field called <internalName> as "Never Gonna Give You Up"
fd.field("<internalName>").value = "Never Gonna Give You Up";
```

## Disabling Fields

You may access the attribute `disabled` for both a control and a field. This disallows user input while keeping the old value. Item can still be set using JavaScript. The use case would be:

```js
//Disable a field named <internalName>
fd.field("<internalName>").disabled = true;

//Reenable a field named <internalName>
fd.field("<internalName>").disabled = false;
```

## Hiding Fields

There are two methods to hide an object. You can hide an object by referencing it directly or you can hide it using a class. The two function as an OR. If either hidden with class OR hidden with method, then the method will be hidden.

### Hide Using Class

```js
$("<className>").show();
$("<className>").hide();
```

### Hide Using Method

```js
fd.field("<internalName>").hidden = true;
fd.field("<internalName>").hidden = false;
```

## Field Change

This is a special function enabled by JQuery. Using this, we can create an event listener for the field or control using the `$on()` method. `change` indicates when the user is done altering the item, while `edit` is when the user first edits an item. More triggers can be found on https://docs.telerik.com/kendo-ui/api/javascript/, as the plumsail form is based on the Kendo UI for jQuery.

```js
fd.field("<internalName>").$on('change', callbackFunction);
fd.field("<internalName>").$on('edit', callbackFunction);

function callbackFunction() {
    //Something has changed about <internalName>. Do Something here
}
```

## Validators

Validators can be added to check for input errors. Validators can be added to pretty much anything, and is checked when running `fd.isValid`. `fd.isValid` will return a boolean value and throw errors at the top of the page. The validity check is done everytime the user clicks next on the wizard, allowing us to verify per MTA-required form. 

```js
//This adds a validator to the date field 'd.OCIP.FA.S2.workersCompExpiration'
//If it returns true, then the input is valid. False means there is an error.
//If the expiration date is before the start date, then throw an error.
fd.field('d.OCIP.FA.S2.workersCompExpiration').addValidator({
    name: 'Check Date',
    error: 'Expiration date must be after start date.',
    validate: function(value) {
        var projectEnd = moment(fd.field('d.OCIP.FA.S2.workersCompExpiration').value);
        var projectBegin = moment(fd.field('d.OCIP.FA.S2.workersCompEffective').value);
        if (projectEnd.isValid() && projectBegin.isValid()) {
            if(projectEnd.diff(projectBegin, 'days', false) <= 0) {
                return false;
            }
        return true;
        }
    } 
})
```

# General Useful JavaScript Features

## Return Promises

The internet is slow - when we request information, the data cannot be recieved right away. Take for example, the subcontractor form: when it requests autofill information, it must wait to recieve that information. Promises represent the eventual completion of an asynchronous operation. It frees up the CPU to complete other tasks while the data is still in transit.

Here is an example of a promise use case in the `subcontractor.js` file.

```js
//returns a promise (fetch)
return fetch(url, options)
//When the promise is fulfilled, the .then action is run, which will return the .json response of the server
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
//If there is any sort of error, check the error
      .catch(error => {
        console.error('Error:', error);
      });

```

More information can be found on the [Mozilla Docs for Promises]

## Async/Await

As before, data handling across the internet is asynchronous and can happen at any time. Async/Await is another way to handle this. 

Here is an example of a async/await use case in the `correction.js` file.

```js
    (async () => {
        //dataHandling.getContracts is called: it returns a promise, that when fulfilled will satisfy the await condition. Once the await condition is satisfied, the code will proceed.
        const value = await dataHandling.getContracts();
        //console.log(value);
        fd.field('dd.GI.contractNo').widget.dataSource.data(value);
    })();
```

More information can be found on the [Mozilla Docs for Async/Await]

## Try/Catch

Try/Catch can be used when interacting with user input. User input isn't its only use, but because it can be unpredictable, try/catch is a way to try to execute something, but handle any errors that might come about with the user input. We've seen evidence of this above in #async/Await.

```js
try {
                let internalName = el.internalName;
                if (!editable.includes(el.internalName)) {
                    switch(internalName.substr(0, 2)) {
                        ...
                        //The code here autofills the form with information.
                        //Maybe that information might not match anything and the computer throws an error saying its location can't be found.
                        //Maybe somehow a user breaks the insertion using a character that was never accounted for.
                        ...
                }
            } catch (err) {
                //Whatever the error is, we can simply print it to the console and move on to finishe verything else.
                console.log(err);
            }
```

## forEach

Given a list or an array, forEach will loop through each of the values. Its basically a traditional for loop without dealing with the indexing.

```js
//This function helps to set up the event listeners foe each of the values in the array <arrayOfEvents>. It is located in subcontractor.js.
eventListenerHelper: function(arrayOfEvents, callbackFcn) {
        arrayOfEvents.forEach(field => fd.field(field).$on('change', (value) => callbackFcn.call(this, value)));
    },
```

## Callback Functions

Callback functions are passed as an argument to another function. In the case here, the callback function is called when a something changes.

----

[Plumsail Documentation]: https://plumsail.com/docs/forms-web/index.html
[Plumsail Docs Form Manager]: https://plumsail.com/docs/forms-web/designer/javascript/form-manager.html#
[Plumsail Forms Field Docs]: https://plumsail.com/docs/forms-web/designer/fields/index.html
[Plumsail Forms Control Docs]: https://plumsail.com/docs/forms-web/designer/controls/index.html
[Mozilla Docs for Promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[Mozilla Docs for Async/Await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[Forms for Sharepoint]: https://plumsail.com/docs/forms-sp/index.html
