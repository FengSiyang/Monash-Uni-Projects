namespace Cheerup2.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ModelNature : DbContext
    {
        public ModelNature()
            : base("name=ModelNature")
        {
        }

        public virtual DbSet<naturePlace> naturePlaces { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
