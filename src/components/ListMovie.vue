<template>
  <div>
      <h1>Lista de Filmes</h1>
      <br>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Gênero</th>
            <th>Diretor</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.genre.name }}</td>
            <td>{{ movie.director.name }}</td>
            <td>{{ movie.year }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'ListView',

    data() {
        return {
            movies: [
                {
                    id: 1,
                    title: 'Avengers: Endgame',
                    genre: { name: 'Ação' },
                    director: { name: 'Anthony Russo' },
                    year: 2019
                }
            ]
        }
    },
}
</script>

<style>

</style>