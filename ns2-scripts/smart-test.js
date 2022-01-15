import {sendIT} from '/remote.js';
import {maxThreads} from "/sInfo.js";


/** @param {NS} ns **/
export async function main(ns) {
    
    let target = ns.args[0];
    let serv = ns.args[1];

    let grow_time = ns.getGrowTime(target);
    let weaken_time = ns.getWeakenTime(target);
    let hack_time = ns.getHackTime(target);


    let minSecLevel = ns.getServerMinSecurityLevel(target)    
    let curSecLevel = ns.getServerSecurityLevel(target);

    await sendIT(ns, serv);

    // fire up a weaken script
    ns.run("weaken.js", 1000, target); // this should be run from "home"
    ns.run("grow.js", 1000, target); // this should be run from "home"

    while (true) {
        let maxMonies = ns.getServerMaxMoney(target);
        let availMonies = ns.getServerMoneyAvailable(target);
        
        let hThreads = maxThreads(ns, serv, "sim-hack.js");
        let gThreads = maxThreads(ns, serv, "sim-grow.js");
        let wThreads = maxThreads(ns, serv, "sim-weaken.js");

        ns.print((availMonies >= (maxMonies * .8))+" and "+((minSecLevel + 5) >= curSecLevel));
        ns.print("Must be ~ True True ~ to hack");
        ns.print("");
        if (availMonies >= (maxMonies * .8) && ((minSecLevel + 2) >= curSecLevel)) {
            ns.print("Weaken Time: "+weaken_time);
            ns.run("sim-weaken.js", 1000, target);
            //ns.killall(serv);
            ns.exec("sim-hack.js", serv, hThreads, target); // this should be a personal server to throw hack threads at the target
            await ns.sleep(10000);
        } else {
            ns.print("Weaken Time: "+weaken_time);
            //ns.killall(serv);
            ns.run("sim-weaken.js", 1000, target, 1);
            ns.exec("sim-grow.js", serv, gThreads, target); // this should be a personal server to throw hack threads at the target
            await ns.sleep(30000);
            // run grow from home, with sufficent threads determined by a 2x or 4x calc?
            // need to write and scp with sendIT a simple grow script
            //let this loop till money is to a certain point, then hack
        }
        await ns.sleep(1000); 
    }


}