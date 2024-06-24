using TodoListAppSOAP.Server.Models;

namespace TodoListAppSOAP.Server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // Vérifiez si des utilisateurs existent déjà
            if (context.Users.Any())
            {
                return; // La base de données a déjà été initialisée
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
