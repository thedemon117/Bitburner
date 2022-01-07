/** @param {NS} ns **/
export async function cleanFS(ns, serv) {
    var old_scripts = ['target-hack.script','target-grow.script','target-weaken.script',
                        'soften-target.script','grow-target.script','hack-cycle.script'];

    for (var i = 0; i < old_scripts.length; i++) {
            var x =  (ns.fileExists(old_scripts[i], serv));
            
            if (x) { 
                rm(old_scripts[i]);
            }
        } 
}

export async function sendIT(ns, serv) {
    var theScripts = ['hack.js','grow.js','weaken.js'];
    
    for (var i = 0; i < theScripts.length; i++) {
        await ns.scp(theScripts[i], "home", serv);
    }
}


/** @param {NS} ns **/
export async function main(ns) {
    const serv = ns.args[0];  
    const target = ns.args[1];
    const t_script = ns.args[2];
    const t_threads = ns.args[3];

    //if ns.getRunningScript(t_script) == true {}
    // find script by pid with args?

    cleanFS(ns, serv);
    await sendIT(ns, serv);

    ns.exec(t_script, serv, t_threads, target);
    ns.tprint("Max ram: "+ns.getServerMaxRam(serv)+" used: "+ns.getServerUsedRam(serv));
}