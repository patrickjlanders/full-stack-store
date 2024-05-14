
$scriptPath = $PSScriptRoot

$envPath = (get-item $scriptPath ).parent.FullName

$envPath = Join-Path $envPath ".env"

Write-Output "Script path: $scriptPath"

Write-Output "Env path: $envPath"
# Load .env file
. $envPath

Write-Output "POSTGRES_SERVER: = $env:POSTGRES_SERVER"



# # Let the DB start
poetry run python .\app\backend_pre_start.py

# # Run migrations
poetry run alembic upgrade head

# # Create initial data in DB
poetry run python .\app\initial_data.py
