# /// script
# requires-python = ">=3.11"
# dependencies = ["Pillow>=10", "PyYAML>=6"]
# ///

from __future__ import annotations

import re
import sys
import tomllib
from html import unescape
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).parent
CONTENT_ROOT = ROOT / "content"
STATIC_OG_ROOT = ROOT / "static" / "og"

WIDTH = 1200
HEIGHT = 630
MARGIN_X = 88

PRIMARY = "#161514"
BACKGROUND = "#f2e8da"
MUTED = "#4a4641"

DATE_PREFIX_RE = re.compile(r"^\d{4}-\d{2}-\d{2}-(.+)$")

FONT_REGULAR = [
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
FONT_BOLD = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


@dataclass(frozen=True)
class Post:
    section: str
    slug: str
    title: str
    summary: str
    output_path: Path


def load_font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for font_path in FONT_BOLD if bold else FONT_REGULAR:
        path = Path(font_path)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default(size=size)


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> int:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0]


def wrap_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.ImageFont,
    max_width: int,
) -> list[str]:
    lines: list[str] = []
    current = ""

    for word in text.split():
        candidate = f"{current} {word}".strip()
        if text_width(draw, candidate, font) <= max_width:
            current = candidate
            continue

        if current:
            lines.append(current)
            current = word
        else:
            lines.append(word)
            current = ""

    if current:
        lines.append(current)

    return lines or [text]


def truncate_line(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.ImageFont,
    max_width: int,
) -> str:
    suffix = "..."
    while text and text_width(draw, f"{text}{suffix}", font) > max_width:
        text = text[:-1].rstrip()
    return f"{text}{suffix}" if text else suffix


def fit_title(
    draw: ImageDraw.ImageDraw,
    title: str,
    max_width: int,
    max_lines: int = 3,
) -> tuple[ImageFont.ImageFont, list[str], int]:
    for size in range(78, 43, -2):
        font = load_font(size)
        lines = wrap_text(draw, title, font, max_width)
        if len(lines) <= max_lines:
            return font, lines, round(size * 1.16)

    font = load_font(42)
    lines = wrap_text(draw, title, font, max_width)
    lines = lines[:max_lines]
    lines[-1] = truncate_line(draw, lines[-1], font, max_width)
    return font, lines, 50


def split_frontmatter(path: Path) -> tuple[str, str, str]:
    text = path.read_text()
    lines = text.splitlines()
    if not lines or lines[0] not in {"---", "+++"}:
        raise ValueError(f"{path} does not start with frontmatter")

    delimiter = lines[0]
    for index, line in enumerate(lines[1:], start=1):
        if line == delimiter:
            return delimiter, "\n".join(lines[1:index]), "\n".join(lines[index + 1 :])

    raise ValueError(f"{path} frontmatter is missing closing {delimiter}")


def parse_post(path: Path) -> tuple[dict[str, Any], str]:
    delimiter, raw, body = split_frontmatter(path)
    if delimiter == "---":
        return yaml.safe_load(raw) or {}, body
    return tomllib.loads(raw), body


def output_slug(path: Path, metadata: dict[str, Any]) -> str:
    if metadata.get("slug"):
        return str(metadata["slug"])

    dirname = path.parent.name
    match = DATE_PREFIX_RE.match(dirname)
    return match.group(1) if match else dirname


def strip_markdown(text: str) -> str:
    text = re.sub(r"\{\{.*?\}\}", "", text, flags=re.DOTALL)
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[*_#>~]", "", text)
    text = unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def truncate_words(text: str, max_chars: int) -> str:
    if len(text) <= max_chars:
        return text

    shortened = text[: max_chars + 1].rsplit(" ", 1)[0].rstrip(" ,;:")
    return f"{shortened}..."


def post_summary(metadata: dict[str, Any]) -> str:
    summary = metadata.get("summary")
    return truncate_words(strip_markdown(str(summary)), 150) if summary else ""


def discover_posts() -> list[Post]:
    posts: list[Post] = []

    for section in ("blog", "notas"):
        for path in sorted((CONTENT_ROOT / section).glob("*/index.md")):
            metadata, _body = parse_post(path)
            title = str(metadata.get("title") or "").strip()
            if not title:
                continue

            slug = output_slug(path, metadata)
            posts.append(
                Post(
                    section=section,
                    slug=slug,
                    title=title,
                    summary=post_summary(metadata),
                    output_path=STATIC_OG_ROOT / section / slug / "index.png",
                )
            )

    return posts


def draw_card(
    *,
    output_path: Path,
    title: str,
    summary: str = "",
    default_card: bool = False,
) -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    draw = ImageDraw.Draw(image)

    brand_font = load_font(30, bold=True)

    draw.rectangle((0, 0, WIDTH, 14), fill=PRIMARY)
    draw.text((MARGIN_X, 64), "sllvn//", font=brand_font, fill=PRIMARY)

    if default_card:
        title_font = load_font(96)
        title_lines = [title]
        line_height = 112
        title_y = 214
    else:
        title_font, title_lines, line_height = fit_title(
            draw,
            title,
            WIDTH - (MARGIN_X * 2),
        )
        title_y = 188

    for line in title_lines:
        draw.text((MARGIN_X, title_y), line, font=title_font, fill=PRIMARY)
        title_y += line_height

    if summary:
        summary_font = load_font(34)
        all_summary_lines = wrap_text(draw, summary, summary_font, WIDTH - (MARGIN_X * 2))
        summary_lines = all_summary_lines[:2]
        if len(all_summary_lines) > len(summary_lines):
            summary_lines[-1] = truncate_line(draw, summary_lines[-1], summary_font, WIDTH - (MARGIN_X * 2))
        summary_y = title_y + 28
        for line in summary_lines:
            draw.text((MARGIN_X, summary_y), line, font=summary_font, fill=MUTED)
            summary_y += 44

    output_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(output_path, "PNG", optimize=True)


def load_config() -> dict[str, Any]:
    return tomllib.loads((ROOT / "config.toml").read_text())


def main() -> None:
    config = load_config()
    site_title = str(config.get("title", "sllvn//"))
    author = str(config.get("extra", {}).get("author", config.get("author", "")))

    draw_card(
        output_path=STATIC_OG_ROOT / "default.png",
        title=site_title,
        summary=author,
        default_card=True,
    )

    posts = discover_posts()
    for post in posts:
        draw_card(
            output_path=post.output_path,
            title=post.title,
            summary=post.summary,
        )

    print(f"Generated {len(posts) + 1} social preview images in {STATIC_OG_ROOT}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)
