using HyperBloom.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models;

public class GardenAppContext : IdentityDbContext<IdentityUser>
{
    public GardenAppContext(DbContextOptions<GardenAppContext> options) : base(options)
    {

    }

    public DbSet<LightType> LightTypes { get; set; }
    public DbSet<WaterType> WaterTypes { get; set; }
    public DbSet<SoilType> SoilTypes { get; set; }
    public DbSet<Plant> Plants { get; set; }

}