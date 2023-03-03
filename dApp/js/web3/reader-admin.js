
async function updateAdminPages(){
	cmtat_instace_read = await new web3Infura.eth.Contract(
		cmtat_abi,
		CMTAT_address
	);
	vesting_instace_read = await new web3Infura.eth.Contract(
		vesting_abi,
		vesting_address
	);
	try {updateVestedTokens(vesting_instace_read)}catch(e){console.log(e)}
  try {getAllVesting(vesting_instace_read)}catch(e){console.log(e)}
  try {loadSnapshots(vesting_instace_read)}catch(e){console.log(e)}
}

updateAdminPages()


async function loadSnapshots(){

	// let snapshots = await cmtat_instace_read.methods.getNextSnapshots().call();
  let snapshots = await cmtat_instace_read.methods.getAllSnapshots().call();

  document.querySelector("#snapshots-count").innerHTML = snapshots.length;
	document.querySelector("#snapshots").innerHTML = ''
	for(var i = 0 ; i < snapshots.length; i++){

    var time = snapshots[i] * 1000
    var timeHuman = new Date(parseInt(time));
		document.querySelector("#snapshots").innerHTML += '<div class="row-14">\
			<h3 class="h345">'+(i+1)+'</h3>\
			<h4 class="sat-feb-11">'+timeHuman+'('+snapshots[i]+')</h4>\
		</div>'

		// '<tr>\
    //   <td><span class="purple__text">'+(i+1)+'</span></td>\
    //   <td><span class="gold__text"></span></td>\
    //   <td><span class="gold__text" style="font-size:12px">'+timeHuman+'</span></td>\
    // </tr>'
		// pendingToken.push(pending);
	}

}

async function updateVestedTokens(){
  var decimals =  await cmtat_instace_read.methods.decimals().call();
  // console.log("decimals: ", decimals)
  // console.log("10**decimals: ", 10**decimals)
	var vestedTokens =  await vesting_instace_read.methods.getVestingSchedulesTotalAmount().call();

  document.querySelector("#vested-tokens").innerText = (vestedTokens/(10**decimals));
}


async function getAllVesting(vesting_instace_read){
  var decimals =  await cmtat_instace_read.methods.decimals().call();
  var symbol =  await cmtat_instace_read.methods.symbol().call();
  var count = 0
  var proceed = true
  var timeNow = Date.now();
	timeNow = timeNow/1000
	timeNow = parseInt(timeNow)

	var vestingSchedulesCount =  await vesting_instace_read.methods.getVestingSchedulesCount().call();

	var decimals =  await cmtat_instace_read.methods.decimals().call();
	document.querySelector("#vestings").innerHTML = ''
  do{
    try{
      var vestedTokensId =  await vesting_instace_read.methods.getVestingIdAtIndex(count).call();

      // console.log("vestedTokensId: ", vestedTokensId)
      var schedule = await await vesting_instace_read.methods.getVestingSchedule(vestedTokensId).call()
      // console.log("schedule: ", schedule)
  		var cliff = parseInt(schedule['cliff'])  - parseInt(schedule['start'])
  		var remaining = parseInt(schedule['start']) + cliff + parseInt(schedule['duration']) - timeNow
  		remaining = remaining > 0 ? remaining : 0
  		var days = remaining / (3600*24)
  		days = parseInt(days)
  		var hours = remaining % (3600*24)
  		hours = hours / 3600
  		hours = parseInt(hours)
  		// var pending = vestings[i]['pending'];
      var holder_truncated = schedule['beneficiary'].substring(0, 6) +" ... "// +schedule['beneficiary'].substr(selectedAccount.length - 3);
			// console.log("holder_truncated: ", holder_truncated)
			if(! schedule['revoked']){
			// console.log("in holder_truncated: ", holder_truncated)
			document.querySelector("#vestings").innerHTML += '<div class="row-13">\
				<h3 class="x85410" style="font-size: 14px;"><a target="_blank" href="https://mumbai.polygonscan.com/address/'+schedule['beneficiary']+'">'+holder_truncated+'</a></h3>\
				<h3 class="h329">'+kFormatter((schedule['amountTotal']))+'</h3>\
				<h3 class="d8t5">'+kFormatter((schedule['released']/(10**decimals)))+' '+symbol+'</h3>\
				<h3 class="d8t5">'+days+'D '+hours+'</h3>\
				<a class="revoke" onclick="revoke('+count.toString()+')">Revoke</a>\
			</div>'


  		}
			count  += 1;
    }catch(e){
      console.log("e: ", e)
      proceed = false;
    }
  }while(proceed && count < vestingSchedulesCount)
  // document.querySelector("#vested-tokens").innerText = (vestedTokens/(10**decimals));
}
