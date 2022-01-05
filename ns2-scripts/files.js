/** @param {NS} ns **/
export async function filesHack(ns, serv, scriptName) {
    //var files = ['weaken.js','grow.js','hack.js']; 
    await ns.scp(scriptName, "home", serv);
	await ns.asleep(250);
}

