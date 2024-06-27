using TodoListAppSOAP.Server.Models;

namespace TodoListAppSOAP.Server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return; 
            }

            var users = new User[]
            {
            new User { Name = "User1" },
            new User { Name = "User2" },
            };

            foreach (var user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();
        }
    }

}
