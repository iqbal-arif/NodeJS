1. Install NPM globally
2. Install NODEMON; that monitor nodejs file and render files everytime when there is a change in the file.
3. Next Initilize NPM : npm init -y (-y accepts all the options)
4. Install Date Functions :npm i date-fns
5. Re-install NPM if Clone Repository does not have node_moudules : npm install
6. To Save NODEMON as a Dev Depndency : npm i nodemon -D.
7. To Run the NODE and NODEMON Script : Modify package.json file script object as follows:
"scripts": {
    "start": "node index",
    "dev": "nodemon index"
  },
8. To start the project : Type npm run dev
9. Install Dev Dependency UUID NPM to project : npm i uuid
10. Version Reading: "date-fns": "^2.29.3"
    2 is Major Version
    29 is Minor Version
    3 is a patch
    ^ means update Minor and patch updates but not any major updates
    ~ means only updates the patch
    * means update all the Major, Minor, and patches all the times. NOT Recommended
    No Symbol in front of the numbers means , just this speific version is going to work.
11. To Install speific NPM version : npm i uuid@8.3.1   
12. To check NPM Modules Updates : npm update
13. To remove a NPM package from a project : npm rm nodemon -D ; For global wirte npm rm nodeman -g
NOTE: Removing any Dev Dependency then remember to remove it from the Script Manualy.


