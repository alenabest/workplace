#!/usr/bin/env bash

cd "src/app" || exit

# create module
ng g module "$1"

echo -n "Введите количество внутренних модулей:"
read -r module_count

cd "$1" || exit

i=1
while [ $i -le "$module_count" ];
do
  echo "Введите имя модуля $i:"
  read -r module_name
  ng g module "$module_name"
  cd "$module_name" || exit
  ng g module components
  cd "components" || exit
  ng g c "$module_name-page"
  cd '../..'
  i=$((i+1))
done
