/** @param {import(".").NS } ns */
//From theDroidCore - thanks Teemo!
export function msToTime(duration) {
	var milliseconds = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

/** @param {NS} ns **/
export function basicServerInfo(ns, starget) {
    const target = ns.getServer(starget)

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

    let curSecLevel = ns.getServerSecurityLevel(starget);
    let minSecLevel = ns.getServerMinSecurityLevel(starget)
    let grow_analyze_2x = ns.growthAnalyze(starget, 2);
    let grow_analyze_4x = ns.growthAnalyze(starget, 4);
    let grow_analyze_500 = ns.growthAnalyze(starget, 500);
    let secIncrease_grow_2x = ns.growthAnalyzeSecurity(grow_analyze_2x);
    let secIncrease_grow_4x = ns.growthAnalyzeSecurity(grow_analyze_4x);
    let secIncrease_grow_500 = ns.growthAnalyzeSecurity(grow_analyze_500);

    let hack_thread_calc = ns.hackAnalyzeThreads(starget, 1e6);

    let target_getServer_full = [hasAdminRights, numOpenPortsRequired,openPortCount,serverGrowth,hackDifficulty,baseDifficulty,minDifficulty,moneyAvailable,moneyMax,requiredHackingSkill];

    let target_root = [hasAdminRights,openPortCount,numOpenPortsRequired];
    
    let target_hack = [serverGrowth,moneyAvailable,moneyMax,requiredHackingSkill,curSecLevel,minSecLevel,
                        grow_analyze_2x,grow_analyze_4x,grow_analyze_500,
                        secIncrease_grow_2x,secIncrease_grow_4x,secIncrease_grow_500];



    return target_hack

    // Expected output: n00dles [true,0,0,3000,1,1,1,0,1750000,1]
}


/** @param {NS} ns **/
export function serverExploitInfo(ns, serv) {
    // Get needed server information for exploitation



}

/** @param {NS} ns **/
export function hackAnalysis(ns, starget) {
    // Player's current hacklevel:
    let hackLvl = ns.getHackingLevel();

    let hack_thread_calc_1b = ns.hackAnalyzeThreads(starget, 1e9);
    let hack_thread_calc_10b = ns.hackAnalyzeThreads(starget, 1e10);

    let t_hack_time = ns.getHackTime(starget);
    let t_grow_time = ns.getGrowTime(starget);
    let t_weaken_time = ns.getWeakenTime(starget);

    let t_weaken_1 = ns.weakenAnalyze(1);
    let t_weaken_100 = ns.weakenAnalyze(100);
    let t_weaken_500 = ns.weakenAnalyze(500);


    let hack_calcs = [hackLvl,hack_thread_calc_1b,hack_thread_calc_10b,t_hack_time,t_grow_time,t_weaken_time,t_weaken_1,t_weaken_100,t_weaken_500];

    return hack_calcs
}

/** @param {NS} ns **/
export async function main(ns) {
    let target = ns.args[0];

    let target_info = basicServerInfo(ns, target);

    let hack_info = hackAnalysis(ns, target);

    ns.tprint("Growth: "+ target_info[0]);
    ns.tprint(ns.nFormat(target_info[1], '$0,0.00')+" Available");
    ns.tprint(ns.nFormat(target_info[2], '$0,0.00')+" Max");
    ns.tprint("Req. Haxxor lvl: "+ target_info[3]);
    ns.tprint("Current Sec lvl: "+ target_info[4]);
    ns.tprint("Min Sec lvl: "+ target_info[5]);
    ns.tprint("2x Growth threads: "+ parseInt(target_info[6])+". Security increase by "+ns.nFormat(target_info[9], '0.00%'));
    ns.tprint("4x Growth threads: "+ parseInt(target_info[7])+". Security increase by "+ns.nFormat(target_info[10], '0.00%'));
    ns.tprint("500 Growth threads: "+ parseInt(target_info[8])+". Security increase by "+ns.nFormat(target_info[11], '0.00%'));

    //megacorp [99,3273.230892812799,1229170901400,1159]

    ns.tprint("1337 H@XX0R lvl: "+hack_info[0]);
    ns.tprint("Threads for $1b: "+hack_info[1]);
    ns.tprint("Threads for $10b: "+hack_info[2]);
    ns.tprint("Hack time: "+ msToTime(hack_info[3]));    
    ns.tprint("Grow time: "+ msToTime(hack_info[4]));    
    ns.tprint("Weaken time: "+ msToTime(hack_info[5]));
    ns.tprint(" ");
    ns.tprint("Weak 1 thread:"+hack_info[6]);
    ns.tprint("Weak 100 threads:"+hack_info[7]);
    ns.tprint("Weak 500 threads:"+hack_info[8]);
}