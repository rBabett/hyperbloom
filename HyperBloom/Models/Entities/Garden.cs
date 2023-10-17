using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(GardenId))]
public class Garden
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int GardenId { get; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public int Columns { get; init; }
    
    [Required]
    public int Rows { get; init; }
    
    public virtual List<Cell> Cells { get; set; }
    
    public Garden(string name, int columns, int rows)
    {
        Name = name;
        Columns = columns;
        Rows = rows;
        Cells = new List<Cell>();
    }
}