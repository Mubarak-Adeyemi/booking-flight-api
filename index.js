const express = require("express");
const { json } = require("express");
// const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

// Adding a widleware
app.use(express.json());
app.use(express.urlencoded());

const flights =[
  {
    id: 1,
    title: "flight to canada",
    time: "1pm",
    price: 26000,
    date: "26-06-2022"
    }
]

app.use(json());

app.use("/", routes);

// Getting all flights
app.get('/api/flights', (req, res) => {

  res.send(flights);
});

// Getting a single flight with ID
app.get('/api/flights/:id', (req, res) => {

  const flight = flights.find(c => 
    c.id === parseInt(req.params.id)) ;
  if(!flight) res.status(404).send('The flight with the given id was not found.');
  res.send(flight);
});

// Adding a flight
app.post('/api/flights', (req, res) => {


  const date = new Date();
  let  [year, month, day] = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];

  const time = new Date();
  const [hour, min, second] = [time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds() ]
  if ([day] < 28) {
    day= Number([day]) + 3 ;
    console.log([year, month, day]);
  } else {
    day = 3;
    if (month < 12) {
        month++
        console.log([year, month, day]);
    } else {
        month = 1
        year = year + 1
        console.log([year, month, day]);
    }
  }
  const flight = {
    id: flights.length + 1,
    title: req.body.title,
    time: `${[hour]}:${[min]}:${[second]}`,
    price: req.body.price,
    date: `${[year]}-${[month]}-${[day]}`
  };
  flights.push(flight);
  res.send(flight);
});


// Editing or Updating a flight
app.put('/api/flights/:id', (req, res) => {
  // Look up for the flight with an id
  // If not existing, return 404

  const flight = flights.find(c => c.id === parseInt(req.params.id)) ;
  if(!flight) res.status(404).send('The flight with the given id was not found.');

  // FOR NEW DATE
  const date = new Date();
  let  [year, month, day] = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];

  const time = new Date();
  const [hour, min, second] = [time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds() ]
  if ([day] < 28) {
    day= Number([day]) + 3 ;
    console.log([year, month, day]);
  } else {
    day = 3;
    if (month < 12) {
        month++
        console.log([year, month, day]);
    } else {
        month = 1
        year = year + 1
        console.log([year, month, day]);
    }
  }

  // Update flight
    flight.title = req.body.title;
    flight.time = `${[hour]}:${[min]}:${[second]}`;
    flight.price = req.body.price;
    flight.date =`${[year]}-${[month]}-${[day]}`;

  // Return the updated flight
  res.send(flight);
});

// Deleting a flight
app.delete('/api/flights/:id', (req, res) => {

  const flight = flights.find(c => c.id === parseInt(req.params.id)) ;
    if(!flight) res.status(404).send('The flight with the given id was not found.');


  // Delete
  const index = flights.indexOf(flight);
  flights.splice(index, 1);
  res.send(flight);

});





const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});