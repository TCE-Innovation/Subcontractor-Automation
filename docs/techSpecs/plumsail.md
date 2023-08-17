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

Plumsail is a productivity company founded in 2011 with headquarters in Wilmington, Delaware. It was founded by 3 guys: [Anton Khritonenkov](https://www.crunchbase.com/person/anton-khritonenkov), [Dmitry Kozlov](https://www.crunchbase.com/person/dmitry-kozlov), and [Roman Rylov](https://www.crunchbase.com/person/roman-rylov). There are a myriad of products offered by Plumsail, and they are listed in the screenshot below.

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailProducts.png)

## Accessing Plumsail 
[You can access the plumsail forms](https://plumsail.com/) by accessing the TCIG account. By logging in, you will be able to access Plumsail Forms, Plumsail Documents, and Plumsail Actions. Here, we've used Plumsail Forms to build out the interface of the project. The following screenshots show how to log in:

![Plumsail Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailHome.png)
*Select "My Account" and log in with the correct credentials*

![Plumsail Choose Product]({{ site.baseurl }}/assets/images/plumsail/plumsailChooseProduct.png)
*Choose Forms*

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailFormsSplash.png)
*Navigate to forms on the left sidebar*

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsailSelectForm.png)
*To select a form to edit, hover and click the edit button. Simply clicking the whitespace will bring you to the submissions tab instead.*

## Navigating/Editing Plumsail Forms

Plumsail generally has an intuitive drag and drop interface. The left side contains the elements that can be inputted onto the forms, while the right side dynamically changes based on whats selected. The center contains the form itself and will dynamically resize based on the size of the window. 

![Plumsail Forms Splash page]({{ site.baseurl }}/assets/images/plumsail/plumsail.png)
*The left side contains elements to drop in. In this case, **email** is selected, and the right dynamic editor shows up. There, settings for the individual field can be changed, including requirement, regex verification, and styling options.*

## Exporting Forms

## Quirks

1. If a CSS style is associated with the field/control that you are trying to move, the CSS will disappear upon movement. This includes CSS class, used to show/hide items. 
2. There is a very limited Copy and Paste functionality accessable by right clicking (works with multiselect holding down shift too). Sometimes I found it easier to export the JSON and copy/paste based on that.
3. To publish a form to the web, you must request a review by Plumsail before they send out an official URL. However, they also offer a form embed, which we use here to get around the problem. I've embedded the form into an HTML page on the GitHub repo, thus circumventing their protection.
4. Data Tables, on occassion will render all splooshed together. They will expand and the contents readable when interacted with. The cause of this is unknown...
5. Plumsail Forms sometimes saves without you realizing. Other times, it doesn't. When altering the form, changes you make without saving may be reflected upong reload. Make sure to have backups handy and export the form often to do manual version control.
6. Ensure you save often. If the editor is left open for long periods of time, the current editing session expires, and local changes you make won't be pushed to the cloud. You must reload to refresh the session. 