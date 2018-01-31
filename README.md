STEPS TO RUN
-------------
 
 - take the dist and deploy on any HTTP server
 - access index.html


Steps to build and run from code repo
------------------
- Install node and npm
- run 'npm install'
- run 'grunt watch'
- run 'npm start'
- access http://localhost:8080/dist/


FEATURES
----------------
Create a reusable component called **<auto-search>**

- Component Store recent searches
- Result are Grouped by Type 
- Customization  for the search box label
- Customization for Max Suggestion count per type
- Component fire 'selected' event to get the selected product from the dropdown


ASSUMPTIONS
---------------
- json has duplicate enteries, Showing them as such
- order of result is in the order of json file


CODE LAYOUT
--------------
As we just have componnet do didnt create seperate directory for it, and didnt create a namespace
- All component code under src/main/js
- Renderer.js is the VM and contains the UI binding 
- All Html is in renderer.tmpl.html