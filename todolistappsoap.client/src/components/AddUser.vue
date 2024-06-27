<template>
    <div class="container mt-5">
        <h2>Ajouter un utilisateur</h2>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form @submit.prevent="addUser">
            <div class="form-group">
                <label for="name">Nom</label>
                <input v-model="name" type="text" class="form-control" id="name" required />
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios';
    import { XMLParser } from 'fast-xml-parser';

    export default defineComponent({
        name: 'AddUser',
        data() {
            return {
                name: '',
                error: null as string | null,
            };
        },
        methods: {
            async addUser() {
                const newUser = { name: this.name };

                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <AddUser xmlns="http://tempuri.org/">
            <user xmlns:d4p1="http://schemas.datacontract.org/2004/07/TodoListAppSOAP.Server.Models">
              <d4p1:Name>${newUser.name}</d4p1:Name>
            </user>
          </AddUser>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32768/UserService.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IUserService/AddUser',
                            },
                        },
                    );

                    console.log(response.data);
                    this.$router.push('/'); // Rediriger vers la page d'accueil après l'ajout
                } catch (error) {
                    console.error(error);
                    this.error = "L'ajout de l'utilisateur n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
        },
    });
</script>
