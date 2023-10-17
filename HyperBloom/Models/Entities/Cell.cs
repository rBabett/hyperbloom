using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;

[PrimaryKey(nameof(CellId))]
public class Cell
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CellId { get; init; }
    
    [ForeignKey("GardenId")]
    public int GardenId { get; set; }
    
    [Required]
    public int ColumnPosition { get; set; }
    
    [Required]
    public int RowPosition { get; set; }

    [ForeignKey("PlantId")]
    public Plant? Plant { get; set; }
    
    public int EstimatedHarvest { get; set; }
    public int ActualHarvest { get; set; }
    public DateTime WateredDate { get; set; }
    public DateTime FertilizedDate { get; set; }
    
    public Cell(int gardenId, int columnPosition, int rowPosition)
    {
        GardenId = gardenId;
        ColumnPosition = columnPosition;
        RowPosition = rowPosition;
    }
}