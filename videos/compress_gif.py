from PIL import Image, ImageSequence

SRC = "walkthrough_original_328mb.gif"
DST = "walkthrough_compressed_80mb.gif"


def main() -> None:
    with Image.open(SRC) as im:
        w, h = im.size
        target_w = 800
        target_h = int(h * target_w / w)
        duration = im.info.get("duration", 120)
        loop = im.info.get("loop", 0)
        frames = []
        for idx, frame in enumerate(ImageSequence.Iterator(im)):
            if idx % 2:
                continue
            fr = frame.convert("RGB").resize(
                (target_w, target_h), Image.Resampling.LANCZOS
            )
            fr = fr.convert("P", palette=Image.ADAPTIVE, colors=96)
            frames.append(fr)
        frames[0].save(
            DST,
            save_all=True,
            append_images=frames[1:],
            loop=loop,
            duration=duration * 2,
            optimize=True,
            disposal=2,
        )
    print("done", len(frames), "frames", "->", DST)


if __name__ == "__main__":
    main()
