using TodoListAppSOAP.Server.Models;
using TodoListAppSOAP.Server.Repositories;

namespace TodoListAppSOAP.Server.Services
{
    public class ToDoSoapService : IToDoSoapService
    {
        private readonly IToDoItemRepository _toDoItemRepository;

        public ToDoSoapService(IToDoItemRepository toDoItemRepository)
        {
            _toDoItemRepository = toDoItemRepository;
        }

        public async Task<List<ToDoItem>> GetToDoItems()
        {
            return await _toDoItemRepository.GetToDoItems();
        }

        public async Task<ToDoItem> GetToDoItem(int id)
        {
            return await _toDoItemRepository.GetToDoItem(id);
        }

        public async Task AddToDoItem(ToDoItem item)
        {
            await _toDoItemRepository.AddToDoItem(item);
        }

        public async Task UpdateToDoItem(ToDoItem item)
        {
            await _toDoItemRepository.UpdateToDoItem(item);
        }

        public async Task DeleteToDoItem(int id)
        {
            await _toDoItemRepository.DeleteToDoItem(id);
        }
    }
}
