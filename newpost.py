# /// script
# requires-python = ">=3.10"
# dependencies = ["click"]
# ///

import re
import unicodedata
from datetime import date
from pathlib import Path

import click


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[-\s]+", "-", text).strip("-")


@click.command()
@click.argument("title", required=False)
@click.option("--notas", is_flag=True, help="Create in content/notas instead of content/blog")
def main(title: str, notas: bool):
    """Create a new post skeleton."""
    if not title:
        title = click.prompt("Title")
    root = Path(__file__).parent
    section = "notas" if notas else "blog"
    slug = slugify(title)
    today = date.today().isoformat()
    folder = root / "content" / section / f"{today}-{slug}"
    folder.mkdir(parents=True)

    if notas:
        frontmatter = f'+++\ndate = "{today}T12:00:00Z"\ntitle = "{title}"\n+++'
    else:
        frontmatter = f'---\ndate: "{today}T12:00:00Z"\ntitle: "{title}"\n---'

    (folder / "index.md").write_text(frontmatter + "\n")
    click.echo(f"Created {folder / 'index.md'}")


if __name__ == "__main__":
    main()
