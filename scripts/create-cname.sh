#!/bin/sh
# Tiny util to generate CNAME files with the right domain

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

echo "Working directory is $parent_path"
touch "public/CNAME"
echo 'orfleisher.com' > "public/CNAME"
echo "Created CNAME file"