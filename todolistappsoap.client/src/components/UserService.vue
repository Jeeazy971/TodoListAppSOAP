<template>
    <div class="container mt-5">
        <h2>Liste des utilisateurs</h2>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <ul class="list-group">
            <li v-for="user in users" :key="user.Id" class="list-group-item d-flex justify-content-between align-items-center">
                {{ user.Name }}
                <div>
                    <button @click="editUser(user.Id)" class="btn btn-primary btn-sm mr-2">Modifier</button>
                    <button @click="deleteUser(user.Id)" class="btn btn-danger btn-sm">Supprimer</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios';
    import { XMLParser } from 'fast-xml-parser';

    export default defineComponent({
        name: 'UserService',
        data() {
            return {
                users: [] as Array<{ Id: number; Name: string }>,
                error: null as string | null,
            };
        },
        created() {
            this.getUsers();
        },
        methods: {
            async getUsers() {
                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetUsers xmlns="http://tempuri.org/" />
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/UserService.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IUserService/GetUsers',
                            },
                        }
                    );

                    const parser = new XMLParser();
                    const result = parser.parse(response.data);

                    const users = result['s:Envelope']['s:Body']['GetUsersResponse']['GetUsersResult']['d4p1:User'];
                    if (users) {
                        this.users = users.map((user: any) => ({
                            Id: parseInt(user['d4p1:Id']),
                            Name: user['d4p1:Name'],
                        }));
                    }
                } catch (error) {
                    console.error(error);
                    this.error = "La récupération des utilisateurs n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
            editUser(id: number) {
                this.$router.push({ name: 'EditUser', params: { id } });
            },
            async deleteUser(id: number) {
                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <DeleteUser xmlns="http://tempuri.org/">
            <id>${id}</id>
          </DeleteUser>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/UserService.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IUserService/DeleteUser',
                            },
                        }
                    );

                    console.log(response.data);
                    this.getUsers(); // Refresh the list after deletion
                } catch (error) {
                    console.error(error);
                    this.error = "La suppression de l'utilisateur n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
        },
    });
</script>

<style scoped>
    /* Ajoutez votre style ici */
</style>
