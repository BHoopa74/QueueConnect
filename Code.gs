function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function submit(name, queue) {
  var url = "https://docs.google.com/spreadsheets/d/11vMUs21wu_YQox5DDEywTrdxsfyjpaAOMFmeYJbHZ5g/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("queue");
  ws.appendRow([name]);
}
