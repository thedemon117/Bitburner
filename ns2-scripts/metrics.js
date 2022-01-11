import {
    hackAnalysis,
    basicServerInfo,
    msToTime
    } from '/server-library.js';

/** @param {NS} ns **/
export async function main(ns) {
let target = ns.args[0];

// Basic Server info from the Server Library
//let target_info = basicServerInfo(ns, target);

// Hack info/times from Server Library
//let hack_info = hackAnalysis(ns, target);

while (true) {
    let hack_info = hackAnalysis(ns, target);
    let target_info = basicServerInfo(ns, target);

    ns.print("Max: "+ns.nFormat(target_info[2], '$0,0.00'));
    ns.print("Available: "+ns.nFormat(target_info[1], '$0,0.00'));
    ns.print("Req. Haxxor lvl: "+ target_info[3]);
    ns.print("Minimum Sec lvl: "+ target_info[5]);
    ns.print("Current Sec lvl: "+ target_info[4]);
    ns.print("Weaken time: "+ msToTime(hack_info[5]));    
    ns.print("Grow time: "+ msToTime(hack_info[4]));  
    ns.print("Hack time: "+ msToTime(hack_info[3]));    

    //This is a dumb timer that is way too quick based on Weaken time/Hack time
    // Hack time is a little better for a sleep timer or hack_info[3]
    await ns.sleep((hack_info[5]/hack_info[3]));
}

}


/*
ns.tprint("Growth: "+ target_info[0]);
ns.tprint(ns.nFormat(target_info[1], '$0,0.00')+" Available");
ns.tprint(ns.nFormat(target_info[2], '$0,0.00')+" Max");
ns.tprint("Req. Haxxor lvl: "+ target_info[3]);
ns.tprint("Current Sec lvl: "+ target_info[4]);
ns.tprint("Min Sec lvl: "+ target_info[5]);

ns.tprint("1337 H@XX0R lvl: "+hack_info[0]);
ns.tprint("Threads for $1b: "+hack_info[1]);
ns.tprint("Threads for $10b: "+hack_info[2]);
ns.tprint("Hack time: "+ msToTime(hack_info[3]));    
ns.tprint("Grow time: "+ msToTime(hack_info[4]));  
*/