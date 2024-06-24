using TodoListAppSOAP.Server.Models;

namespace TodoListAppSOAP.Server.Repositories
{
    public interface IToDoItemRepository
    {
        Task<List<ToDoItem>> GetToDoItems();
        Task<ToDoItem> GetToDoItem(int id);
        Task AddToDoItem(ToDoItem item);
        Task UpdateToDoItem(ToDoItem item);
        Task DeleteToDoItem(int id);
    }
}
