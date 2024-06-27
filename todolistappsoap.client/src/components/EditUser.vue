<template>
    <div class="container mt-5">
        <h2>Modifier un utilisateur</h2>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form @submit.prevent="updateUser">
            <div class="form-group">
                <label for="name">Nom</label>
                <input v-model="name" type="text" class="form-control" id="name" required />
            </div>
            <button type="submit" class="btn btn-primary">Mettre à jour</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios';
    import { XMLParser } from 'fast-xml-parser';

    export default defineComponent({
        name: 'EditUser',
        data() {
            return {
                id: this.$route.params.id,
                name: '',
                error: null as string | null,
            };
        },
        created() {
            this.getUser();
        },
        methods: {
            async getUser() {
                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetUser xmlns="http://tempuri.org/">
            <id>${this.id}</id>
          </GetUser>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/UserService.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IUserService/GetUser',
                            },
                        }
                    );

                    const parser = new XMLParser();
                    const result = parser.parse(response.data);

                    const user = result['s:Envelope']['s:Body']['GetUserResponse']['GetUserResult'];
                    if (user) {
                        this.name = user['d4p1:Name'];
                    }
                } catch (error) {
                    console.error(error);
                    this.error = "La récupération de l'utilisateur n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
            async updateUser() {
                const updatedUser = {
                    id: this.id,
                    name: this.name,
                };

                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <UpdateUser xmlns="http://tempuri.org/">
            <user xmlns:d4p1="http://schemas.datacontract.org/2004/07/TodoListAppSOAP.Server.Models">
              <d4p1:Id>${updatedUser.id}</d4p1:Id>
              <d4p1:Name>${updatedUser.name}</d4p1:Name>
            </user>
          </UpdateUser>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/UserService.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IUserService/UpdateUser',
                            },
                        }
                    );

                    console.log(response.data);
                    this.$router.push('/');
                } catch (error) {
                    console.error(error);
                    this.error = "La mise à jour de l'utilisateur n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
        },
    });
</script>