import { Page, Locator } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly header: Locator;
    readonly taskInput: Locator;
    readonly addButton: Locator;
    readonly checkbox: Locator;

    // Navigation Tabs
    readonly addItemTab: Locator;
    readonly todoTasksTab: Locator;
    readonly completedTab: Locator;

    constructor(page: Page) {
        // Add Item
        this.page = page;
        this.header = page.locator('h1'); // Displays "TO DO LIST"
        this.taskInput = page.locator('#new-task');
        this.addButton = page.locator('button.mdl-button', { hasText: 'add' }); // The "+" button

        // Check Item
        this.checkbox = page.locator('input[type="checkbox"]')

        // Tab Locators
        this.addItemTab = page.locator('a[href="#add-item"]');
        this.todoTasksTab = page.locator('a[href="#todo"]');
        this.completedTab = page.locator('a[href="#completed"]');
    }

    async navigate() {
        await this.page.goto('https://abhigyank.github.io/To-Do-List/');
    }

    async addTask(taskName: string) {
        await this.taskInput.fill(taskName);
        await this.addButton.click();
    }

    async getTaskInTodo(taskName: string) {
        const container = this.page.locator('#todo #text-1', { hasText: taskName });
        return {
            container,
            // checkbox: container.locator('input[type="checkbox"]'),
            textLabel: container.locator('.mdl-checkbox__label'),
            deleteButton: container.locator('button', { hasText: 'delete' })
        };
    }

async getTaskInCompleted(taskName: string) {
    const container = this.page.locator('#completed #completed-tasks', { hasText: taskName });

    return {
        container,
        taskText: container.locator('.mdl-list__item-primary-content'),
        doneIcon: container.locator('.material-icons'),
        deleteButton: container.locator('button.delete')
    };
}}