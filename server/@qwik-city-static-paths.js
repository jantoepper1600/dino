const staticPaths = new Set(["/","/dino/","/dino/baum.svg","/dino/berge/berg.svg","/dino/berge/berg2.svg","/dino/berge/berg3.svg","/dino/berge/berg4.svg","/dino/boden/boden.svg","/dino/boden/boden2.svg","/dino/boden/boden3.svg","/dino/fels/Fels-links.svg","/dino/fels/Fels-rechts.svg","/dino/fels/Fels2-links.svg","/dino/fels/Fels2-rechts.svg","/dino/huegel/huegel.svg","/dino/huegel/huegel2.svg","/dino/pflanze/Pflanze.svg","/dino/pflanze/Pflanze2.svg","/dino/phase2/baumstumpf.svg","/dino/phase2/boden/boden.svg","/dino/phase2/boden/boden2.svg","/dino/phase2/boden/boden3.svg","/dino/phase2/huegel/huegel.svg","/dino/phase2/huegel/huegel2.svg","/dino/phase3/skelett.svg","/dino/phase3/typ.svg","/dino/t-rex.svg","/favicon.svg","/landschaft.ai","/manifest.json","/q-manifest.json","/robots.txt","/service-worker.js","/sitemap.xml","/t-rex.ai"]);
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