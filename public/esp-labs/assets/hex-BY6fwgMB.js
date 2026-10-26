var e=e=>e.toString(16).toUpperCase().padStart(2,`0`),t=t=>t.map(e).join(` `),n=e=>[...e].map(e=>e.charCodeAt(0)),r=e=>[e&255,e>>8&255],i=e=>e<<24>>24;export{r as a,i,e as n,t as r,n as t};
