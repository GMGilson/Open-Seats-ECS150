#!/bin/bash
wget --quiet \
     --method POST \
     --header 'cache-control: no-cache' \
     --header 'content-type: application/x-www-form-urlencoded' \
     --body-data course_number="ECS150" \
     --output-document \
     - https://registrar-apps.ucdavis.edu/courses/search/course_search_results.cfm | tee >(sed -rn '143~74p' | sed -r "s/<BR \/>//g" | cat -n) >(sed -rn '147~74p' | cat -n) >/dev/null | sort -n | cut -f2- | sed -r 's/^[[:space:]]*//g' | tail -n 1 | cat