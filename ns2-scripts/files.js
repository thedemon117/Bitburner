export let userDebug = false;

/** @param {NS} ns **/
export async function filesHack(ns, serv, scriptName) {
    //let files = ['weaken.js','grow.js','hack.js']; 
    await ns.scp(scriptName, "home", serv);
	await ns.asleep(250);
}

/** @param {NS} ns **/
export async function cleanFS(ns, serv) {
    let old_scripts = ['target-hack.script','target-grow.script','target-weaken.script',
                        'soften-target.script','grow-target.script','hack-cycle.script'];

    for (let i = 0; i < old_scripts.length; i++) {
            let x =  (ns.fileExists(old_scripts[i], serv));
            
            if (x) { 
                rm(old_scripts[i]);
            }
        } 
}

export async function sendIT(ns, serv) {
    let theScripts = ['hack.js','grow.js','weaken.js'];
    
    for (let i = 0; i < theScripts.length; i++) {
        await ns.scp(theScripts[i], "home", serv);
    }
}

/*
export async function filesClear(ns) {
    var target = ns.args[0]; 
    var serv_files = [];

    const serv_files = ns.ls(target)

    //for (var i = 0; i < serv_files.length; ++i) {

        
    //}

}
*/