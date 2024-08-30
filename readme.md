# Amantix Server

## How to clone branch using command line on Git Bash

run command "git clone -b [branch-name] --single-branch https://github.com/Itseez/amantix.git"

## How to setup Server after cloning

1. Make sure the terminal is in the right address. Ex: "C:\amantix\server"
1. Run command "npm i --save-dev"
1. Add .env file

## How to fix midtrans-client Snap issue

1. Navigate to node_modules
2. Expand @types folder
3. Add a folder into @types and name it to "midtrans-client"
4. Add a script inside the midtrans-client folder. Name it to "index.d.ts"
5. Fill the script with "declare module "midtrans-client";"
6. Save

## How to start the server

Type "npm run start" in the terminal
