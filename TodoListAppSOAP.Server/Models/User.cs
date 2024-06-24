using System.Runtime.Serialization;

namespace TodoListAppSOAP.Server.Models
{
    [DataContract(IsReference = true)]
    public class User
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public List<ToDoItem> ToDoItems { get; set; } = new List<ToDoItem>();
    }
}
