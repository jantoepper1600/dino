const staticPaths = new Set(["/","/baum.svg","/berge/berg.svg","/berge/berg2.svg","/berge/berg3.svg","/berge/berg4.svg","/boden/boden.svg","/boden/boden2.svg","/boden/boden3.svg","/dino/","/favicon.svg","/fels/Fels-links.svg","/fels/Fels-rechts.svg","/fels/Fels2-links.svg","/fels/Fels2-rechts.svg","/huegel/huegel.svg","/huegel/huegel2.svg","/landschaft.ai","/manifest.json","/pflanze/Pflanze.svg","/pflanze/Pflanze2.svg","/phase2/baumstumpf.svg","/phase2/boden/boden.svg","/phase2/boden/boden2.svg","/phase2/boden/boden3.svg","/phase2/huegel/huegel.svg","/phase2/huegel/huegel2.svg","/phase3/skelett.svg","/phase3/typ.svg","/q-manifest.json","/robots.txt","/service-worker.js","/sitemap.xml","/t-rex.ai","/t-rex.svg"]);
function isStaticPath(method, url) {
  if (method.toUpperCase() !== 'GET') {
    return false;
  }
  const p = url.pathname;
  if (p.startsWith("/build/")) {
    return true;
  }
  if (p.startsWith("/assets/")) {
    return true;
  }
  if (staticPaths.has(p)) {
    return true;
  }
  if (p.endsWith('/q-data.json')) {
    const pWithoutQdata = p.replace(/\/q-data.json$/, '');
    if (staticPaths.has(pWithoutQdata + '/')) {
      return true;
    }
    if (staticPaths.has(pWithoutQdata)) {
      return true;
    }
  }
  return false;
}
export { isStaticPath };