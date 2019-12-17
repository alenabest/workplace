#!/usr/bin/env bash

cd "src" || exit

# create module
nest g module "$1"
cd "$1" || exit

# create controller
mkdir "controllers" || exit
cd "controllers" || exit
nest g controller "$1"
cd ".."

# create db, $name.ts, index.ts
mkdir "db" || exit
cd "db" || exit
echo "import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';" | tee -a "$1.ts"
echo "@Entity()" | tee -a "$1.ts"
echo "export class $1 {}" | awk -F ";" '{$name=substr($name, 1, 13)toupper(substr($name, 14, 1))substr($name, 15) }1' | tee -a "$1.ts"
echo "export * from './$1';" | tee -a "index.ts"
cd ".."

# create dto, $name.ts, index.ts
mkdir "dto" || exit
cd "dto" || exit
echo "import { ApiProperty } from '@nestjs/swagger';" | tee -a "$1.ts"
echo "export class $1Dto {}" | awk -F ";" '{$name=substr($name, 1, 13)toupper(substr($name, 14, 1))substr($name, 15) }1' | tee -a "$1.ts"
echo "export * from './$1';" | tee -a "index.ts"
cd ".."

# create models, $name.ts, index.ts
mkdir "models" || exit
cd "models" || exit
echo "export class $1Model {}" | awk -F ";" '{$name=substr($name, 1, 13)toupper(substr($name, 14, 1))substr($name, 15) }1' | tee -a "$1.ts"
echo "export * from './$1';" | tee -a "index.ts"
cd ".."

# create service
mkdir "services" || exit
cd "services" || exit
nest g service "$1"
