<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios';
    import { XMLParser } from 'fast-xml-parser';

    export default defineComponent({
        name: 'AddToDo',
        data() {
            return {
                title: '',
                userId: null,
                isCompleted: false,
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
                    console.log(response.data);
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
                    this.error =
                        "La récupération des utilisateurs n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
            async addToDoItem() {
                const newItem = {
                    title: this.title,
                    isCompleted: this.isCompleted,
                    userId: this.userId,
                };

                const soapRequest = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <AddToDoItem xmlns="http://tempuri.org/">
            <item xmlns:d4p1="http://schemas.datacontract.org/2004/07/TodoListAppSOAP.Server.Models">
              <d4p1:Title>${newItem.title}</d4p1:Title>
              <d4p1:IsCompleted>${newItem.isCompleted}</d4p1:IsCompleted>
              <d4p1:UserId>${newItem.userId}</d4p1:UserId>
            </item>
          </AddToDoItem>
        </soap:Body>
      </soap:Envelope>`.trim();

                try {
                    const response = await axios.post(
                        'https://localhost:32770/Service.svc',
                        soapRequest,
                        {
                            headers: {
                                'Content-Type': 'text/xml; charset=utf-8',
                                SOAPAction: 'http://tempuri.org/IService/AddToDoItem',
                            },
                        }
                    );

                    console.log(response.data);
                    this.$router.push('/'); // Rediriger vers la page d'accueil après l'ajout
                } catch (error) {
                    console.error(error);
                    this.error =
                        "L'ajout de la tâche n'est pas disponible pour le moment. Veuillez réessayer plus tard.";
                }
            },
        },
    });
</script>
