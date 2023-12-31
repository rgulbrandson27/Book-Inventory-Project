class Item {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    describeItem() {
        return `
        Count: ${this.numStocked}
        Title: ${this.title}
        Price: ${this.price}
        Ages:  ${this.minAge} to ${this.maxAge}
        Notes: ${this.notes}
        Ref#:  ${this.itemNum}`;
    }
}

class Category {
    constructor(categoryName) {
        this.categoryName = categoryName;
        this.items = [];
    }

    describeCategory() {
        return `Category contains ${this.selectedCategory.items.length} items.`;
    }

    listItems(items) {
        for (i=0; i < items.length; i++)
            this.item.describeItem();
    }
}

class Menu {
    constructor() {
        this.categoriesList = [];    
        this.selectedCategory = null;  
    }

    start() {
        let selection = this.displayMainMenu();

        while (selection != 5) {                        
            switch (selection) {
                case '1':
                    this.createNewCategory();
                    break;
                case '2':
                    this.displayCategories();
                    break;
                case '3':
                    this.manageCategory();
                    break;
                case '4':
                    this.deleteCategory();
                    break;
                case '5':
                    this.exitProgram();
                default:
                    selection = 5;
            }
            selection = this.displayMainMenu();   //this is called again while still in the loop
        }
        alert('Program Exited');
    }
    
    displayMainMenu() {
        return prompt(`
            1)  Create New Category
            2)  Display Categories
            3)  Manage Category
            4)  Delete Category
            5)  Exit Program
        `);
    }

    displayCategoryMenu(categoryInfo) {
        return prompt(`
                1) Add item
                2) Delete item
                3) Return to Main Menu
        _______________________________________
        
        ${categoryInfo}`);
    }

    createNewCategory() {
        let categoryName = prompt('Enter new category name:');
        this.categoriesList.push(new Category(categoryName, this.categoriesList.length + 1));
        console.log(this.categoriesList);
        console.log(categoryName);
    }

    displayCategories() {
        let categoriesList = "";
        for (let i = 0; i < this.categoriesList.length; i++) { 
        categoriesList += `
        ${i+1} ) ${this.categoriesList[i].categoryName}`
        }
        alert(categoriesList);
    }

    manageCategory() {         
        let number = prompt("Enter the number of the category you wish to manage:");
        if ((number > 0) && number <= this.categoriesList.length) {
            this.selectedCategory = this.categoriesList[number - 1];
            let description = "CATEGORY:  " + this.selectedCategory.categoryName + '\n';

            for (let i = 1; i <= this.selectedCategory.items.length; i++) {
                description += i + ") " + this.selectedCategory.items[i-1].title 
                + " - " + this.selectedCategory.items[i-1].price + '\n';
            }

            let selection1 = this.displayCategoryMenu(description);
            switch (selection1) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
        }
    }   

    // manageCategory() {         
    //     let number = prompt("Enter the number of the category you wish to manage:");
    //     if ((number > 0) && number <= this.categoriesList.length) {
    //         this.selectedCategory = this.categoriesList[number - 1];
    //         let itemsList = `
    //         ITEMS LIST:

    //         ${for (let i = 1; i <= this.selectedCategory.items.length; i++) {
    //             itemsList += i} this.selectedCategory.items[i-1].title this.selectedCategory.items[i-1].price}
            
    //         `

    //         let selection1 = this.displayCategoryMenu(this.selectedCategory.categoryName, itemsList);
    //         switch (selection1) {
    //             case '1':
    //                 this.createItem();
    //                 break;
    //             case '2':
    //                 this.deleteItem();
    //         }
    //     }
    // }   
    
    deleteCategory() {
        let index = prompt('Enter the category number you wish to delete:');
        if (index > 0 && index <= this.categoriesList.length) {
            this.categoriesList.splice((index-1), 1);         
        }
    }
        //create "Are you sure" alert.  


    createItem() {
        let title = prompt('Enter new Title:');
        let price = prompt('Enter Price:')
        // let minAge = prompt('Enter min. age:')            
        // let maxAge = prompt('Enter max. age:')
        // let notes = prompt('Enter notes:')
        this.selectedCategory.items.push(new Item(title, price));
        }

    deleteItem() {
        let index = prompt('Enter the number of the item you wish to delete:');
        if (index > 0 && index <= this.selectedCategory.items.length) {
            this.selectedCategory.items.splice(index-1, 1);
        }
    }
}

let menu = new Menu();
menu.start();