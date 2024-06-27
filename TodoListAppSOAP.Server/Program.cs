using Microsoft.EntityFrameworkCore;
using SoapCore;
using TodoListAppSOAP.Server.Data;
using TodoListAppSOAP.Server.Repositories;
using TodoListAppSOAP.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Ajouter les services SOAP
builder.Services.AddScoped<IToDoSoapService, ToDoSoapService>();
builder.Services.AddScoped<IUserService, UserService>();

// Ajouter les repositories
builder.Services.AddScoped<IToDoItemRepository, ToDoItemRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddSoapCore();

builder.Services.AddControllers();

// Configurer CORS pour autoriser toutes les origines
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Initialise la base de données
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    DbInitializer.Initialize(context);
}

// Le middleware de l'application.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// Middleware pour logger les requêtes et réponses SOAP
app.Use(async (context, next) =>
{
    context.Request.EnableBuffering();
    var request = await new StreamReader(context.Request.Body).ReadToEndAsync();
    context.Request.Body.Position = 0;
    Console.WriteLine($"Request: {request}");

    var originalBodyStream = context.Response.Body;
    using (var responseBody = new MemoryStream())
    {
        context.Response.Body = responseBody;

        await next();

        context.Response.Body.Seek(0, SeekOrigin.Begin);
        var response = await new StreamReader(context.Response.Body).ReadToEndAsync();
        context.Response.Body.Seek(0, SeekOrigin.Begin);

        Console.WriteLine($"Response: {response}");
        await responseBody.CopyToAsync(originalBodyStream);
    }
});

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAllOrigins");
app.UseAuthorization();

// les points de terminaison SOAP
app.UseSoapEndpoint<IToDoSoapService>("/Service.svc", new SoapEncoderOptions());
app.UseSoapEndpoint<IUserService>("/UserService.svc", new SoapEncoderOptions());

app.MapControllers();

app.Run();
