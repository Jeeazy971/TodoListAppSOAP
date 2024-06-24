using TodoListAppSOAP.Server.Models;
using TodoListAppSOAP.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace TodoListAppSOAP.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.Include(u => u.ToDoItems).ToListAsync();
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(u => u.ToDoItems).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
