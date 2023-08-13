function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function submit(name, queue) {
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
  // console.log(columnNumber);
  sheet.getRange("A2").activate;
  
  Logger.log(sheet.getLastRow());
  if (sheet.getLastRow() == 0) {
    var data = sheet.getRange(1, columnNumber, 1, 1).getValues();
  } else {
    var data = sheet.getRange(1, columnNumber, sheet.getLastRow(), 1).getValues();
  }
  
  // console.log(data);
  Logger.log(data);
  var spaceCount = 0;
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === targetWord) {
      break;
    }
    else {
      spaceCount++;
    }
  }
  spaceCount = spaceCount + 1
  Logger.log("Your position in the queue: " + spaceCount);
  return spaceCount;
}


