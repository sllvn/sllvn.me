# /// script
# requires-python = ">=3.10"
# dependencies = ["Pillow"]
# ///

import sys
from pathlib import Path

from PIL import Image, ImageOps

LANDSCAPE_WIDTH = 1600
PORTRAIT_WIDTH = 1200
JPEG_QUALITY = 80


def main():
    if len(sys.argv) != 2:
        print("Usage: resize_image.py <path/to/image>")
        sys.exit(1)

    src = Path(sys.argv[1])
    if not src.exists():
        print(f"File not found: {src}")
        sys.exit(1)

    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    w, h = img.size

    target_width = LANDSCAPE_WIDTH if w > h else PORTRAIT_WIDTH

    if w > target_width:
        ratio = target_width / w
        new_size = (target_width, round(h * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    out = src.with_name(src.stem + "_resized.jpg")
    img.save(out, "JPEG", quality=JPEG_QUALITY, optimize=True)
    print(f"Saved {out} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()
