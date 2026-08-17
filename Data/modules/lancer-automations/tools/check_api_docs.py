#!/usr/bin/env python3
# Lint doc/API_*.md against the real API surface.
# Catches the three ways these docs rot:
#   1. a documented `api.X(...)` that is not on the runtime API object
#   2. a `<summary>` entry with no return type
#   3. an untyped `Function(...)` or a bare `: Object` / `: Array` field
#
#   python tools/check_api_docs.py

import re
import sys
from pathlib import Path

MODULE_ROOT = Path(__file__).resolve().parent.parent
DOC_DIR = MODULE_ROOT / 'doc'

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_api_types import collect_api_names  # noqa: E402

# api.X names that are documented but intentionally not on the api object.
ALLOWED_MISSING = set()
# Files whose "Reaction" entries are the Lancer action type, not API members.
DOC_GLOB = 'API_*.md'


def doc_files():
    return sorted(DOC_DIR.glob(DOC_GLOB))


def check_phantom_api_refs(api_names):
    problems = []
    for path in doc_files():
        for i, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
            for m in re.finditer(r'\bapi\.(\w+)\s*\(', line):
                name = m.group(1)
                if name not in api_names and name not in ALLOWED_MISSING:
                    problems.append(f'{path.name}:{i}  api.{name}() is not on the API object')
    return problems


def check_missing_return_types():
    problems = []
    for path in doc_files():
        in_type_section = False
        for i, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
            if line.startswith('### '):
                # "Shared Types" documents type shapes, not callable members.
                in_type_section = line.strip() == '### Shared Types'
            if in_type_section or not line.startswith('<summary>'):
                continue
            if not line.startswith('<summary><b><code>'):   # prose summary, not a function entry
                continue
            if '→' in line:
                continue
            names = re.findall(r'<code>(\w+)</code>', line)
            if names:
                problems.append(f'{path.name}:{i}  no return type: {", ".join(names)}')
    return problems


def check_untyped_fields():
    problems = []
    bare = re.compile(r':\s*(Object|Array)\s*[,}]?\s*$')
    for path in doc_files():
        for i, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
            if 'Function(' in line:
                problems.append(f'{path.name}:{i}  untyped Function(...) - name the callback type')
            if bare.search(line) and '|' not in line:
                problems.append(f'{path.name}:{i}  bare {bare.search(line).group(1)} - give the element/shape type')
    return problems


def main():
    api_names = collect_api_names()
    # Errors are wrong docs. Warnings are incomplete docs; they don't fail the run.
    errors = [
        ('Documented but not on the API', check_phantom_api_refs(api_names)),
        ('Untyped field', check_untyped_fields()),
    ]
    warnings = [
        ('Missing return type', check_missing_return_types()),
    ]
    err_total = 0
    for title, problems in errors + warnings:
        if not problems:
            continue
        if any(title == t for t, _ in errors):
            err_total += len(problems)
        print(f'\n{title} ({len(problems)}):')
        for p in problems:
            print(f'  {p}')
    warn_total = sum(len(p) for _, p in warnings)
    print()
    if err_total:
        print(f'FAIL: {err_total} error(s), {warn_total} warning(s).')
        return 1
    print(f'OK: no errors, {warn_total} warning(s). {len(doc_files())} files, {len(api_names)} API names.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
