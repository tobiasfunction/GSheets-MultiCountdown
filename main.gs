var ss = SpreadsheetApp.openById('XXXXX-SPREADSHEET-ID-HERE-XXXXX').getSheetByName('Sheet1'); //Blank Spreadsheet


//     CLEAR function to be run on a 24 hour (or whatever suits your needs) trigger
//     Run before first use to create header rows

function clear(){  
  ss.clear();
  ss.appendRow(['Customer','Notes','Start Time','End Time','Time Up','Active','Row']);
}

function doGet() {
  return HtmlService
  .createTemplateFromFile('index')
  .evaluate()
  .setTitle('Hourly Pass Tracker');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}

function getData(boolean) {  
  Utilities.sleep(1000);
  try{
    var values= ss.getDataRange().getValues();
    
    var filtered = ArrayLib.filterByText(values, 5, boolean);
    return filtered;
  }
  
  catch(e){return ["error", e.message];}
}

function getHidden() {  
  var values= ss.getDataRange().getValues();
  Logger.log(values);
  
  var filtered = ArrayLib.filterByText(values, 5, 'FALSE');
  return filtered;
}

function addRow(customer,notes,now,end,hours){
  Utilities.sleep(1000);
  ss.appendRow([customer,notes,now,end,false,true]);
  var row= ss.getDataRange().getLastRow();
  Utilities.sleep(300);
  var range = ss.getRange("g"+row).setValue(row);
  discord(row, "new");
}

function hourMath(row,n){ 
  var range = ss.getRange('D'+row+':E'+row);
  var e = range.getValues()[0][0];
  e = e+n*60*60*1000;
  
  range.setValues([[e,false]]);  
  discord(row, "edit");
}

function disable(row){  
  var range = ss.getRange('f'+row);
  range.setValue(false);
}

function unhide(row){  
  var range = ss.getRange('f'+row);
  range.setValue(true);
}

function activate(row){  
  var range = ss.getRange('f'+row);
  range.setValue(true);
}


function setEdit(row, customer, notes, hours){
  var range = ss.getRange('A'+row+':B'+row).setValues([[customer,notes]]);  
  hourMath(row,hours);
}



function timeUp(row){
  var range = ss.getRange('e'+row);
  
  if(range.getValue() == false) {
    range.setValue(true);
    discord(row,"timeup");
  }
} 

function discord(row, tag){
  var format = {color:10197915, prefix:""};
  
  if(tag=="new"){ format={color:5301186, prefix:""};};
  if(tag=="edit"){ format={color:4868682, prefix:"edit — "};};
  if(tag=="timeup"){ format={color:13632027, prefix:"TIME UP — "};};
  
  var values = ss.getRange('A'+row+':D'+row).getValues();
  var customer = values[0][0];
  var note = values[0][1];
  
  var end = values[0][3];
  
  var newDate = new Date( );
  newDate.setTime(end);
  
  var endTime = Utilities.formatDate(newDate, "America/New_York", "h:mm");
  
  var title = format.prefix + customer + ' — '+ endTime ;
  
  if (note!=''){
  
  var payloadContent={
    "embeds": [
      {
        "author": {
        "name": title
      },
        "description" : note,
        "color": format.color
      }
    ]
  }
  }
  
  else{
    var payloadContent={
    "embeds": [
      {
        "author": {
        "name": title
      },
      "color": format.color
      }
    ]
  }
    
  }
  
  var payload = JSON.stringify(payloadContent);
  
  var params = {
    headers: {
      'Content-Type': 'application/JSON'
    },
    method: "POST",
    payload: payload,
    muteHttpExceptions: true
  };
  
//     DISCORD WEBHOOK URL

var url = 'https://discordapp.com/api/webhooks/XXXXX-DISCORD-WEBHOOK-XXXXX';
  
  var response = UrlFetchApp.fetch(url, params);
  
}
