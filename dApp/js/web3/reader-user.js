
async function updateUserBalance(cmtat_instace_read){
	const acc = await web3.eth.getAccounts();

	let account = web3.utils.toChecksumAddress(acc[0]);
	var userBalance = await cmtat_instace_read.methods.balanceOf(account).call();
	// console.log("userBalance: ", userBalance)

  document.querySelector("#user-balance").innerText = userBalance;
}

async function updateUserBalanceSnapshot(cmtat_instace_read){
	const acc = await web3.eth.getAccounts();

	let account = web3.utils.toChecksumAddress(acc[0]);

	let snapshots = await cmtat_instace_read.methods.getAllSnapshots().call();

	 ;

	var userBalance = await cmtat_instace_read.methods.snapshotBalanceOf(snapshots[snapshots.length - 1], account).call();
	// console.log("userBalance: ", userBalance)

  document.querySelector("#snapshot-balance").innerText = userBalance;
}

async function updateVesting(vesting_instace_read){
	const acc = await web3.eth.getAccounts();

	let account = web3.utils.toChecksumAddress(acc[0]);
	var vestingsCount = await vesting_instace_read.methods.getVestingSchedulesCountByBeneficiary(account).call();
	// console.log("vesting schedule counts: ", vestingsCount)
	let vestings = await loadVestings(account, vestingsCount)
	// console.log("vestings: ", vestings )
	displayVestings(vestings)

  // document.querySelector("#user-balance").innerText = userBalance;
}

async function loadVestings(address, count){

	let vestingsSchedules = []
	let pendingToken = []
	console.log("load vesting")
	console.log("load vesting: ", address)
	console.log("load vesting: ", count)
	for(var i = 0 ; i < count; i++){
		console.log("load vesting for")
		var vestingSchedule = await vesting_instace_read.methods.computeVestingScheduleIdForAddressAndIndex(address,i).call();
		console.log("vestingSchedule: ", vestingSchedule)
		try{
			var pending = await vesting_instace_read.methods.computeReleasableAmount(vestingSchedule).call();
			console.log("vestingSchedule: ", vestingSchedule);
			console.log("pending: ", pending);
			vestingsSchedules.push({vestingSchedule,pending});
		}catch(e){
			console.log("e: ", e)
		}

		// pendingToken.push(pending);
	}
	return vestingsSchedules
}

async function loadUpomingSnapshot(cmtat_instace_read){
	let snapshots = await cmtat_instace_read.methods.getAllSnapshots().call();

	// document.querySelector("#snapshots-count").innerHTML = snapshots.length;
	// document.querySelector("#snapshots").innerHTML = ''
	var timeNow = Date.now();
	timeNow = timeNow/1000
	timeNow = parseInt(timeNow)
	for(var i = 0 ; i < snapshots.length; i++){
		if(timeNow < snapshots[i]){
			var time = snapshots[i]*1000
			var timeHuman = new Date(parseInt(snapshots[i]*1000));
			console.log("timeHuman: ", timeHuman)
			console.log("timeHuman: ", timeHuman.toLocaleTimeString())
			console.log("timeHuman: ", timeHuman.toLocaleDateString())
			document.querySelector("#upcoming-snapshot").innerHTML = '\
			<div class="upcoming-dividende-snapshot">\
					Upcoming dividende snapshot\
				</div>\
				<b class="b2" id="UpcomingTime">'+timeHuman.toLocaleTimeString()+'</b>\
				<p class="p" id="date">'+timeHuman.toLocaleDateString()+'</p>'
			return
		}

		// '<tr>\
		//   <td><span class="purple__text">'+(i+1)+'</span></td>\
		//   <td><span class="gold__text"></span></td>\
		//   <td><span class="gold__text" style="font-size:12px">'+timeHuman+'</span></td>\
		// </tr>'
		// pendingToken.push(pending);
	}
	document.querySelector("#upcoming-snapshot").innerHTML = '\
	<div class="upcoming-dividende-snapshot">\
			There is no upcoming snapshot\
		</div>\
		<b class="b2" id="UpcomingTime">Stay</b>\
		<p class="p" id="date">Tuned</p>'
}

async function displayVestings(vestings){

	// console.log("vestings: ", vestings);

	var symbol = await cmtat_instace_read.methods.symbol().call();
	const acc = await web3.eth.getAccounts();

	let account = web3.utils.toChecksumAddress(acc[0]);

	var timeNow = Date.now();
	timeNow = timeNow/1000
	timeNow = parseInt(timeNow)

	var decimals =  await cmtat_instace_read.methods.decimals().call();

	for(var i = 0 ; i < vestings.length; i++){

		var schedule = await await vesting_instace_read.methods.getVestingScheduleByAddressAndIndex(account, i).call()

		var cliff = parseInt(schedule['cliff'])  - parseInt(schedule['start'])
		var remaining2 = parseInt(schedule['start']) + cliff + parseInt(schedule['duration']) - timeNow
		remaining = remaining2 > 0 ? remaining2 : 0
		var days = remaining / (3600*24)
		days = parseInt(days)
		var hours = remaining % (3600*24)
		hours = hours / 3600
		hours = parseInt(hours)
		var pending = vestings[i]['pending'];

		if(pending > 0 || remaining2 > 0){
			console.log("schedule: ", schedule);
			document.querySelector("#claims").innerHTML += '\
			<div class="row-11">\
				<h3 class="h314">'+(i+1)+'</h3>\
				<h3 class="h34">'+kFormatter(schedule['amountTotal'])+'</h3>\
				<h3 class="d8t">'+kFormatter((vestings[i]['pending'])/(10**decimals))+' '+symbol+'</h3>\
				<h3 class="d8t">'+days+'D '+hours+'H</h3>\
				<a class="release" onclick="release('+i.toString()+')">Claim</a>\
			</div>'

		}

		// pendingToken.push(pending);
	}
}

async function updateUserPages(){
	cmtat_instace_read = await new web3Infura.eth.Contract(
		cmtat_abi,
		CMTAT_address
	);
	vesting_instace_read = await new web3Infura.eth.Contract(
		vesting_abi,
		vesting_address
	);
	try {updateUserBalance(cmtat_instace_read)}catch(e){console.log(e)}
	try {updateVesting(vesting_instace_read)}catch(e){console.log(e)}
	try {updateUserBalanceSnapshot(cmtat_instace_read)}catch(e){console.log(e)}
	try {loadUpomingSnapshot(cmtat_instace_read)}catch(e){console.log(e)}


}

updateUserPages()
