using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HyperBloom.Models.Entities;


[PrimaryKey(nameof(LightNeeds))]
public class LightType : Needs
{
    [Required][MaxLength(15),MinLength(5)]
    public string LightNeeds { get; set; }

    public LightType(string lightNeeds)
    {
        LightNeeds = lightNeeds;
    }
}