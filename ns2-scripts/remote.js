// This is currently broken and throwing an error about fileExists

/** @param {NS} ns **/
export async function cleanFS(ns, serv) {
    var old_scripts = ['target-hack.script','target-grow.script','target-weaken.script','soften-target.script'];

    for (var i = 0; i < old_scripts.length; i++) {
            var x =  (ns.fileExists(old_scripts[i], serv));
            
            if (x) { 
                rm(old_scripts[i]);
            }
        } 
}

export async function hackFiles(ns, serv) {
    var theScripts = ['hack.js','grow.js','weaken.js']
    await ns.scp(theScripts, "home", serv);
}


/** @param {NS} ns **/
export async function main(ns) {
    const serv = ns.args[0];  
    const target = ns.args[1];
    const t_script = ns.args[2];
    const t_threads = ns.args[3];

    //if ns.getRunningScript(t_script) == true {}
    // find script by pid with args?

    cleanFS(serv);
    await hackFiles(serv);

    var maxThreads = (ns.getServerMaxRam(serv)/ns.getScriptRam(t_script));
    
    ns.print("MaxThreads: "+ maxThreads);

    ns.exec(t_script, serv, t_threads, target);

}
