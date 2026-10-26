function e(e,t){if(!t?.length)return e;let n=Object.fromEntries(t.flatMap(t=>e[t]?[[t,e[t]]]:[]));return Object.keys(n).length?n:e}export{e as t};
