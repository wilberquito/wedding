#/!bin/bash

target="src/assets/data.json"
read -p 'Data source json file: ' copy
if [[ $copy == *.json ]]; then
    cp $copy $target 2>/dev/null
    if [[ $? -eq 0 ]]; then
        echo "Ok, source copied to data template"
        npm run build 
    else
        echo "Ups! data source -- $copy -- not found"
        exit 1
    fi
else
    echo "Only json files are supported"
    exit 1
fi

