---
title: Future Considerations
layout: default
parent: Technical Specifications
nav_order: 7
#has_children: true
permalink: /docs/future
---

# Known Issues
* Subcontractor can submit multiple times with the same link.
*  Currently, Rachel's account is being used for the connection to Adobe PDF Services API. 
* Currently, the Adobe Acrobat Pro account is under Annalisa.
* Consider standardizing error messages for formatting things like zip-codes and phone numbers. This can help subcontractors better find where the errors are. 
* Consider changing 10b on Schedule F to a data table and match a variable that parses the arguments of the data table
* Consider changing the order of "No"s and "Yes"s in Schedule B Parts 3, 4, and 5
* In OCIP Form B, the running total is correct unless the user filters the responses, in which case the running total does not get recalculated with the different order
* When refilling the form for corrections, this does not check that the field is different than what was submitted
* Fields that were not required and not filled out are able to be edited with the corrections link
* Emails still look spammy

# Tips
* If a flow fails to run, debug the flow and rerun the flow by clicking on the failed run and clicking "Resubmit" as this will not use up another Plumsail submission. 

## In the Future

* If I were to do this again, I would build an application from the ground up with the key difference of using a relational database. That way, all data is under our control instead of being sent between Plumsail, Power Automate, and SharePoint. A relational database would allow for more control over the data and how it is manipulated.

## Lessons Learned

1. Defintely plan before coding. Understand the scope of the project, and then start planning around that.
2. Start coding with maintainability in mind: OOP is more readable than spagetti coded stuff, even if you're just trying things out. Trying things out in spaghetti code can end up messing up the final readability of the code. Start with OOP.
    * In this case, I would create a general class named "Form" which contains an event listener array, response, fields in arrays, and the PDF link.
    * The schedule A, schedule B, etc would become children of these forms that extend the capabilities to their specific functions.
    * Each page should also be in a seperate .js file, in order to truly break it down.



Class Form has attributes: 
- PDF link
- Events that can occur
- Handle events
- Fields in the events

Each schedule would extend class form to contain schedule specific information.

Future considerations:
Forms to update