using System.ServiceModel;
using TodoListAppSOAP.Server.Models;

namespace TodoListAppSOAP.Server.Services
{
    [ServiceContract]
    public interface IUserService
    {
        [OperationContract]
        Task<List<User>> GetUsers();

        [OperationContract]
        Task<User> GetUser(int id);

        [OperationContract]
        Task AddUser(User user);

        [OperationContract]
        Task UpdateUser(User user);

        [OperationContract]
        Task DeleteUser(int id);
    }
}
