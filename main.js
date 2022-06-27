var today = Utilities.formatDate(new Date(), "America/New_York", "YYYY-MM-dd");

var ss = SpreadsheetApp.getActive();
var sheet =
  ss.getSheetByName(today) ||
  ss.insertSheet(today, { template: ss.getSheetByName("TEMPLATE") });

function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Hourly Pass Tracker");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getData() {
  try {
    var data = sheet.getDataRange().getValues();
    data.shift();
    return data;
  } catch (e) {
    return ["error", e.message];
  }
}

function addRow(customer, notes, now, end, hours) {
  var updatedSheet = sheet.appendRow([customer, notes, now, end, false, true]);
  var row = updatedSheet.getLastRow();
  webhook(row, "new");
}

function hourMath(row, n) {
  var range = sheet.getRange("D" + row + ":E" + row);
  var e = range.getValues()[0][0];
  e = e + n * 60 * 60 * 1000;

  range.setValues([[e, false]]);
  webhook(row, "edit");
}

function disable(row) {
  var range = sheet.getRange("f" + row);
  range.setValue(false);
}

function unhide(row) {
  var range = sheet.getRange("f" + row);
  range.setValue(true);
}

function activate(row) {
  var range = sheet.getRange("f" + row);
  range.setValue(true);
}

function setEdit(row, customer, notes, hours) {
  var range = sheet
    .getRange("A" + row + ":B" + row)
    .setValues([[customer, notes]]);
  hourMath(row, hours);
}

function timeUp(row) {
  var range = sheet.getRange("e" + row);

  if (range.getValue() == false) {
    range.setValue(true);
    webhook(row, "timeup");
  }
}

function webhook(row, tag) {
  var format = { color: 10197915, prefix: "" };

  if (tag == "new") {
    format = { color: 5301186, prefix: "" };
  }
  if (tag == "edit") {
    format = { color: 4868682, prefix: "edit — " };
  }
  if (tag == "timeup") {
    format = { color: 13632027, prefix: "TIME UP — " };
  }

  var values = sheet.getRange("A" + row + ":D" + row).getValues();
  var customer = values[0][0];
  var note = values[0][1];

  var end = values[0][3];

  var newDate = new Date();
  newDate.setTime(end);

  var endTime = Utilities.formatDate(newDate, "America/New_York", "h:mm");

  var title = format.prefix + customer + " — " + endTime;

  if (note != "") {
    var payloadContent = {
      embeds: [
        {
          author: {
            name: title,
          },
          description: note,
          color: format.color,
        },
      ],
    };
  } else {
    var payloadContent = {
      embeds: [
        {
          author: {
            name: title,
          },
          color: format.color,
        },
      ],
    };
  }

  var payload = JSON.stringify(payloadContent);

  var params = {
    headers: {
      "Content-Type": "application/JSON",
    },
    method: "POST",
    payload: payload,
    muteHttpExceptions: true,
  };

  //     DISCORD WEBHOOK URL

  var url = "https://discordapp.com/api/webhooks/504404427210227724/";

  var response = UrlFetchApp.fetch(url, params);
}
