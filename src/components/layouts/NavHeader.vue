<template>
  <div>
      <ul>
          <li><router-link to="/">Página Inicial</router-link></li> |
          <li><router-link to="/contato">Contato</router-link></li> |
          <li><router-link to="/sobre">Sobre</router-link></li>

          <br>
          <br>

          <router-link to="/login">Entrar</router-link> | 
      </ul>
      <hr>
  </div>
</template>

<script>
export default {
   name: 'Header',
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

ul li{
  display: inline-block;
}
</style>