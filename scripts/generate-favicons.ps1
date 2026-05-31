# Syncs public/favicon.ico from src/assets/favicon.ico and builds PNG/PWA sizes
# from BrandNav.webp (matches navbar logo — what Google should show in search).

param(
  [string]$SourceIco = "src\assets\favicon.ico",
  [string]$SourcePng = $SourceIco,
  [string]$OutDir = "public"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

function Resize-Icon {
  param(
    [Parameter(Mandatory=$true)][string]$InputPath,
    [Parameter(Mandatory=$true)][string]$OutputPng,
    [Parameter(Mandatory=$true)][int]$Size
  )

  if (-not (Test-Path -LiteralPath $InputPath)) {
    throw "Input not found: $InputPath"
  }

  $img = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $InputPath))
  try {
    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    try {
      $g.Clear([System.Drawing.Color]::Transparent)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $rect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
      $g.DrawImage($img, $rect)
    } finally {
      $g.Dispose()
    }
    $bmp.Save($OutputPng, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $img.Dispose()
  }
}

if (-not (Test-Path -LiteralPath $OutDir)) {
  throw "Output directory not found: $OutDir"
}

if (-not (Test-Path -LiteralPath $SourceIco)) {
  throw "Missing canonical favicon: $SourceIco"
}

Copy-Item -LiteralPath $SourceIco -Destination "$OutDir\favicon.ico" -Force

$pngSource = $SourcePng
if (-not (Test-Path -LiteralPath $pngSource)) {
  $pngSource = $SourceIco
}

Resize-Icon -InputPath $pngSource -OutputPng "$OutDir\favicon.png" -Size 512
Resize-Icon -InputPath $pngSource -OutputPng "$OutDir\favicon-16x16.png" -Size 16
Resize-Icon -InputPath $pngSource -OutputPng "$OutDir\favicon-32x32.png" -Size 32
Resize-Icon -InputPath $pngSource -OutputPng "$OutDir\favicon-48x48.png" -Size 48
Resize-Icon -InputPath $pngSource -OutputPng "$OutDir\apple-touch-icon.png" -Size 180
Resize-Icon -InputPath $pngSource -OutputPng "$OutDir\android-chrome-192x192.png" -Size 192
Resize-Icon -InputPath $pngSource -OutputPng "$OutDir\android-chrome-512x512.png" -Size 512

Write-Host "Favicons synced: favicon.ico from $SourceIco, PNG sizes from $pngSource"
