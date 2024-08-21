function Removeandmove() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A4').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('A5:A10').moveTo(spreadsheet.getActiveRange());
};

function move() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A4:A6').activate();
  spreadsheet.getRange('A5:A7').moveTo(spreadsheet.getActiveRange());
};