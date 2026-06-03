# Delegates to generate-favicons.mjs (BrandNav → optimized public favicons).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$nodeScript = Join-Path $root "scripts\generate-favicons.mjs"
& node $nodeScript
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
