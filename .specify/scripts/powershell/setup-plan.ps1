param(
    [Parameter(Mandatory = $false)]
    [switch]$Json
)

# Get current spec directory (assuming we're in specs/N-feature-name)
$currentDir = Get-Location
$specsDir = Split-Path -Parent $currentDir
$featureDir = Split-Path -Leaf $currentDir

# Define paths
$specFile = Join-Path $currentDir "spec.md"
$implPlanFile = Join-Path $currentDir "implementation-plan.md"
$templatesDir = ".specify\templates"
$planTemplate = Join-Path $templatesDir "implementation-plan-template.md"

# Check if spec file exists
if (-not (Test-Path $specFile)) {
    # We're not in a feature directory, look for the first spec
    $specDirs = Get-ChildItem -Path "specs" -Directory | Sort-Object Name
    if ($specDirs.Count -gt 0) {
        $featureDir = $specDirs[0].Name
        $currentDir = $specDirs[0].FullName
        $specFile = Join-Path $currentDir "spec.md"
        $implPlanFile = Join-Path $currentDir "implementation-plan.md"
    }
    else {
        Write-Error "No spec directories found in specs/"
        exit 1
    }
}

# Copy template if implementation plan doesn't exist
if (-not (Test-Path $implPlanFile)) {
    if (Test-Path $planTemplate) {
        Copy-Item $planTemplate $implPlanFile
    }
    else {
        # Create a basic template
        @"
# Implementation Plan: [Feature Name]

## Technical Context

[To be filled]

## Constitution Check

[To be filled]

## Phase 0: Research

[To be filled]

## Phase 1: Design

[To be filled]

## Phase 2: Implementation

[To be filled]
"@ | Out-File -FilePath $implPlanFile -Encoding UTF8
    }
}

# Get current branch
$branch = git branch --show-current 2>$null
if (-not $branch) {
    $branch = "main"
}

# Output JSON
$output = @{
    FEATURE_SPEC = (Resolve-Path $specFile).Path
    IMPL_PLAN    = (Resolve-Path $implPlanFile).Path
    SPECS_DIR    = (Resolve-Path "specs").Path
    FEATURE_DIR  = (Resolve-Path $currentDir).Path
    BRANCH       = $branch
} | ConvertTo-Json

Write-Output $output
