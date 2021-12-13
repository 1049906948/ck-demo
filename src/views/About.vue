<template>
  <div class="about">
    <div class="header">名校名师网</div>

    <div class="nav">导航</div>
    <div class="main">
      <div class="mod"></div>
      <div class="mod2"> </div>
      <div class="mod2"></div>
      <div class="mod2"></div>
      <div class="mod2"></div>
    </div>
    <div class="btn">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
    </div>

    <div class="footer"></div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
}
.header {
  width: 100%;
  height: 50px;
  background: red;
}

.nav {
  width: 70%;
  height: 300px;
  background: blanchedalmond;
  margin: auto;
}

.main {
  width: 70%;
  /* height: 1000px; */
  border: 1px solid;
  margin: auto;
}
.main .mod {
  border: 1px solid;
  height: 50px;
}
.main .mod2 {
  border: 1px solid;
  height: 200px;
}

.footer {
  background: #ccc;
  width: 100%;
  height: 100px;
}
.btn {
  width: 200px;
  /* height: 1000px; */
  /* border: 1px solid; */
  margin: auto;
}
</style>
