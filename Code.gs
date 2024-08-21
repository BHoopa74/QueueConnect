function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function newQueue(name, password) { //adds a new queue to the spreadsheet
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  ss.insertSheet(name);
  ss.getRange("B1").setValue(password)
}

function countSheets() {
  return SpreadsheetApp.getActive().getSheets().length;
}

function getSheetNames() { //creates an array containing the name of each spreadsheet
  var out = new Array()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i=0 ; i<sheets.length ; i++) out.push( [ sheets[i].getName() ] )
  return out 
}

function submit(name, queue) { //submits a student's name into the queue
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  ss.getSheet
  ws.appendRow([name]);
}


function countSpacesAboveWord(name, queue) {
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

function get_queue_contents_GS(queue) {
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

function remove_name_from_queue(remove_name, queue) {
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  i = 1
  data = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();
  for (i in data) {
    if (data[i] == remove_name) {
      i++
      break
    } else {
      i++
    }
  }
  location = "A" + i
  Logger.log("The target name is: " + remove_name)
  Logger.log("The target name is in: " + queue)
  Logger.log("The name to be removed was found at: " + location)
  ws.getRange(location).activate();
  Logger.log("The item found at the location was: " + ws.getRange(location).getValues())
  ws.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  ws.getRange(i + 1, 1, ws.getLastRow() - i, 1).moveTo(ws.getRange(location));
  return(queue)
}

function move_name_up(move_name, queue) {
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  i = 1
  data = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();
  for (i in data) {
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

function move_name_down(move_name, queue) {
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(queue);
  i = 1
  data = ws.getRange(1, 1, ws.getLastRow(), 1).getValues();
  for (i in data) {
    if (data[i] == move_name) {
      i++
      break
    } else {
      i++
    }
  }
  move_location = "A" + i
  target_location = "A" + (i + 1)
  temp = ws.getRange(target_location).getValues();
  ws.getRange(target_location).setValue(move_name)
  ws.getRange(move_location).setValue(temp)  
  return(queue)
}