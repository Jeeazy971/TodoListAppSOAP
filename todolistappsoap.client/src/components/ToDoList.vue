<template>
    <div class="container mt-5">
        <h1>Liste des tâches</h1>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <ul class="list-group">
            <li v-for="item in items"
                :key="item.Id"
                class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">{{ item.Title }}</h5>
                    <small class="text-muted">{{ item.User.Name }}</small>
                </div>
                <div>
                    <button @click="editItem(item.Id)"
                            class="btn btn-primary btn-sm mr-2">
                        Modifier
                    </button>
                    <button @click="deleteItem(item.Id)"
                            class="btn btn-danger btn-sm">
                        Supprimer
                    </button>
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
        name: 'ToDoList',
        data() {
            return {
                items: [] as Array<{ Id: number; Title: string; User: { Name: string } }>,
                error: null as string | null,
            };
        },
        created() {
            this.getToDoItems();
        },
        methods: {
            async getToDoItems() {
                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetToDoItems xmlns="http://tempuri.org/" />
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/Service.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IService/GetToDoItems',
                            },
                        }
                    );

                    const parser = new XMLParser();
                    const result = parser.parse(response.data);
                    console.log(result);
                    const items = result['s:Envelope']['s:Body']['GetToDoItemsResponse']['GetToDoItemsResult']['d4p1:ToDoItem'];

                    if (Array.isArray(items)) {
                        this.items = items.map((item: any) => ({
                            Id: parseInt(item['d4p1:Id']),
                            Title: item['d4p1:Title'],
                            User: item['d4p1:User'] ? { Name: item['d4p1:User']['d4p1:Name'] } : { Name: 'Unknown' },
                        }));
                    } else if (items) {
                        this.items = [{
                            Id: parseInt(items['d4p1:Id']),
                            Title: items['d4p1:Title'],
                            User: items['d4p1:User'] ? { Name: items['d4p1:User']['d4p1:Name'] } : { Name: 'Unknown' },
                        }];
                    } else {
                        this.items = [];
                        this.error = 'Aucune tâche trouvée.';
                    }
                } catch (error) {
                    console.error(error);
                    this.error = "La récupération des tâches n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
            editItem(id: number) {
                this.$router.push({ name: 'EditToDo', params: { id } });
            },
            async deleteItem(id: number) {
                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <DeleteToDoItem xmlns="http://tempuri.org/">
            <id>${id}</id>
          </DeleteToDoItem>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/Service.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IService/DeleteToDoItem',
                            },
                        }
                    );

                    console.log('Delete response:', response.data);
                    this.getToDoItems();
                } catch (error) {
                    console.error('Delete error:', error.message);
                    this.error = "La suppression de la tâche n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
        },
    });
</script>

<style scoped>
    h5 {
        font-weight: bold;
    }

    .mb-1 {
        margin-bottom: 0.25rem;
    }

    .mr-2 {
        margin-right: 0.5rem;
    }
</style>
