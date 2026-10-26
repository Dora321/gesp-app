import"./rolldown-runtime-WkwZ5CU-.js";import{a as e,n as t,t as n}from"./react-DDlm69aD.js";import{t as r}from"./useTranslation-BOVvIk4x.js";import{t as i}from"./SequenceDiagram-BxQe0z2S.js";e();var a=t(),o={weather:{wait:[1,4],lanes:[{id:`loop`,name:`loop()`},{id:`worker`},{id:`server`,name:`api.open-meteo.com`}],steps:[{f:0,t:1,msg:`weather job`,ms:0,id:`job`,code:`Request{ job: Weather,
         place: Hamburg, Germany (53.55, 9.99) }`},{f:1,t:2,msg:`connect :443`,ms:70,net:!0,id:`connect`,code:`DNS  api.open-meteo.com → an IP address
TCP  connect to <ip>:443`},{f:2,t:1,msg:`certificate`,ms:160,net:!0,id:`tls`,code:`certificate for: open-meteo.com
signed by: an intermediate CA
  → a root in the firmware's CA bundle ✓
name matches ✓   keys agreed ✓`},{f:1,t:2,msg:`GET /v1/forecast?…`,ms:15,net:!0,id:`get`,code:`GET /v1/forecast?latitude=53.55&longitude=9.99
    &current=temperature_2m,weather_code,…
    &hourly=temperature_2m,precipitation_probability
    &forecast_hours=24&daily=…&forecast_days=7`},{f:2,t:1,msg:`200 OK · 1.7 KB JSON`,ms:120,net:!0,id:`json`,code:`{"current":{"temperature_2m":11.2,"weather_code":61,…},
 "hourly":{"time":["2026-10-12T14:00",…24],
           "temperature_2m":[11.2,11.0,…24],…},
 "daily":{"time":[…7],"temperature_2m_max":[14,…7],…}}`},{f:1,t:1,msg:`filter + parse`,ms:4,id:`filter`,code:`kept     current.*  hourly.temperature_2m[24]
         hourly.precipitation_probability[24]  daily.*[7]
dropped  hourly.time[24]  daily.time[7]   (≈30 %)`},{f:1,t:0,msg:`Weather struct`,ms:0,id:`back`,code:`Weather{ temp: 11.2, feels: 8.9, code: 61,
         hourTemp[24], hourRain[24],
         dayMin[7], dayMax[7] }   version 42 → 43`},{f:0,t:0,msg:`draw`,ms:0,id:`draw`,code:`frame 4711: now view · light rain · 11°C`}]},oracle:{wait:[1,6],lanes:[{id:`loop`,name:`loop()`},{id:`worker`},{id:`gateway`,name:`LiteLLM`},{id:`provider`}],steps:[{f:0,t:1,msg:`oracle job`,ms:0,id:`job`,code:`{"place":"Hamburg, Germany","local_time":"Sunday 12 October, 14:20",
 "weather":{"now":"light rain","temp_c":11.2,…},
 "bench":{"chip_temp_c":41.5,"wifi_signal_dbm":-54}}`},{f:1,t:2,msg:`POST /v1/chat/completions`,ms:40,net:!0,id:`request`,code:`POST http://<your Mac>:4000/v1/chat/completions
Authorization: Bearer sk-bench-…
{"model":"oracle","messages":[…],
 "tools":[{"type":"function","function":{"name":"show_on_bench",
   "parameters":{title, lines, color, scene}}}],
 "tool_choice":{"type":"function","function":{"name":"show_on_bench"}}}`},{f:2,t:2,msg:`name → model`,ms:2,id:`route`,code:`model_name: oracle
  model: anthropic/claude-opus-5-5
  api_key: os.environ/ANTHROPIC_API_KEY`},{f:2,t:3,msg:`provider's own API`,ms:60,net:!0,id:`translate`,code:`POST https://api.anthropic.com/v1/messages
{…, "tool_choice":{"type":"tool","name":"show_on_bench"}}`},{f:3,t:3,msg:`writing…`,ms:2400,net:!0,live:!0,id:`writing`,code:``},{f:3,t:2,msg:`function call`,ms:60,net:!0,id:`call`,code:`{"title":"Drizzle hum","color":"#5fa8ff","scene":"rain",
 "lines":["Rain taps the window","the chip hums at forty-two",
          "solder waits for sun"]}`},{f:2,t:1,msg:`OpenAI-style answer`,ms:30,net:!0,id:`standard`,code:`choices[0].message.tool_calls[0].function.arguments =
  "{\\"title\\":\\"Drizzle hum\\",\\"color\\":\\"#5fa8ff\\",…}"
usage: prompt_tokens 612 · completion_tokens 94`},{f:1,t:1,msg:`parse twice + clean`,ms:3,id:`parse`,code:`parse answer → arguments (a string)
parse arguments → title, lines[3], color, scene
#5fa8ff → r 95, g 168, b 255`},{f:1,t:0,msg:`OracleAnswer`,ms:0,id:`show`,code:`OracleAnswer{ title: Drizzle hum, lines[3], led #5fa8ff,
              scene: rain, 612 > 94 tokens, 2.6 s }`}]}},s=[`msg`,`wait`,`loop`];function c(e,t){return{label:t.label,...e.wait?{wait:e.wait}:{},lanes:e.lanes.map(e=>{let n=t.lanes[e.id];return[e.name??n?.name??e.id,n?.sub??``]}),steps:e.steps.map(({id:e,...n})=>{let r=t.steps[e];return{...n,title:r?.title??e,text:r?.text??``}})}}function l(e){return{weather:c(o.weather,e.weather),oracle:c(o.oracle,e.oracle)}}var u=(e,t)=>`worker task  waiting on the network … ${t} s\nloop()       frame ${e} drawn, the sky still animating`,d=n();function f(e,t){if(!t?.length)return e;let n=Object.fromEntries(t.flatMap(t=>e[t]?[[t,e[t]]]:[]));return Object.keys(n).length?n:e}function p(e){let t=(0,a.c)(10),{panel:n}=e,{t:o}=r(`labs-wifi`),c;t[0]===o?c=t[1]:(c=l({weather:o(`https.weather`,{returnObjects:!0}),oracle:o(`https.oracle`,{returnObjects:!0})}),t[0]=o,t[1]=c);let p=c,m;t[2]===o?m=t[3]:(m=s.map(e=>({kind:e,label:o(`https.legend.${e}`)})),t[2]=o,t[3]=m);let h=m,g=n?.flows,_;t[4]!==p||t[5]!==g?(_=f(p,g),t[4]=p,t[5]=g,t[6]=_):_=t[6];let v;return t[7]!==h||t[8]!==_?(v=(0,d.jsx)(i,{flows:_,legend:h,frames:!0,waitLane:1,live:u}),t[7]=h,t[8]=_,t[9]=v):v=t[9],v}export{p as HttpsFlow};
//# sourceMappingURL=HttpsFlow-DZA0d8rj.js.map