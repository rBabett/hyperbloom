using HyperBloom.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HyperBloom.Models;

public class GardenAppContext : DbContext
{
    public GardenAppContext(DbContextOptions<GardenAppContext> options) : base(options)
    {

    }
    
    public DbSet<Needs> Needs { get; set; }
    public DbSet<Plant> Plants { get; set; }
    
    public DbSet<Garden> Gardens { get; set; }
    
    public DbSet<Cell> Cells { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Plant>()
            .Property(p => p.PlantId)
            .ValueGeneratedOnAdd()
            .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn);
    }

}