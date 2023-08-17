---
layout: default
title: "Technical Specifications"
nav_order: 4
has_children: true
permalink: /docs/techSpecs
---

# Technical Specifications
{: .no_toc}

## Table of Contents 
{: .no_toc}

1. TOC
{:toc}

## Applications Used

This project utilizes four main pieces of software: 
1. Plumsail Forms: Plumsail forms is the interface of this project: It is what subcontractors and TCE employees interact with.
2. JavaScript: JavaScript controls the form to make it interactive and dynamically respond to user input.
3. Power Automate: Power Automate runs the backend, from merging PDFs to processing submitted data.
4. Jekyll/GitHub Pages: GitHub pages hosts the documentation through the repository and is processed using Jekyll and the just-the-docs theme.

## Getting Started

Full documentation of Plumsail Forms can be found here: https://plumsail.com/docs/forms-sp/index.html
Basic editing is covered in brief at this link by Plumsail: https://plumsail.com/docs/forms-web/design.html. 

Plumsail Forms' free plan allows only 100 submissions per month, reset on the 1st of each month. We believe this should be plenty for the rate that TCE recieves these forms. However, more submissions can be brought.

[Back to Top]{#top}

## Register/Login

To make edits or make a new form, a Plumsail account must be created. Currently, this is being managed by the Microsoft login email TCIG@tcelect.net. The password is _________. Log in at https://account.plumsail.com/

{: .note}
> Note: If you want to make your own account to play around with, Plumsail has instructions on how to do so here: https://plumsail.com/docs/forms-web/design.html#register-a-plumsail-account 

Click on Forms to access all forms you have in the Plumsail account. In our case, we are mostly interested in the Subcontractor Forms, but you can create a new form if you need to make a form for another purpose. 

[Back to Top](#top)

## Basic Form Editing

Add elements by clicking and dragging them in from the side. There are a few categories of elements:
- [Containers]: Used to organize location of other elements
- [Fields]: Basic inputs for user to input information
- [Controls]: Text and Dynamic elements such as a submit button, Captcha, and ink sketch

Properties of elements are listed on the right side of the window, which can be edited for your needs. For example, if you want a field for an email, click and drag a new “Text” field to where you need it to go. On the right, you can then specify the format to be an email. 

![]({{ site.baseurl }}/assets/images/plumsail/plumsail.png)

Aside: You will notice that the pattern will update accordingly when you specify a particular format for a “Text” field. That strange expression is called Regex and is a way to represent a series of characters, also known as a string. It allows you to specify the exact format of strings. You can learn more at Regular expressions - JavaScript | MDN (mozilla.org) and play around with it using this link: https://regex101.com/ 

----

[Containers]: https://plumsail.com/docs/forms-web/designer/containers/index.html
[Fields]: https://plumsail.com/docs/forms-web/designer/fields/index.html
[Controls]: https://plumsail.com/docs/forms-web/designer/controls/index.html

[Plumsail Forms]: https://plumsail.com/docs/forms-web/index.html
[JavaScript]: https://developer.mozilla.org/en-US/docs/Web/javascript
[Power Automate]: https://learn.microsoft.com/en-us/power-automate/
[Jekyll/GitHub Pages]: https://pages.github.com/
[just-the-docs]: https://just-the-docs.github.io/just-the-docs/


[Back to Top](#top)