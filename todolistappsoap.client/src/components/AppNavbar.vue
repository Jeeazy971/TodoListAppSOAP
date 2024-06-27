<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">ToDo App</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/add-todo" class="nav-link">Ajouter une tache</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/users" class="nav-link">Utilisateurs</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/add-user" class="nav-link">Ajouter un utilisateur</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'AppNavbar',
    };
</script>

<style scoped>
    .navbar {
        margin-bottom: 20px;
    }
</style>
