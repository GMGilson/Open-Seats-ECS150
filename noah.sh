#!/bin/zsh

wget --quiet \
     --method POST \
     --header 'cache-control: no-cache' \
     --header 'content-type: application/x-www-form-urlencoded' \
     --body-data course_number="ECS150" \
     --output-document \
     - https://registrar-apps.ucdavis.edu/courses/search/course_search_results.cfm | awk 'BEGIN { p = 0 } p==1 && /[^.][0-9]+[[:space:]]*$/ { print $1; exit 0 } /<em>$/ { p = 1 }'

