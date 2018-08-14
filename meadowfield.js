/*
  This document holds solution of the exercises from chapter 07
*/
const roads =[
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function buildGraph(edges) {
  let graph = Object.create(null) //We create a new object with that does not inherit from Object.prototype
  function addEdge(from, to) {
    if(graph[from] == null){      //This means that the origin of the edge is not listed inside the graph yet
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if(!roadGraph[this.place].includes(destination)) {
      return this;                  //this means that at the time, making a move to that destination is not possible.
    } else {
      let parcels = this.parcels.map(p => {
        if(p.place != this.place) return p;   //this means a parcel is in another place at the time.
        return {place: destination, address: p.address};//update the place of the parcels we are carrying.
      }).filter(p => p.place != p.address); //we leave the parcels that arravied at their destination.
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn=0;; turn++) {
    if(state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory:memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for(let i=0; i<work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}


function randomPick(array) {
  let choice = Math.floor(Math.random()* array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i=0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels); 
};

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

runRobot(VillageState.random(), randomRobot);
runRobot(VillageState.random(), routeRobot, []);

function compareRobots(robot1, memory1, robot2, memory2) {
  r1Steps = 0, r2Steps = 0;
  for (let t= 0; t < 100; t++) {
    task = VillageState.random();
    r1Steps += runRobot(task, robot1, memory1);
    r2Steps += runRobot(task, robot2, memory2);
  }
  console.log(`Robot 1 took, in average ${r1Steps/100} steps`);
  console.log(`Robot 2 took, in average ${r2Steps/100} steps`);
}

function newRobot({place, parcels}, route) {
  if (route.length == 0) {
    let shortestRoute = Infinity;
    for (p of parcels) {
      if (p.place != place) {
        pRoute = findRoute(roadGraph, place, p.place);  
      } else {
        pRoute = findRoute(roadGraph, place, p.address);
      }
      if (pRoute.length < shortestRoute) {
        shortestRoute = pRoute.length;
        route = pRoute; 
      }
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
