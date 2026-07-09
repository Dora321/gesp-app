#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dump L8 objective questions needing explanation upgrade.
For each L8 question whose explanation still contains a stale
"缺失 / 无法独立核实 / 未经独立核实" claim, extract:
  - type, options (current, recovered), answer letter
  - stem (pdfBody from v2 if available)
  - current explanation
  - flags: recovered (in 47-set), option_claim, stem_claim
Output: tmp/l8-upgrade-input.json
"""
import json, re, os, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
L8 = os.path.join(ROOT, 'src', 'data', 'gesp', 'level8')
PROG = os.path.join(L8, 'programming.js')
V2 = os.path.join(ROOT, 'tmp', 'reconstruct-input-v2.json')
RECON = os.path.join(ROOT, 'tmp', 'all-reconstructed.json')
OUT = os.path.join(ROOT, 'tmp', 'l8-upgrade-input.json')

# 47 recovered qids (options were placeholders, now real)
recon = json.load(open(RECON))
recovered = set(k for k in recon if k.startswith('202') and 'l8' in k.split('#')[0])

# v2 pdfBody by "paperId#qid"
v2 = json.load(open(V2))
v2map = {f"{x['paperId']}#{x['questionId']}": x for x in v2}

# preload l8ProgrammingByPaper so L8 paper files eval cleanly
prog_src = open(PROG, encoding='utf-8').read()
m = re.search(r'const l8ProgrammingByPaper\s*=\s*\{.*?\n\};', prog_src, re.S)
l8const = m.group(0) if m else 'const l8ProgrammingByPaper = {};'

# stale-claim detection
opt_claim_re = re.compile(r'选项[^。，]*?缺失|选项文本[^。，]*?缺失|选项被污染|选项缺失|选项在源数据中缺失|选项文本在数据中缺失')
stem_claim_re = re.compile(r'程序[^。，]*?缺失|代码[^。，]*?缺失|题面[^。，]*?缺失|图示缺失|代码被污染|语句缺失|条件缺失|函数与下界|复杂度符号|题干数字|题干公式|通项公式与求和公式')
unverif_re = re.compile(r'无法独立核实|未经独立核实|未经核实|无法核对|不能独立')

out = []
files = sorted(glob.glob(os.path.join(L8, '*-l8.js')))
for fp in files:
    src = open(fp, encoding='utf-8').read()
    paperId = os.path.basename(fp)[:-3]
    # strip import + export lines; preload l8 const + mock tags
    clean = re.sub(r'^import .*$', '', src, flags=re.M)
    clean = re.sub(r'^export .*$', '', clean, flags=re.M)
    clean = re.sub(r'^const l8ProgrammingByPaper.*?;\s*$', '', clean, flags=re.M|re.S)
    mock = "const LEVEL8_TAGS = new Proxy({}, { get: () => ({}), getOwnPropertyDescriptor: () => ({}) });"
    try:
        ns = {}
        exec(f"{l8const}\n{mock}\n{clean}\n", ns)
    except Exception as e:
        print(f"EVAL FAIL {paperId}: {e}")
        continue
    pd = ns.get('paperData')
    if not pd:
        print(f"NO paperData {paperId}")
        continue
    for q in pd.get('questions', []):
        qid = q.get('id')
        key = f"{paperId}#{qid}"
        expl = q.get('explanation', '') or ''
        if not opt_claim_re.search(expl) and not stem_claim_re.search(expl) and not unverif_re.search(expl):
            continue  # not stale
        opts = q.get('options') or []
        ans = q.get('answer')
        v2e = v2map.get(key, {})
        stem = v2e.get('pdfBody', '')
        rec = key in recovered
        out.append({
            'paperId': paperId,
            'questionId': qid,
            'type': q.get('type'),
            'options': opts,
            'answer': ans,
            'answerLetter': None,
            'stem': stem,
            'currentExplanation': expl,
            'recovered': rec,
            'optionClaim': bool(opt_claim_re.search(expl)),
            'stemClaim': bool(stem_claim_re.search(expl)),
            'unverifiedClaim': bool(unverif_re.search(expl)),
        })

# derive answer letter from options index
letter = ['A','B','C','D','E','F']
for o in out:
    if isinstance(o['answer'], int) and 0 <= o['answer'] < len(o['options']):
        o['answerLetter'] = letter[o['answer']]
    elif isinstance(o['answer'], str) and o['answer'] in letter:
        o['answerLetter'] = o['answer']

json.dump(out, open(OUT, 'w'), ensure_ascii=False, indent=2)
# summary
n_rec = sum(1 for o in out if o['recovered'])
n_stem = sum(1 for o in out if o['stemClaim'])
n_opt = sum(1 for o in out if o['optionClaim'])
print(f"Total stale L8 questions: {len(out)}")
print(f"  recovered-options (47-set): {n_rec}")
print(f"  have option-missing claim: {n_opt}")
print(f"  have stem/program-missing claim: {n_stem}")
print(f"  both: {sum(1 for o in out if o['recovered'] and o['stemClaim'])}")
print(f"Wrote {OUT}")
for o in out:
    print(f"  {o['paperId']} Q{o['questionId']} type={o['type']} ans={o['answerLetter']} rec={o['recovered']} opt={o['optionClaim']} stem={o['stemClaim']} opts={len(o['options'])}")
