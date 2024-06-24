using TodoListAppSOAP.Server.Models;
using TodoListAppSOAP.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace TodoListAppSOAP.Server.Repositories
{
    public class ToDoItemRepository : IToDoItemRepository
    {
        private readonly ApplicationDbContext _context;

        public ToDoItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ToDoItem>> GetToDoItems()
        {
            return await _context.ToDoItems.Include(t => t.User).ToListAsync();
        }

        public async Task<ToDoItem> GetToDoItem(int id)
        {
            return await _context.ToDoItems.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AddToDoItem(ToDoItem item)
        {
            _context.ToDoItems.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateToDoItem(ToDoItem item)
        {
            _context.ToDoItems.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteToDoItem(int id)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            if (item != null)
            {
                _context.ToDoItems.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}
