<template>
    <div class="container mt-5">
        <h2>Modifier une tâche</h2>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form @submit.prevent="updateToDoItem">
            <div class="form-group">
                <label for="title">Titre</label>
                <input v-model="title" type="text" class="form-control" id="title" required />
            </div>
            <div class="form-group">
                <label for="user">Utilisateur</label>
                <select v-model="userId" class="form-control" id="user" required>
                    <option v-for="user in users" :key="user.Id" :value="user.Id">
                        {{ user.Name }}
                    </option>
                </select>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="isCompleted" id="isCompleted" />
                <label class="form-check-label" for="isCompleted">Complété</label>
            </div>
            <button type="submit" class="btn btn-primary">Modifier</button>
        </form>
        <button @click="goBack" class="btn btn-secondary mt-2">Retour</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios';
    import { XMLParser } from 'fast-xml-parser';

    export default defineComponent({
        name: 'EditToDo',
        data() {
            return {
                title: '',
                userId: null as number | null,
                isCompleted: false,
                users: [] as Array<{ Id: number; Name: string }>,
                error: null as string | null,
            };
        },
        created() {
            this.getUsers();
            this.getToDoItem();
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
            async getToDoItem() {
                const id = this.$route.params.id;
                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetToDoItem xmlns="http://tempuri.org/">
            <id>${id}</id>
          </GetToDoItem>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/Service.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IService/GetToDoItem',
                            },
                        }
                    );

                    const parser = new XMLParser();
                    const result = parser.parse(response.data);

                    const item = result['s:Envelope']['s:Body']['GetToDoItemResponse']['GetToDoItemResult'];
                    if (item) {
                        this.title = item['d4p1:Title'];
                        this.userId = parseInt(item['d4p1:UserId']);
                        this.isCompleted = item['d4p1:IsCompleted'] === 'true';
                    }
                } catch (error) {
                    console.error(error);
                    this.error = "La récupération de la tâche n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
            async updateToDoItem() {
                const id = this.$route.params.id;
                const updatedItem = {
                    id: id,
                    title: this.title,
                    isCompleted: this.isCompleted,
                    userId: this.userId,
                };

                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <UpdateToDoItem xmlns="http://tempuri.org/">
            <item xmlns:d4p1="http://schemas.datacontract.org/2004/07/TodoListAppSOAP.Server.Models">
              <d4p1:Id>${updatedItem.id}</d4p1:Id>
              <d4p1:Title>${updatedItem.title}</d4p1:Title>
              <d4p1:IsCompleted>${updatedItem.isCompleted}</d4p1:IsCompleted>
              <d4p1:UserId>${updatedItem.userId}</d4p1:UserId>
            </item>
          </UpdateToDoItem>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/Service.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IService/UpdateToDoItem',
                            },
                        }
                    );

                    console.log(response.data);
                    this.$router.push('/');
                } catch (error) {
                    console.error(error);
                    this.error = "La mise à jour de la tâche n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
            goBack() {
                this.$router.back();
            },
        },
    });
</script>

<style scoped>
    /* Ajustez le style pour le toggle switch */
    .form-check-input {
        width: auto;
        height: auto;
    }
</style>
