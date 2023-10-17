using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(Id))]
public class Cell
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; }
    
    [Required]
    public int GardenId { get; set; }
    
    [Required]
    public int ColumnPosition { get; set; }
    
    [Required]
    public int RowPosition { get; set; }
    
    public Plant? Plant { get; set; }
    
    
    public Cell(int gardenId, int columnPosition, int rowPosition)
    {
        GardenId = gardenId;
        ColumnPosition = columnPosition;
        RowPosition = rowPosition;
    }
}