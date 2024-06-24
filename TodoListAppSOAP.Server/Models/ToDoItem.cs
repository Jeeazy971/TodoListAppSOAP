using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace TodoListAppSOAP.Server.Models
{
    [DataContract(IsReference = true)]
    public class ToDoItem
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Title { get; set; }

        [DataMember]
        public bool IsCompleted { get; set; }

        [DataMember]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [DataMember]
        public User User { get; set; }
    }
}