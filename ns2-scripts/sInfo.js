/** @param {NS} ns **/
export function allTheMonies(ns, starget) {
    const target = ns.getServer(starget);

    const {
        hasAdminRights,
        numOpenPortsRequired,
        openPortCount,
        serverGrowth,
        hackDifficulty,
        baseDifficulty,
        minDifficulty,
        moneyAvailable,
        moneyMax,
        requiredHackingSkill,
    } = target;

    //let maxMoney = ns.getServerMaxMoney(starget);
    //let availMoney = ns.getServerMoneyAvailable(starget);
    //let h_analyze = ns.hackAnalyze(starget);
    let curSecLevel = ns.getServerSecurityLevel(starget);
    let minSecLevel = ns.getServerMinSecurityLevel(starget);
    let moneyMax1 = ns.nFormat(moneyMax, '$0,0.00');
    let moneyAvailble1 = ns.nFormat(moneyAvailable, '$0,0.00');

    ns.tprint(moneyMax1 +" Max");
    ns.tprint(moneyAvailble1 +" Availble");
    ns.tprint("Hack required: "+requiredHackingSkill);
    //ns.tprint(hackDifficulty+"Hack Diffiulty.")
    //ns.tprint(baseDifficulty+" Base Difficulty.");
    //ns.tprint(minDifficulty+" Min Difficutly.");
    ns.tprint(serverGrowth+" Server Growth.");
    ns.tprint("Current SecLevel: "+ curSecLevel);
    ns.tprint("Min SecLevel: "+minSecLevel);
    
    //should return this in an array so something can be done with it
}

/** @param {NS} ns **/
export async function allHackStuff(ns, starget, monies) {
    //let h_analyze = Math.floor(1/ns.hackAnalyze(starget));
    //let h_analyze = ns.hackAnalyze(starget);
    //let monies = parseInt(monies);
    let h_analyzeThreads = ns.hackAnalyzeThreads(starget, monies);

    //ns.hackAnalyze(

    //ns.tprint("1 thread: "+ h_analyze);
    //ns.tprint("100 threads: "+ (100 * h_analyze));
    //ns.tprint("1k threads: "+ (1000 * h_analyze));
    //ns.tprint("Max threads: "+ (616000 * h_analyze));
    ns.tprint("Threads for "+ns.nFormat(monies, '$0,0.00')+" per hack "+h_analyzeThreads);
}

//Math.floor((0.50 / ns.hackAnalyze(

/** @param {NS} ns **/
export function money_server_list(ns) {
    const server_list = ['n00dles','joesguns','omega-net','silver-helix','crush-fitness',
                        'zb-def','zeus-med','lexo-corp','millenium-fitness','defcomm',
                        'univ-energy','the-hub','johnson-ortho','aerocorp','solaris'];

    return server_list;
}

export function maxThreads(ns, serv, t_script) {
    let maxThreads = (ns.getServerMaxRam(serv)/ns.getScriptRam(t_script));
    
    return maxThreads;
}


/** @param {NS} ns **/
export async function main(ns) {
    // Give this beast a target to get info from
    let target = ns.args[0];
    let monies = ns.args[1];

    // Grab Money info using function
    allTheMonies(ns, target);

    //await ns.sleep(1000);

    // Grab Money info based on the hackAnalyze function
    allHackStuff(ns, target, monies);
}