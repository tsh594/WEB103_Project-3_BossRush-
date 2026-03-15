from PIL import Image, ImageSequence

# Use the local, ignored original to avoid re-downloading the LFS blob.
SRC = "local_originals/walkthrough_original_328mb.gif"
TARGETS = [
    {
        "dst": "walkthrough_compressed_80mb.gif",
        "width": 800,
        "color_count": 96,
        "frame_skip": 2,  # keep every other frame, double duration later
    },
    {
        "dst": "walkthrough_compressed_164mb.gif",
        "width": 900,
        "color_count": 90,
        "frame_skip": 1,  # keep all frames
    },
]


def compress_variant(im: Image.Image, dst: str, width: int, color_count: int, frame_skip: int) -> None:
    w, h = im.size
    target_h = int(h * width / w)
    duration = im.info.get("duration", 120)
    loop = im.info.get("loop", 0)
    frames = []
    for idx, frame in enumerate(ImageSequence.Iterator(im)):
        if frame_skip > 1 and idx % frame_skip:
            continue
        fr = frame.convert("RGB").resize((width, target_h), Image.Resampling.LANCZOS)
        fr = fr.convert("P", palette=Image.ADAPTIVE, colors=color_count)
        frames.append(fr)
    if not frames:
        raise RuntimeError("No frames produced")
    frames[0].save(
        dst,
        save_all=True,
        append_images=frames[1:],
        loop=loop,
        duration=duration * frame_skip,
        optimize=True,
        disposal=2,
    )
    print("done", len(frames), "frames", "->", dst)


def main() -> None:
    with Image.open(SRC) as im:
        for cfg in TARGETS:
            compress_variant(
                im,
                dst=cfg["dst"],
                width=cfg["width"],
                color_count=cfg["color_count"],
                frame_skip=cfg["frame_skip"],
            )


if __name__ == "__main__":
    main()
