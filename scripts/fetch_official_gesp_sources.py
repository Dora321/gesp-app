#!/usr/bin/env python3
"""Download official GESP paper PDFs from CCF pages and extract raw text.

Usage:
  python3 scripts/fetch_official_gesp_sources.py --article https://gesp.ccf.org.cn/101/1010/10200.html --query "C++ 4级试题" "C++ 5级试题" --out tmp/official/2025-03

This script is intentionally lightweight:
- finds matching anchor text on an official CCF GESP article page
- downloads the linked PDFs
- extracts raw text with pypdf for later cleaning
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen, Request

try:
    from pypdf import PdfReader
except Exception as exc:  # pragma: no cover
    print(f"Missing dependency pypdf: {exc}", file=sys.stderr)
    sys.exit(2)


def fetch(url: str) -> bytes:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 OpenClaw GESP Fetcher"})
    with urlopen(req) as resp:
        return resp.read()


def sanitize(name: str) -> str:
    name = re.sub(r"\s+", "-", name.strip())
    name = re.sub(r"[^0-9A-Za-z\-_.一-龥级月年C\+]+", "-", name)
    return re.sub(r"-+", "-", name).strip("-")


def extract_links(article_url: str, html: str, queries: list[str]) -> list[tuple[str, str]]:
    pairs: list[tuple[str, str]] = []
    for href, text in re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.I | re.S):
        clean = re.sub(r"<[^>]+>", "", text)
        clean = re.sub(r"\s+", " ", clean).strip()
        if all(q in clean for q in queries):
            pairs.append((clean, urljoin(article_url, href)))
    return pairs


def pdf_to_text(pdf_path: Path, txt_path: Path) -> None:
    reader = PdfReader(str(pdf_path))
    text = "\n\n".join((page.extract_text() or "").strip() for page in reader.pages)
    txt_path.write_text(text, encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--article", required=True)
    ap.add_argument("--query", nargs="+", required=True, help="Substrings that must all appear in anchor text")
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    html = fetch(args.article).decode("utf-8", errors="ignore")
    links = extract_links(args.article, html, args.query)
    if not links:
        print("No matching links found.", file=sys.stderr)
        return 1

    index_lines = []
    for text, url in links:
        base = sanitize(text)
        suffix = Path(urlparse(url).path).suffix or ".pdf"
        pdf_path = out_dir / f"{base}{suffix}"
        txt_path = out_dir / f"{base}.txt"
        pdf_path.write_bytes(fetch(url))
        pdf_to_text(pdf_path, txt_path)
        index_lines.append(f"- {text}\n  - url: {url}\n  - pdf: {pdf_path.name}\n  - txt: {txt_path.name}\n")
        print(f"saved {pdf_path.name} + {txt_path.name}")

    (out_dir / "README.md").write_text(
        "# Official GESP source capture\n\n" + "\n".join(index_lines),
        encoding="utf-8",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
