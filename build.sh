#!/bin/bash
# Create a fresh public output folder
rm -rf public
mkdir -p public

# Copy all root-level HTML and assets
cp ./*.html public/
cp -r assets public/assets 2>/dev/null || true

# Copy blog files
mkdir -p public/blog
cp blog/*.html public/blog/
cp -r blog/assets public/blog/assets 2>/dev/null || true

# Copy projects and about pages
mkdir -p public/projects public/about
cp projects/*.html public/projects/
cp about/*.html public/about/
