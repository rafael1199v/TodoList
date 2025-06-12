import { describe, test, vi, expect } from "vitest";
import categoryService from "../services/CategoryService";

describe('Verificacion de existencia de una categoria', () => {
    test('Categoria existente',  async () => {
        //Arrange
        const uuid = 'user-uuid';
        const categoryName = 'categoria2';
        vi.spyOn(categoryService, 'getCategories').mockImplementation((uuid) => {
           return [{
                id: 1,
                name: 'categoria1'
            },
            {
                id: 2,
                name: 'categoria2'
            },
            {
                id: 3,
                name: 'categoria3'
            }]; 
        })
        //Act
        const exist = await categoryService.existCategory(categoryName, uuid);

        //Assert
        expect(exist).toBe(true);
    });

    test('Categoria nueva',  async () => {
        //Arrange
        const uuid = 'user-uuid';
        const categoryName = 'categoria4';
        vi.spyOn(categoryService, 'getCategories').mockImplementation((uuid) => {
           return [{
                id: 1,
                name: 'categoria1'
            },
            {
                id: 2,
                name: 'categoria2'
            },
            {
                id: 3,
                name: 'categoria3'
            }]; 
        })
        //Act
        const exist = await categoryService.existCategory(categoryName, uuid);

        //Assert
        expect(exist).toBe(false);
    });

    test('Categoria existente con capitalizacion alterada',  async () => {
        //Arrange
        const uuid = 'user-uuid';
        const categoryName = 'categoria1';
        vi.spyOn(categoryService, 'getCategories').mockImplementation((uuid) => {
           return [{
                id: 1,
                name: 'cAteGoRia1'
            },
            {
                id: 2,
                name: 'categoria2'
            },
            {
                id: 3,
                name: 'categoria3'
            }]; 
        })
        //Act
        const exist = await categoryService.existCategory(categoryName, uuid);

        //Assert
        expect(exist).toBe(true);
    });


    test('Categoria existente con espacios',  async () => {
        //Arrange
        const uuid = 'user-uuid';
        const categoryName = '      categoria1      ';
        vi.spyOn(categoryService, 'getCategories').mockImplementation((uuid) => {
           return [{
                id: 1,
                name: '    categoria1'
            },
            {
                id: 2,
                name: 'categoria2'
            },
            {
                id: 3,
                name: 'categoria3'
            }]; 
        })
        //Act
        const exist = await categoryService.existCategory(categoryName, uuid);

        //Assert
        expect(exist).toBe(true);
    });


    test('Categoria existente con espacios y capitalizacion alterada',  async () => {
        //Arrange
        const uuid = 'user-uuid';
        const categoryName = '      categoria1      ';
        vi.spyOn(categoryService, 'getCategories').mockImplementation((uuid) => {
           return [{
                id: 1,
                name: '    cATEGoria1'
            },
            {
                id: 2,
                name: 'categoria2'
            },
            {
                id: 3,
                name: 'categoria3'
            }]; 
        })
        //Act
        const exist = await categoryService.existCategory(categoryName, uuid);

        //Assert
        expect(exist).toBe(true);
    });
})