# PowerShell script to rename files in a folder to the format out_1.jpg, out_2.jpg, ...

# Replace 'your_folder_path' with the actual path of the folder containing the files
$folderPath = 'D:\work\work\Mascot_Project\public\mascotPeople'

# Get all files in the folder and sort them alphabetically
$files = Get-ChildItem -Path $folderPath | Sort-Object { [int]($_.BaseName -replace '[^\d]') }

# Initialize a counter
$counter = 1

# Loop through each file and rename it
foreach ($file in $files) {
    # Build the new file name
    $newName = "out_$counter.jpg"

    # Construct the full path for the new file name
    $newPath = Join-Path -Path $folderPath -ChildPath $newName

    # Rename the file
    Rename-Item -Path $file.FullName -NewName $newName -Force

    # Increment the counter for the next file
    $counter++
}

Write-Host "Files renamed successfully."