<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">ToDo App</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/add" class="nav-link">Add ToDo</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/users" class="nav-link">Users</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/add-user" class="nav-link">Add User</router-link>
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
