<a href="https://www.kaffa.com.br/"><img src="https://www.kaffa.com.br/wp-content/uploads/2015/01/kaffa-mobile-logo.png" title="KaffaLogo" alt="Kaffa Logo"></a>

# Kaffa Mobile - Pre Qualification Test 

> This repository contains my results of a test to pre qualify to a job opportunity as a Sotware Developer Analyst at Kaffa Mobile

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Table of Contents

- [Installation](#installation)
- [Technologies](#technologies)
- [Exercices](#exercices)
- [Test](#test)
- [License](#license)

---

## Installation

- Install <a href="https://nodejs.org/en/">NodeJS</a>

- <a href="https://github.com/pedroafonso23/kaffa-test">Clone this repo</a> to your local machine (preferably on **C:/**)

- Open the command prompt and navigate to the repository root

- Execute this command to install the dependencies:

```shell
$ npm install
```

- Execute this command to install JSON Server:

```shell
$ npm install -g json-server
```

- Execute this command to run the application

```shell
$ npm start
```

- **Only if** you get an error, execute instead this command to run only the main server:

```shell
$ npm run server
```

- Open your browser and access the local host on port 5005 :point_right: <a href="http://localhost:5005">`http://localhost:5005`</a>

- You are all set up! You should see the Home Page:

[![](https://i.imgur.com/yijBQgk.png)]()

- You can access all the pages and exercices reponses using the upper menu. Also, note that title of the page, on the browser tab, shows which exercices you are accessing. 

[![](https://i.imgur.com/UtoNVio.png)]()

![Recordit GIF](http://g.recordit.co/5Wjya55yS5.gif)

- :heavy_exclamation_mark: If you have any problems on installing or running the application, please fell free to contact me by any means.
  - Call me or send a WhatsApp message: +55 35 9 9151 6117
  - Send an e-mail: pedroafonso23@yahoo.com.br
  - <a href="https://www.facebook.com/pedroafonso.ferraz.7/">Facebook</a> 
  - <a href="https://www.linkedin.com/in/pedroafonsoferraz/">LinkedIn</a> 
  - <a href="https://www.linkedin.com/in/pedroafonsoferraz/">LinkedIn</a>
  - <a href="https://www.instagram.com/pedroafonsocfl/?hl=pt-br">Instagram</a>

---

## Technologies

To develop the present application, I used the following technologies and resources:

- NodeJS
- JavaScript
- HTML5
- CSS3
- Nodemon (auto update the server, useful while developing)
- Nunjucks (template engine to reuse and add powerful resources to HTML, like FOR loops)
- Npm run all (to easily run more than one server in parallel)
- Express (powerful framework for NodeJS that helps to create servers and routes)
- SQLite 3 (SQL database)
- Axios (promise based HTTP client for the browser and NodeJS, used for API requests)
- JSON Server (easily create a REST API)

---

## Exercices

There are 8 exercices in total and all of them were solved in this same web application. <br>
You may navigate trough the exercices by clicking on the tabs of the upper menu. <br>
The first tab `Applicant` is a short introduction to myself and the purpose of this application. <br>
On the subsection below, I will explain how I solved each proposed exercice, and show trough GIFs and screenshots how it works. 

### Exercices 1 & 2 - Validate CNPJ format and verification digits

- These exercieces consists of:
  - Given a string, check if it looks like a CNPJ, considering two formats: <br>
  Formatted: <br>
  `"00.000.000/0000-00"` <br>
  Number only: <br>
  `"00000000000000"`
  - Validate if it’s a well-formed CNPJ, considering the “check digits” as defined by Receita Federal.
  - Don’t use a library. You should write the validation code.
  
- To access the solution, click on the tab **Validate CNPJ** on the upper menu:

[![](https://i.imgur.com/yLuZjXm.png)]()

- If you enter with a wrong format CNPJ (less or more characters or wrong ponctuation), you will get this result:

[![](https://i.imgur.com/LIrAX2u.png)]()

- If you enter a CNPJ with the right format, but one or both verification digits are wrong, you will get this result:

[![](https://i.imgur.com/VoLB7ev.png)]()

- Finally, if you enter a CNPJ in the right format and with valid verification digits, you will get this response: 

[![](https://i.imgur.com/c5oeREn.png)]()

- I simply used and IF with the condition of two regular expressions (OR between them) to verify if the user inputed a valid format string. The first REGEX verifies if it has 18 characters and if the ponctuation is correct, the second verifies the case of only numbers, which should be exactly 12 digits. 

```javascript
if (inputCNPJ.value.match(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)|(^\d{14}$)/)) {
...
}
```

- To validate the verification digits, I implemented the logic explained in <a href="https://www.geradorcnpj.com/algoritmo_do_cnpj.htm">this website</a>, which consists of a series of math operations to result in each verification number. Then I only had to compare the result with what the user inputed and verify if they are correct or not. You can check the full code on the file **script-cnpj.js**.

### Exercices 3 & 4 - Verify if rectangles intersect and calculate the intersection area

- These exercieces consists of:
  - Considering rectangles in a discrete grid (like pixels in a display), each defined by two points, return true if they intersect, false otherwise.<br>
  - Compute the areas of intersection.
  
- To access the solution, click on the tab **Rectangles Tool** on the upper menu:

[![](https://i.imgur.com/SEpNE2B.png)]()

- Now you have to click on a total of 6 cells of the grid, to draw 3 rectangles. The first 2 click will define the **red** rectangle, the following two click will define the **green** one and finally the last two clicks will define the **blue** rectangle.

[![](https://i.imgur.com/hsuopIc.png)]()

- As soon as you click on the last cell, the results will be computed and shown to you right above the grid. You can have intersection between any two rectangles or even between the three of them. You can repeat the process by clicking on the "Rectangles Tool" tab or reloading the page. 

![Recordit GIF](http://g.recordit.co/hBp7ENsJPE.gif)

- Take a look on the file `script-rectangles.js`. My solution was to create the grid as a table, row by row, column by column, with the function `clickableGrid()`. This function creates the `tr` and `td` HTML elements and also assigns a value, and ID and an `eventListener` to each cell. 

- When you click a cell, you call the function `selectCell()`, which will only be executed 6 times. This function makes use of a `Switch` structure to color the cells that are clicked, and define the rectangles, by adding classes to the element. So, each cell can have none, one of each, or any combination of the classes `red`, `green` and `blue`.

- Finally, after the last click, the entire grid will be verified for how many cells it has with each combination of classes. This way I can know if there is an intersecion between rectangles and even count how many cell are in this intersection. For example, if I have 10 cells with both classes `red` and `blue`, I know that the rectangles `red` and `blue` are intesecting and this intersection has an area of 10 units. 

### Exercice 5 - Simple To Do List

- This exerciece consists of:
  - Todo list application that permits the creation and deletion of tasks (texts). <br>
  - The application must persist the tasks between executions. <br>
  - Use any storage you want: database, files, PaaS backends (Firebase, etc.).
  
- To access the solution, click on the tab **To Do List** on the upper menu:

[![](https://i.imgur.com/iU0aDOt.png)]()

- Now, type a text on the field and click on **Add task**. The task will be saved below and you can add more tasks to make a list. You can also delete tasks by simply clicking on the **x** icon besides each task. 

![Recordit GIF](http://g.recordit.co/JUsAxxsDoy.gif)

- I used **SQLite** to make the database and the **Express** framework to handle the requests.

- Inside the `database` folder you will find `db.js`, the file that creates the database and the table, and `data-base.db`, the database itself. 

- In the file `server.js` you can find the routes to save a new task on the database, to delete a task and to show the page containing all the tasks registered. 

### Exercice 6 & 7 - Rest Client and Server for a world clock

- These exercieces consists of:
  - Build an application that queries a server and displays the current date/time hour in local and UTC timezones. <br>
  - Server URL: <a href="http://worldclockapi.com/api/json/utc/now">http://worldclockapi.com/api/json/utc/now</a> <br>
  - REST server returning a JSON like:
  ```json
  {
      "currentDateTime":"2019­08­12T14:40Z"
  }
  ```
  
- To access the solution, click on the tab **World Clock** on the upper menu:

[![](https://i.imgur.com/Ly8rwAB.png)]()

- I made use of **Axios** to make the request to the World Clock API, which is a promise based HTTP client for the browser and NodeJS. Take a look at the file `server.js`.

```javascript
server.get('/clock', function (req, res) {

    // Using Axios to get the data from the API
    axios.get('http://worldclockapi.com/api/json/utc/now').then((response) => {

        let time = response.data
        return res.render('clock', { time })

    })
})
```

- Also take a look in the file `script-clock.js`. I get the current UTC date and time on the HTML page, and format in a more presentable way with JavaScript. The local time comes simply by a `Date()` function, also manipulated to be in the same format as the UTC time and date.  

[![](https://i.imgur.com/tJIM9OT.png)]()

- To make the server I used the <a href="https://github.com/typicode/json-server">JSON Server</a>. 

- Take a look at the `package.json` file and you will see that I am running two scripts in parallel (using npm-run-all). This way, executing `npm start` will run the server on port 5005 and the clock JSON server on port 3000. 

[![](https://i.imgur.com/SLG2K9M.png)]()

- You can click on the link to access the JSON server.

![Recordit GIF](http://g.recordit.co/suEGbM1DBF.gif)

### Exercice 8 - Entity Relationship Diagram for a Order Manager System

- These exercieces consists of:
  - Design the model of a simple Order Manager System. <br>
  - The system consists of: Clients, Products, Orders. <br>
  - You can draw, describe, or list the tables as SQL. <br>
  - SQL: list ORDERS with number of items. <br>
  - Which indexes should be created in this model? <br>
  - This exercise is documentation only and there’s no executable to run in this case.
  
- To access the solution, click on the tab **OMS Diagram** on the upper menu:

[![](https://i.imgur.com/AkZVEiW.png)]()

- This exercice is pretty much self explanatory. I chose the engineering notation to make the diagram and I imagined 4 tables, Client, Order, Product_Order and Product. I had the necessity to add the Product_Order table mainly to add the information of how many of each product is in the order. So lets say, If I place an order of 1 apple, 2 banannas and 3 oranges, I have only one Order table, but associated with three Product_Order tables, one for each product. 

## Test

This is the full test I received from Kaffa Mobile:

[![](https://i.imgur.com/2b7hrhW.png)]()
[![](https://i.imgur.com/qUs2mFx.png)]()
[![](https://i.imgur.com/TXLvdoS.png)]()
[![](https://i.imgur.com/94JxZDD.png)]()
[![](https://i.imgur.com/q2ewnuK.png)]()

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
