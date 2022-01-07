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

    //var maxMoney = ns.getServerMaxMoney(starget);
    //var availMoney = ns.getServerMoneyAvailable(starget);
    //var h_analyze = ns.hackAnalyze(starget);


    ns.tprint(ns.nFormat(moneyMax, '$0,0.00') +" Max");
    ns.tprint(ns.nFormat(moneyAvailable, '$0,0.00')+" Availble");
    ns.tprint("Hack required: "+requiredHackingSkill);
    ns.tprint(baseDifficulty+" Base Difficulty.");
    ns.tprint(minDifficulty+" Min Difficutly.");
    ns.tprint(serverGrowth+" Server Growth.")
    //ns.tprint("Hack analyze: " + h_analyze);
    //await ns.sleep(1000);
}

export async function allHackStuff(ns, starget) {
    var h_analyze = await Math.floor(0.50 / ns.hackAnalyze(starget));

    ns.tprint("1 thread: "+ h_analyze);
    ns.tprint("100 threads: "+ (100 * h_analyze));
    ns.tprint("1k threads: "+ (1000 * h_analyze));
}

//Math.floor((0.50 / ns.hackAnalyze(

export function money_server_list(ns) {
    const server_list = ['n00dles','joesguns','omega-net','silver-helix','crush-fitness',
                        'zb-def','zeus-med','lexo-corp','millenium-fitness','defcomm',
                        'univ-energy','the-hub','johnson-ortho','aerocorp','solaris'];

    return server_list;
}

export function maxThreads(ns, serv, t_script) {
    var maxThreads = (ns.getServerMaxRam(serv)/ns.getScriptRam(t_script));
    
    return maxThreads;
}


/** @param {NS} ns **/
export async function main(ns) {
    // Give this beast a target to get info from
    var target = ns.args[0];

    // Grab Money info using function
    allTheMonies(ns, target);

    //await ns.sleep(1000);

    // Grab Money info based on the hackAnalyze function
    //allHackStuff(ns, target);
}