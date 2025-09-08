@echo off
echo Starting VSCode with increased memory for IDL Language Server...
set NODE_OPTIONS=--max-old-space-size=8192
set IDL_LS_NODE_OPTIONS=--max-old-space-size=8192
code .
echo VSCode started with memory fix applied.