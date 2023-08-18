---
title: Future Considerations
layout: default
parent: Technical Specifications
nav_order: 7
#has_children: true
permalink: /docs/future
---

## Known Issues
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

## Tips
* If a flow fails to run, debug the flow and rerun the flow by clicking on the failed run and clicking "Resubmit" as this will not use up another Plumsail submission. 

## In the Future

* If I were to do this again, I would build an application from the ground up with the key difference of using a relational database. That way, all data is under our control instead of being sent between Plumsail, Power Automate, and SharePoint. A relational database would allow for more control over the data and how it is manipulated.

## Lessons Learned

Defintely plan before coding
Understand the full scope of the project to effectively plan and program
Go in with the OOP mindset: it will help clean up the code.
    Each page gets its own object, in a seperate .js file. That way, each object would have "Events that can occur".

Class Form has attributes: 
- PDF link
- Events that can occur
- Handle events
- Fields in the events

Each schedule would extend class form to contain schedule specific information.

Future considerations:
Forms to update