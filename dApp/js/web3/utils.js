function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function showModal(title, msg, type){
  console.log("showing modal: ", $('#windowModal'))
  console.log("title: ", title)
  $('#windowModal').modal('show')
  var title = $("#titleModalLabel");
  var body = $("#bodyModal");
  var typeEv = $(".modal-header");
  title.html("digit 8")
  body.html(msg)
  typeEv.addClass(type)
}

function removeLoader(){
    $('#divLoading').remove();
}

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}
