#!/bin/sh
# Tiny util to generate CNAME files with the right domain

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

echo "Working directory is $parent_path"
cd "$parent_path/../public"
touch "CNAME"
echo 'orfleisher.com' > CNAME
echo "Created CNAME file"