// Runs a Grow/Weaken cycle on home (works better with more cores)
/** @param {NS} ns **/
export async function main(ns) {
    let target = ns.args[0];

    ns.run("grow.js",500,target);
    ns.run("weaken.js",200, target);
    ns.tprint("Grow/weakening " + target);

}