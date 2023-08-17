---
title: Plumsail Forms
layout: default
parent: Technical Specifications
nav_order: 6
#has_children: true
permalink: /docs/techSpecs/plumsail
---

# Plumsail Forms
{: .no_toc}

## Table of Contents 
{: .no_toc}

1. TOC
{:toc}

## About Plumsail

Plumsail is a productivity company founded in 2011 with headquarters in Wilmington, Deleware. It was founded by 3 guys: [Anton Khritonenkov](https://www.crunchbase.com/person/anton-khritonenkov), [Dmitry Kozlov](https://www.crunchbase.com/person/dmitry-kozlov), and [Roman Rylov](https://www.crunchbase.com/person/roman-rylov). There are a myriad of products offered by Plumsail, and they are listed in the screenshot below.

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailProducts.png)

## Accessing Plumsail 
[You can access the plumsail forms by accessing the TCIG account.](https://plumsail.com/) By logging in, you will be able to access Plumsail Forms, Plumsail Documents, and Plumsail Actions. Here, we've used Plumsail Forms to build out the interface of the project. The following screenshots show how to log in:

![Plumsail Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailHome.png)
*Select "My Account"*

![Plumsail Choose Product]({{ site.baseurl }}/assets/images/plumsail/plumsailChooseProduct.png)
*Choose Forms*

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailFormsSplash.png)
*Navigate to forms on the left sidebar*

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailSelectForm.png)
*To select a form to edit, hover and click the edit button. Simply clicking the whitespace will bring you to the submissions tab instead.*

## Navigating/Editing Plumsail Forms

Plumsail generally has an intuitive drag and drop interface. The left side contains the elements that can be inputted onto the forms, while the right side dynamically changes based on whats selected. The center contains the form itself and will dynamically resize based on the size of the window. 

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailInterface.png)


## Quirks

1. If a css style is associated with the field/control that you are trying to move, the CSS will disappear upon movement. This includes CSS class, used to show/hide items. 
2. There is a very limited Copy and Paste functionality. Sometimes I found it easier to export the JSON and copy/paste based on that.