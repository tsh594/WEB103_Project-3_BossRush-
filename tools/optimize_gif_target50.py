from pathlib import Path
from PIL import Image, ImageSequence

repo = Path(__file__).resolve().parents[1]
src = repo / 'videos' / 'walkthrough_original_179mb.gif'
out_dir = repo / 'videos'

if not src.exists():
    raise FileNotFoundError(f"Missing source: {src}")

variants = [
    {"name": "q50_a", "max_width": 1080, "step": 2, "colors": 160},
    {"name": "q50_b", "max_width": 1120, "step": 2, "colors": 144},
    {"name": "q50_c", "max_width": 1040, "step": 2, "colors": 192},
    {"name": "q50_d", "max_width": 1200, "step": 2, "colors": 128},
]

target = 50 * 1024 * 1024

im = Image.open(src)
orig_duration = im.info.get('duration', 100)
results = []

for cfg in variants:
    out = out_dir / f"walkthrough_{cfg['name']}.gif"
    frames = []

    for i, frame in enumerate(ImageSequence.Iterator(im)):
        if i % cfg['step'] != 0:
            continue

        fr = frame.convert('RGBA')
        if fr.width > cfg['max_width']:
            new_h = int(fr.height * (cfg['max_width'] / fr.width))
            fr = fr.resize((cfg['max_width'], new_h), Image.Resampling.LANCZOS)

        fr = fr.convert('P', palette=Image.Palette.ADAPTIVE, colors=cfg['colors'])
        frames.append(fr)

    if not frames:
        continue

    duration = max(40, int(orig_duration * cfg['step']))

    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        loop=0,
        duration=duration,
        optimize=True,
        disposal=2,
    )

    size = out.stat().st_size
    score = (cfg['max_width'] * cfg['colors']) / cfg['step']
    delta = abs(size - target)
    results.append((cfg, out, size, score, delta))

print("Generated:")
for cfg, out, size, score, delta in results:
    print(f"- {cfg['name']}: {size} bytes | width={cfg['max_width']} step={cfg['step']} colors={cfg['colors']} score={score:.1f} delta={delta}")

# Prefer closest to 50MB while still maximizing clarity among similarly close sizes
results.sort(key=lambda r: (r[4], -r[3]))
selected = results[0]
cfg, out, size, score, delta = selected

final = out_dir / 'walkthrough.gif'
final.write_bytes(out.read_bytes())

print(f"Selected: {cfg['name']}")
print(f"Final size: {size} bytes")
print(f"Wrote: {final}")
