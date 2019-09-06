namespace Cheerup2.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class naturePlace
    {
        public int Id { get; set; }

        [StringLength(30)]
        public string placeName { get; set; }

        [StringLength(50)]
        public string address { get; set; }

        [Column(TypeName = "image")]
        public byte[] imagePicture { get; set; }

        [StringLength(100)]
        public string url { get; set; }

        public string sportSuggestions { get; set; }

        [StringLength(10)]
        public string Tag { get; set; }

        public string Detail { get; set; }

        public string weatherCity { get; set; }
    }
}
