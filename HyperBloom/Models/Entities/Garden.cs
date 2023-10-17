using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(Id))]
public class Garden
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public int Columns { get; set; }
    
    [Required]
    public int Rows { get; set; }
    
    
    public Garden(string name, int columns, int rows)
    {
        Name = name;
        Columns = columns;
        Rows = rows;
    }
}