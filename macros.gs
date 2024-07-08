function Removeandmove() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A4').activate();
  spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('A5:A10').moveTo(spreadsheet.getActiveRange());
};