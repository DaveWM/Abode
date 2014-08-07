﻿using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace HouseShareWebsite.Models
{
    public class EntityModel : IdentityDbContext<ApplicationUser>
    {
        public EntityModel()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<EntityModel>());
        }

        public static EntityModel Create()
        {
            return new EntityModel();
        }

        public virtual DbSet<TileItem> TileItems { get; set; }
        public virtual DbSet<Note> Notes { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<House> Houses { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    modelBuilder.Entity<House>().HasOptional(h => h.Users).WithMany();
        //}
    }
}