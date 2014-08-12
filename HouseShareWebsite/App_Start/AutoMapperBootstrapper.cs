using AutoMapper;
using AbodeWebsite.Models;
using AbodeWebsite.Models.ViewModels;

namespace AbodeWebsite.App_Start
{
    public static class AutoMapperBootstrapper
    {
        public static void SetupMappings()
        {
            Mapper.CreateMap<ApplicationUser, UserViewModel>();
            Mapper.CreateMap<House, HouseViewModel>();
            Mapper.CreateMap<HouseViewModel, House>();
            Mapper.CreateMap<Comment, CommentViewModel>()
                .ForMember(c => c.UserName, opt => opt.MapFrom(c => c.User.RealName))
                .ForMember(c => c.TileItemTitle, opt => opt.MapFrom(c => c.TileItem.Title));
            Mapper.CreateMap<Note, NoteViewModel>();
            Mapper.CreateMap<NoteViewModel, Note>()
                .ForMember(e => e.Comments, opt => opt.Ignore());

            Mapper.CreateMap<TileItem, TileItemViewModel>()
                .ForMember(vm => vm.TileItemType,
                    opt => opt.MapFrom(e => e is Note ? TileItemType.Note : TileItemType.Note))
                    .Include<Note, NoteViewModel>();
        }
    }
}