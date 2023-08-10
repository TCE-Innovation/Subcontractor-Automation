---
title: Plumsail Forms JavaScript Control
layout: default
nav_order: 3
parent: Technical Specifications
#has_children: true
permalink: /docs/techSpecs/js
---


# Table of Contents
{: .no_toc}

1. TOC
{:toc}

# About

Plumsail comes with a JavaScript editor built in. However, this isn't ideal in terms of debugging, organizing, and controlling the whole process. Thus, we've segmented the code into several parts.

# Plumsail's JavaScript

For all three forms, the internal JavaScript editor has the exact same code. Once the page is rendered and JQuery (A necessary compoennt to interacting with values on the submission forms) is loaded, then it calles the external file located in this github repo.

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

## Fields

Fields are basic inputs for the user to enter information. They are referenced by `fd.field("<internalName>")`

## Controls

Controls are text and dynamic elements, such as the submit button, captcha, and ink sketch. They are referenced by `fd.control("<internalName>")`

## Populating Fields

{: .note }
There is a difference between Controls and Fields. Make sure you reference them the right way, as both fields and containers can be set.

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

## Asynch/Await

## Try/Catch

## Return Promises

## forEach

## Callback Functions
----

[Plumsail Documentation]: https://plumsail.com/docs/forms-sp/index.html