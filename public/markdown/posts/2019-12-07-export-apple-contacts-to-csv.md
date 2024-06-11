---
layout: post
title: Export Apple Contacts to CSV
categories: jekyll update
tags: [AppleScript]
---
![Apple Contacts to Football CSV](/assets/images/apple_contacts_football.jpg)

###  Overview
Perhaps it is time to:
* send the wedding invitations
* promote your new business
* share the baby registry
* plan the family reunion
* tell a lot of people about an important update in your life
* etc.

Wouldn't it be really great if you could get all the emails, phone numbers, and addresses, of the people your Apple Contacts into a spreadsheet?

Seemingly by design, however, Apple did not build in such functionality.

If you have a Mac, then I have a simple solution for you.

### Steps
* Open the Script Editor application
* Copy and paste the code (see below) into the window
* Press the play button at top
* Make selections on the following prompts:
  * Export **all** contacts or optionally just the **selected** ones
    * Note: for me, exporting all of my 1,041 contacts takes around a minute
  * choose output folder
  * choose desired filename
* Upon completion, you'll get a prompt with summary details:
  * number of contacts exported
  * execution time
  * output location
* Check out your new csv!

### Technical Details
* Any value in a contact's "Company" field will appear under the "description" column
* Since CSVs are delimited by commas, commas must be removed from relevant fields
  * commas replaced with "-" in first name, last name, or company
  * commas removed from addresses
  * any contact with more than one email/phone/address will be delimited with a ";"

### The Code
```applescript
-- Title: Export Apple Contacts to CSV
-- Author: Doug Issichopoulos, www.dougissi.com

-- ask user if wants to export ALL contacts or just a SELECTION
set selectionDialogResponse to display dialog "Which Apple Contacts do you want to export?

Optional: you can open Apple Contacts now and select specific people before proceeding" buttons {"Cancel", "Current Selection", "All"} default button "All"
set selectionButton to button returned of selectionDialogResponse
if selectionButton is "Cancel" then error number -128 -- "User canceled" error

-- prompt user for folder and filename for saving the output
set outputFolder to choose folder with prompt "Please select an output folder:"
set filenameDialogResponse to display dialog "Please provide a filename (no .csv extension needed)" default answer "apple_contacts"
set filename to text returned of filenameDialogResponse
set filename to my findAndReplaceInText(filename, ".csv", "")
set outputPath to (outputFolder & filename & ".csv") as string


-- set start time
set startTime to current date
log "start time: " & time string of startTime


tell application "Contacts"
	if selectionButton is "All" then
		set thePeople to people
	else
		set thePeople to selection
	end if

	-- get count of contacts
	set contactsCount to count of thePeople
	log "number of contacts to export: " & contactsCount

	-- initialize list of lines with header as first line
	set csvLines to {"first_name,last_name,description,email_addresses,phone_numbers,addresses"}

	repeat with thePerson in thePeople

		set firstName to first name of thePerson
		set lastName to last name of thePerson
		set notes to organization of thePerson

		set firstName to my ensureValueAndRemoveCommas(firstName, " -")
		set lastName to my ensureValueAndRemoveCommas(lastName, " -")
		set notes to my ensureValueAndRemoveCommas(notes, " -")
		set emailsStr to my convertAppleContactsSimpleItemsToString(emails of thePerson)
		set phonesStr to my convertAppleContactsSimpleItemsToString(phones of thePerson)
		set addressesStr to my convertAppleContactsAddressesToString(addresses of thePerson)

		-- make string for new line
		set newLine to my convertListToString({firstName, lastName, notes, emailsStr, phonesStr, addressesStr}, ",")

		-- add new line to list of lines
		set end of csvLines to newLine

	end repeat
end tell


-- write to csv
set csvData to convertListToString(csvLines, "
")
writeTextToFile(csvData, outputPath, true)


-- success display message
set endTime to current date
log "end time: " & time string of endTime
set executionSeconds to endTime - startTime
display dialog "Apple Contacts to CSV Export Complete!

Contacts exported: " & contactsCount & "
Execution time (seconds): " & executionSeconds & "

Output location:
" & POSIX path of outputPath buttons {"OK"}


on findAndReplaceInText(theText, theSearchString, theReplacementString)
	set AppleScript's text item delimiters to theSearchString
	set theTextItems to every text item of theText
	set AppleScript's text item delimiters to theReplacementString
	set theText to theTextItems as string
	set AppleScript's text item delimiters to ""
	return theText
end findAndReplaceInText



on ensureValueAndRemoveCommas(theValue, theReplacementString)
	if theValue is missing value then
		set theValue to ""
	else if theValue is "missing value" then
		set theValue to ""
	else
		set theValue to my findAndReplaceInText(theValue, ",", theReplacementString)
	end if
	return theValue
end ensureValueAndRemoveCommas


on convertListToString(theList, theDelimiter)
	set AppleScript's text item delimiters to theDelimiter
	set theString to theList as string
	set AppleScript's text item delimiters to ""
	return theString
end convertListToString


on convertAppleContactsSimpleItemsToString(theItems)
	tell application "Contacts"
		set itemsList to {}
		repeat with theItem in theItems
			set end of itemsList to (value of theItem)
		end repeat
		set itemsStr to my convertListToString(itemsList, "; ")
	end tell
	return itemsStr
end convertAppleContactsSimpleItemsToString


on convertAppleContactsAddressesToString(theAddresses)
	tell application "Contacts"
		set addressesList to {}
		repeat with theAddress in theAddresses
			set theStreet to my ensureValueAndRemoveCommas(street of theAddress as string, "")
			set theStreet to my findAndReplaceInText(theStreet, "
", " ")
			set theCity to my ensureValueAndRemoveCommas(city of theAddress as string, "")
			set theState to my ensureValueAndRemoveCommas(state of theAddress as string, "")
			set theZip to my ensureValueAndRemoveCommas(zip of theAddress as string, "")
			set theCountry to my ensureValueAndRemoveCommas(country of theAddress as string, "")

			-- exclude any blank parts of the address
			set addressPieces to {}
			repeat with thePiece in {theStreet, theCity, theState, theZip, theCountry}
				set thePiece to thePiece as string
				if thePiece is not "" then
					set end of addressPieces to thePiece
				end if
			end repeat

			set addressStr to my convertListToString(addressPieces, " ")
			set end of addressesList to addressStr
		end repeat
		set addressesStr to my convertListToString(addressesList, "; ")
	end tell
end convertAppleContactsAddressesToString


on writeTextToFile(theText, theFile, overwriteExistingContent)
	try

		-- Convert the file to a string
		set theFile to theFile as string

		-- Open the file for writing
		set theOpenedFile to open for access file theFile with write permission

		-- Clear the file if content should be overwritten
		if overwriteExistingContent is true then set eof of theOpenedFile to 0

		-- Write the new content to the file
		write theText to theOpenedFile starting at eof

		-- Close the file
		close access theOpenedFile

		-- Return a boolean indicating that writing was successful
		return true

		-- Handle a write error
	on error

		-- Close the file
		try
			close access file theFile
		end try

		-- Return a boolean indicating that writing failed
		return false
	end try
end writeTextToFile
```
