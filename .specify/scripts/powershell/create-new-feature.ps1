param(
    [Parameter(Mandatory=$true)]
    [string]$Json,
    
    [Parameter(Mandatory=$false)]
    [int]$Number,
    
    [Parameter(Mandatory=$false)]
    [string]$ShortName,
    
    [Parameter(Mandatory=$false)]
    [string]$Description
)

# Parse feature description from arguments
$featureDescription = if ($Description) { $Description } else { $Json }

# Generate branch name
$branchName = if ($Number -and $ShortName) {
    "$Number-$ShortName"
} else {
    Write-Error "Number and ShortName are required"
    exit 1
}

# Create feature directory structure
$featureDir = "specs\$branchName"
$checklistsDir = "$featureDir\checklists"

New-Item -Path $featureDir -ItemType Directory -Force | Out-Null
New-Item -Path $checklistsDir -ItemType Directory -Force | Out-Null

# Create spec file
$specFile = "$featureDir\spec.md"
New-Item -Path $specFile -ItemType File -Force | Out-Null

# Create and checkout new branch
git checkout -b $branchName 2>&1 | Out-Null

# Output JSON for the agent to parse
$output = @{
    BRANCH_NAME = $branchName
    SPEC_FILE = (Resolve-Path $specFile).Path
    FEATURE_DIR = (Resolve-Path $featureDir).Path
    CHECKLISTS_DIR = (Resolve-Path $checklistsDir).Path
} | ConvertTo-Json

Write-Output $output
