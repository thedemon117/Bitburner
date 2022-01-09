import {maxThreads} from "/sInfo.js";
import {sendIT, cleanFS} from "/remote.js"

/** @param {NS} ns **/
export async function main(ns) {
    const serv = ns.args[0];  
    const target = ns.args[1];
    const t_script = ns.args[2];

    cleanFS(ns, serv);
    await sendIT(ns, serv);

    //let maxThreads = (ns.getServerMaxRam(serv)/ns.getScriptRam(t_script));
    const mThreads = maxThreads(ns, serv, t_script);

    ns.exec(t_script, serv, mThreads, target);

}