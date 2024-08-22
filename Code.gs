function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function newQueue(name, password) { //adds a new queue to the spreadsheet called "name" and with "password"
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  ss.insertSheet(name);
  ss.getRange("B1").setValue(password)
}

function countSheets() { //counts how many spreadsheets there are
  return SpreadsheetApp.getActive().getSheets().length;
}

function getSheetNames() { //creates an array containing the name of each spreadsheet
  var out = new Array()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i=0 ; i<sheets.length ; i++) out.push( [ sheets[i].getName() ] )
  return out 
}

function submit(name, queue) { //submits a given student's name into the target queue
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  ss.getSheet
  ws.appendRow([name]);
}


function countSpacesAboveWord(name, queue) { //finds the position of a students name in a queue
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(queue);
  var targetWord = name; // Replace with the word you're searching for
  var columnNumber = 1; // Column number where you want to search (1 for column A)

  
  if (sheet.getLastRow() == 0) {
    var data = sheet.getRange(1, columnNumber, 1, 1).getValues();
  } else {
    var data = sheet.getRange(1, columnNumber, sheet.getLastRow(), 1).getValues();
  }

  var spaceCount = 0;
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === targetWord) {
      break;
    }
    else {
      spaceCount++;
    }
  }
  spaceCount = spaceCount + 1 // add one to find the user's position rather than amount of space above
  return spaceCount;
}

function get_queue_contents_GS(queue) { //returns an array of all names in a target queue
  names = []
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url).getSheetByName(queue);
  var values = ss.getDataRange().getValues()
  for (n = 0; n < values.length; ++n) {
    if (values[n][0] == null){
      break
    } else {
      var cell = values[n][0] ; // x is the index of the column starting from 0
    names.push(cell)
    }
  }
  return names
}

function remove_name_from_queue(remove_name, queue) { //removes a target name from a queue and moves all lower names up to fill the gap
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  i = 1
  data = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();
  for (i in data) { //finds the position of the target name
    if (data[i] == remove_name) {
      i++
      break
    } else {
      i++
    }
  }
  location = "A" + i
  ws.getRange(location).activate();
  ws.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  if (ws.getRange(i + 1, 1).getValues() != "") { //checks if the removed name was the last in the queue
    ws.getRange(i + 1, 1, ws.getLastRow() - i, 1).moveTo(ws.getRange(location)); //if the name was not the last, lower names are moved up
  }
  return(queue) //returns the name of the queue that was altered
}

function move_name_up(move_name, queue) { //swaps a name with the name above it
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  i = 1
  data = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();
  for (i in data) { //finds position of target name
    if (data[i] == move_name) {
      i++
      break
    } else {
      i++
    }
  }
  move_location = "A" + i
  target_location = "A" + (i - 1)
  temp = ws.getRange(target_location).getValues();
  ws.getRange(target_location).setValue(move_name)
  ws.getRange(move_location).setValue(temp)  
  return(queue)
}

function move_name_down(move_name, queue) { //swaps a name with the name below it
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  i = 1
  data = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();
  for (i in data) { //finds position of target name
    if (data[i] == move_name) {
      i++
      break
    } else {
      i++
    }
  }
  move_location = "A" + i
  target_location = "A" + (i + 1)
  if (ws.getRange(i + 1, 1).getValues() != "") { //condition prevents the bottom name being swapped with an empty cell
    temp = ws.getRange(target_location).getValues();
    ws.getRange(target_location).setValue(move_name)
    ws.getRange(move_location).setValue(temp) 
  } 
  return(queue) //returns the name of the altered queue
}