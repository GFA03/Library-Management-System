using AutoMapper;
using LibraryManagementSystem.Server.Models;
using LibraryManagementSystem.Server.Models.DTOs.CategoryDTO;
using LibraryManagementSystem.Server.Repositories.CategoryRepository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Server.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDTO>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return _mapper.Map<List<CategoryDTO>>(categories);
        }

        public List<CategoryDTO> GetCategoriesByName(string Name)
        {
            return _mapper.Map<List<CategoryDTO>>(_categoryRepository.GetAllCategoriesByName(Name));
        }

        public async Task CreateCategory(CreateCategoryDTO CategoryDto)
        {
            await _categoryRepository.CreateAsync(_mapper.Map<Category>(CategoryDto));
            await _categoryRepository.SaveAsync();
        }

        public async Task UpdateCategory(UpdateCategoryDTO CategoryDto)
        {
            var category = _mapper.Map<Category>(CategoryDto);
            _categoryRepository.Update(_mapper.Map<Category>(category));
            await _categoryRepository.SaveAsync();
        }

        public async Task<bool> RemoveCategory(Guid id)
        {
            _categoryRepository.DeleteById(id);
            return await _categoryRepository.SaveAsync();
        }

    }
}
