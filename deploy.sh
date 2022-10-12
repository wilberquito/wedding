#/!bin/bash

dataTarget="src/assets/data.json"
dataJson='./skeleton/data.json'
cp $dataJson $dataTarget 2>/dev/null

if [[ $? -ne 0 ]]; then
    echo "Ups! problem overritting - $dataTarget"
    exit 1
else
    echo "Ok, source - $dataTarget - overrided"
fi

cssTarget="src/css/variables.css"
variablesCss='./skeleton/variables.css'
cp $variablesCss $cssTarget 2>/dev/null

if [[ $? -ne 0 ]]; then
    echo "Ups! problem overritting - $cssTarget"
    exit 1
else
    echo "Ok, source - $cssTarget - overrided"
fi


npm run build 