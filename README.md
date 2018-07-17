# data-zoom-d3
Zooming UI experiment
A simplified rewrite of https://github.com/stupakov/data-zoom that leverages [d3.zoom](https://github.com/d3/d3-zoom)

## Objective
A prototype of a UI that shows progressively more detail as the user zooms in.  Each entity has two representations: a "summary" representation, and a "full" representation, which can have children. The summary is displayed at higher zoom levels, the full representation replaces the summary when zooming in on an item.

## Use cases
- Viewing any kind of cross-linked or hierarchical data.
- Imagine browsing wikipedia by zooming in on a link and seeing progressively more info about the linked entity, rather than clicking on links to move from one page to another.
- Imagine browsing an online store, and seeing more info by simply zooming in on previews of sections of info about a product (e.g. product description, reviews section, etc).

## Demo
See the demo at http://stupakov.github.io/data-zoom-d3/.
Currently works only on desktop browsers.
