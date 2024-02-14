# pandoc-yaml

This is a very simple VSCode extension that makes it possible to keep track of specific [Pandoc](https://pandoc.org) export commands directly in the YAML frontmatter of a markdown file. It runs the shell command specified in the `pandoc-yaml` field of the YAML frontmatter of the currently active markdown file. You must have Pandoc installed and available in your path for this extension to work.

Example YAML frontmatter:

```yaml
---
title: "A really awesome document"
authors:
  - Juan D. Pinto
run-command: "pandoc '/Users/juanpinto/Documents/doc.md' -o '/Users/juanpinto/Documents/doc.pdf' --pdf-engine=xelatex --citeproc"
---
``````
