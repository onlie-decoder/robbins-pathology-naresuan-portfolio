"""Check preservation and navigation without reading any PDF or Drive note content.

Run: python tools/verify_portfolio.py [baseline Git revision]
Dependencies for the verifier only: beautifulsoup4.
"""
from pathlib import Path
from urllib.parse import urlparse, unquote
from collections import Counter
import hashlib
import subprocess
import sys
import re
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
baseline = sys.argv[1] if len(sys.argv) > 1 else '59b9978cb0f61ad23a9c5ec825b7e5255a645c85'
git = lambda *args: subprocess.check_output(['git', '-C', str(root), *args])
original = BeautifulSoup(git('show', f'{baseline}:index.html').decode(), 'html.parser')
page = BeautifulSoup((root / 'index.html').read_text(encoding='utf-8'), 'html.parser')
pdf_paths = git('ls-tree', '-r', '--name-only', baseline, 'pdf').decode().splitlines()
pdf_paths = [p for p in pdf_paths if p.endswith('.pdf')]
current_paths = {p.relative_to(root).as_posix() for p in (root/'pdf').glob('*.pdf')}
assert current_paths == set(pdf_paths), 'PDF inventory changed'
for path in pdf_paths:
    old_hash = hashlib.sha256(git('show', f'{baseline}:{path}')).hexdigest()
    new_hash = hashlib.sha256((root / path).read_bytes()).hexdigest()
    assert old_hash == new_hash, f'PDF changed: {path}'
links = {a['href'] for a in page.select('a[href]') if a['href'].startswith('pdf/')}
assert links == current_paths, f'PDF destinations mismatch: {current_paths ^ links}'
ids = [el['id'] for el in page.select('[id]')]
assert len(ids) == len(set(ids)), f'Duplicate IDs: {[key for key,n in Counter(ids).items() if n>1]}'
for el in page.select('[href], [src]'):
    target = el.get('href') or el.get('src')
    if target.startswith('#'):
        assert target[1:] in ids, f'Missing anchor: {target}'
    elif not urlparse(target).scheme:
        assert (root/unquote(target.split('?')[0])).is_file(), f'Missing file: {target}'
drive_links = lambda soup: {a['href'] for a in soup.select('a[href]') if 'drive.google.com' in a['href']}
assert drive_links(original) <= drive_links(page), 'A note destination was lost'
assert {p['id'] for p in original.select('.principle')} == {p['id'] for p in page.select('.principle')}, 'Principles lost'
assert git('show', f'{baseline}:skill/SKILL.md').decode().replace('\r\n','\n') == (root/'skill/SKILL.md').read_text(encoding='utf-8'), 'Original skill changed'
for stylesheet in ['assets/fonts.css', 'assets/portfolio.css']:
    css_path=root/stylesheet
    for url in re.findall(r'url\([\"\']?([^\)\"\']+)',css_path.read_text(encoding='utf-8')):
        if not urlparse(url).scheme:
            assert (css_path.parent/url).is_file(), f'Missing CSS asset: {url}'
print(f'PASS: {len(pdf_paths)} PDF hashes unchanged, every PDF linked, all note destinations retained.')
print(f'PASS: {len(page.select(".principle"))} principles retained, original SKILL.md retained, unique IDs and valid local targets.')
print(f'HTML payload: {len(git("show", f"{baseline}:index.html")):,} -> {(root/"index.html").stat().st_size:,} bytes.')
