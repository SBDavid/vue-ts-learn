<template>
  <div class="container">
    <div class="item item-a"> item-a </div>
    <div class="item item-b"> item-b </div>
  </div>

</template>
<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0; padding: 0;
}

.container {
  display: grid;
  grid-template-columns: 60px 60px;
  grid-template-rows: 80px 80px;
  grid-auto-columns: 100px;
  grid-auto-rows: 600px;
  gap: 15px 10px;
  background-color: rgba(255,0,0,.7);
  justify-items: stretch;
  align-items: stretch;
  height: 100%;
  margin: 0;
  padding: 0;
}

.item {
  font-family: 'Output Sans', -apple-system, BlinkMacSystemFont, 
    "Segoe UI", "Roboto", "Oxygen", 
    "Ubuntu", "Cantarell", "Fira Sans", 
    "Droid Sans", "Helvetica Neue", sans-serif;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  background-color: rgba(10, 88, 75, 0.106);
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 0;
  margin: 0;
}

.item-a {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.item-b {
  grid-column: 5 / 6;
  grid-row: 3 / 4;
}
</style>