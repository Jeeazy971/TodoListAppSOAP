using System.ServiceModel;
using TodoListAppSOAP.Server.Models;

namespace TodoListAppSOAP.Server.Services
{
    [ServiceContract]
    public interface IToDoSoapService
    {
        [OperationContract]
        Task<List<ToDoItem>> GetToDoItems();

        [OperationContract]
        Task<ToDoItem> GetToDoItem(int id);

        [OperationContract]
        Task AddToDoItem(ToDoItem item);

        [OperationContract]
        Task UpdateToDoItem(ToDoItem item);

        [OperationContract]
        Task DeleteToDoItem(int id);
    }
}
